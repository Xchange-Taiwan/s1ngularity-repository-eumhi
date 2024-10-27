import React from 'react';

import AuthButton from '@/components/auth/AuthButton';
import AuthFormInput from '@/components/auth/AuthFormInput';
import { Form } from '@/components/ui/form';

import { formFieldData } from './_constants';
import TermsOfServiceCheckbox from './_TermsOfServiceCheckbox';
import { SignUpFormFieldType, SignUpFormProps } from './_types';

export default function SignUpForm({
  form,
  isSubmitting,
  onSubmit,
}: SignUpFormProps) {
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {formFieldData.map((field: SignUpFormFieldType) => (
          <AuthFormInput
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            control={form.control}
          />
        ))}
        <TermsOfServiceCheckbox control={form.control} />
        <AuthButton isSubmitting={isSubmitting}>註冊</AuthButton>
      </form>
    </Form>
  );
}
