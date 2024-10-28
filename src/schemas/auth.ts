import * as z from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('請輸入電子郵件'),
  password: z.string().min(8, { message: '密碼至少需為 8 個字' }),
});

export const SignUpSchema = z
  .object({
    email: z.string().email('請輸入電子郵件'),
    password: z.string().min(8, { message: '密碼至少需為 8 個字' }),
    confirm_password: z.string().min(8, { message: '密碼至少需為 8 個字' }),
    hasReadTermsOfService: z.boolean().refine((hasRead) => hasRead, {
      message: '請確認並同意服務條款',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: '密碼與確認密碼不符',
    path: ['confirm_password'],
  });
