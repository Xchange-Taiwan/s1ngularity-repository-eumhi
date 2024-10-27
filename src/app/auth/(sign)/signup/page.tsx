'use client';
import React from 'react';

import AuthTitle from '@/components/auth/AuthTitle';
import Divider from '@/components/auth/Divider';
import GoogleSignUpButton from '@/components/auth/GoogleButton';

import useSignUpForm from '../../../../hooks/auth/useSignUpForm';
import SignInLink from './_SignInLink';
import SignUpForm from './_SignUpForm';

export default function SignUpPage() {
  const { form, isSubmitting, onSubmit } = useSignUpForm();

  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-[400px] flex-col gap-6">
        <AuthTitle title="註冊 Talents 帳戶" />
        <SignUpForm
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
        <SignInLink />
        <Divider />
        <GoogleSignUpButton isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
