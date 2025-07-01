'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getSession,signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';

// 型別定義
type OAuthUser = {
  user_id: string;
  name: string;
  avatar: string;
  is_mentor: boolean;
  onboarding: boolean;
};

type OAuthResponse = {
  data: {
    auth_type?: 'SIGNIN' | 'SIGNUP';
    auth?: {
      token: string;
    };
    user: OAuthUser;
  };
  code?: string;
  msg?: string;
};

export default function GoogleOAuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const cached = localStorage.getItem('google_oauth_data');
    if (cached) {
      console.log('[OAuth Debug] Found cached OAuth data');
      try {
        const cachedData: OAuthResponse = JSON.parse(cached);
        proceedWithSignIn(cachedData);
        return;
      } catch (err) {
        console.error('Failed to parse cached OAuth data:', err);
        localStorage.removeItem('google_oauth_data');
      }
    }

    if (!code || !state) {
      toast({
        variant: 'destructive',
        title: 'Missing Google OAuth parameters',
        description: 'Authorization failed. Please try again.',
      });
      router.push('/auth/signin');
      return;
    }

    const handleGoogleOAuth = async () => {
      try {
        console.log(
          '[OAuth Debug] Sending POST to /v2/oauth/google/callback...',
        );
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v2/oauth/google/callback`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, state }),
          },
        );

        const data: OAuthResponse = await res.json();
        console.log('[OAuth Debug] Response from backend:', data);

        localStorage.setItem('google_oauth_data', JSON.stringify(data));
        proceedWithSignIn(data);
      } catch (err) {
        console.error('[OAuth Debug] OAuth login failed:', err);
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Something went wrong during login.',
        });
        router.push('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    handleGoogleOAuth();
  }, [searchParams, router, toast]);

  const proceedWithSignIn = async (data: OAuthResponse) => {
    const backendData = data?.data;

    if (!backendData || !backendData.user || !backendData.auth?.token) {
      toast({
        variant: 'destructive',
        title: 'Missing login data',
        description: 'OAuth response is missing required fields.',
      });
      router.push('/auth/signin');
      return;
    }

    if (backendData.auth_type === 'SIGNUP') {
      router.push('/auth/emailVerify');
      return;
    }

    const token = backendData.auth.token;
    const user = backendData.user;

    await signIn('custom-google-token', {
      token,
      user: JSON.stringify(user),
    });

    // 避免 session 還沒準備好，延遲確認
    setTimeout(async () => {
      const session = await getSession();
      console.log('[OAuth Debug] session:', session);

      localStorage.removeItem('google_oauth_data');

      if (session?.user?.onBoarding === false) {
        router.push('/auth/onboarding');
      } else {
        router.push('/mentorPool');
      }
    }, 1000);
  };

  return (
    <div>{loading ? 'Signing you in with Google...' : 'Redirecting...'}</div>
  );
}
