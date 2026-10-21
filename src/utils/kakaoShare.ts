declare global {
  interface Window {
    Kakao?: any;
  }
}

export interface ShareOptions {
  title?: string;
  description?: string;
  imageUrl?: string;
  landingUrl?: string;
  buttonText?: string;
  appUrl?: string;
}

export interface ShareResult {
  method: 'kakao' | 'web-share' | 'clipboard';
  success: boolean;
  message: string;
  needKeyGuide?: boolean;
}

/**
 * Initializes the Kakao SDK with the provided JavaScript Key.
 */
export function initKakaoSDK(javascriptKey?: string): boolean {
  if (typeof window === 'undefined') return false;
  const kakao = window.Kakao;
  if (!kakao) return false;

  const key = javascriptKey?.trim();
  if (!key) return false;

  try {
    if (!kakao.isInitialized()) {
      kakao.init(key);
    }
    return kakao.isInitialized();
  } catch (err) {
    console.warn('[HealthMate] Kakao SDK init error:', err);
    return false;
  }
}

/**
 * Executes KakaoTalk sharing with graceful fallback:
 * 1. Kakao SDK sendDefault (if initialized)
 * 2. Web Share API (on mobile devices)
 * 3. Clipboard copy with toast (on desktop or if SDK/share fails)
 */
export async function executeKakaoShare(
  options: ShareOptions,
  kakaoJsKey?: string
): Promise<ShareResult> {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Determine current landing page absolute URL
  const currentOrigin =
    typeof window !== 'undefined' ? window.location.origin : '';
  const currentHref =
    typeof window !== 'undefined' ? window.location.href : '';

  const targetLandingUrl =
    options.landingUrl && options.landingUrl.startsWith('http')
      ? options.landingUrl
      : currentHref || currentOrigin || 'https://choi-healthmate.vercel.app/';

  const absoluteImageUrl = options.imageUrl?.startsWith('http')
    ? options.imageUrl
    : `${currentOrigin}/og-healthmate.png`;

  const shareTitle = options.title || '헬스메이트 | AI 스마트 운동 관리';
  const shareDescription =
    options.description ||
    '운동의 시작부터 성장까지! 초보자부터 숙련자까지 모두를 위한 나만의 AI 헬스 파트너.';
  const shareButtonText = options.buttonText || '헬스메이트 알아보기';

  // 1. Check Kakao SDK
  const kakao = typeof window !== 'undefined' ? window.Kakao : undefined;
  const isKakaoReady = kakao && initKakaoSDK(kakaoJsKey);

  if (isKakaoReady && kakao?.Share?.sendDefault) {
    try {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDescription,
          imageUrl: absoluteImageUrl,
          link: {
            mobileWebUrl: targetLandingUrl,
            webUrl: targetLandingUrl,
          },
        },
        buttons: [
          {
            title: shareButtonText,
            link: {
              mobileWebUrl: targetLandingUrl,
              webUrl: targetLandingUrl,
            },
          },
        ],
      });

      return {
        method: 'kakao',
        success: true,
        message: '카카오톡 공유창이 열렸습니다.',
      };
    } catch (kakaoError) {
      console.warn('[HealthMate] Kakao.Share.sendDefault failed:', kakaoError);
      // Fall through to mobile Web Share or Clipboard
    }
  }

  // 2. Fallback: If on mobile and navigator.share is supported
  if (isMobile && typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: `${shareTitle}\n${shareDescription}`,
        url: targetLandingUrl,
      });
      return {
        method: 'web-share',
        success: true,
        message: '공유 메뉴가 실행되었습니다.',
        needKeyGuide: !kakaoJsKey,
      };
    } catch (shareError: any) {
      if (shareError.name === 'AbortError') {
        return {
          method: 'web-share',
          success: false,
          message: '공유가 취소되었습니다.',
        };
      }
      // Otherwise proceed to clipboard copy
    }
  }

  // 3. Fallback: Copy landing page link to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(targetLandingUrl);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = targetLandingUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    return {
      method: 'clipboard',
      success: true,
      message: '공유 링크가 복사되었습니다.',
      needKeyGuide: !kakaoJsKey,
    };
  } catch (copyError) {
    return {
      method: 'clipboard',
      success: false,
      message: '링크 복사에 실패했습니다.',
      needKeyGuide: !kakaoJsKey,
    };
  }
}
