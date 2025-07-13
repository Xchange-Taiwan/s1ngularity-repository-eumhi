import * as z from 'zod';

//--------------------------------------------------
// 🗃️ Form Schema & Types
//--------------------------------------------------

const educationSchema = z.object({
  subject: z.string().min(1, '請輸入主修'),
  school: z.string().min(1, '請選擇學校'),
  educationPeriodStart: z.string().min(1, '請選擇開始年份'),
  educationPeriodEnd: z.string().min(1, '請選擇結束年份'),
});

const jobSchema = z.object({
  job: z.string(),
  company: z.string(),
  jobPeriodStart: z.string(),
  jobPeriodEnd: z.string(),
  industry: z.string(),
  jobLocation: z.string(),
  description: z.string(),
});

const isBrowser = typeof window !== 'undefined';
export const profileFormSchema = z.object({
  avatarFile: isBrowser ? z.instanceof(File).optional() : z.any().optional(),
  name: z.string().min(1, '請輸入姓名').max(20, '最多不可超過 20 字'),
  location: z.string({ required_error: '請選擇地區' }),
  statement: z.string(),
  about: z.string(),
  industry: z.string(),
  years_of_experience: z.string({ required_error: '請選擇經驗' }),
  experiences: z.array(jobSchema),
  educations: z.array(educationSchema),
  linkedin: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  youtube: z.string(),
  website: z.string(),
  what_i_offer: z.array(z.string()),
  expertises: z.array(z.string()),
  interested_positions: z.array(z.string()).min(1, '請至少選擇一個職位'),
  skills: z.array(z.string()).min(1, '請至少選擇一個技能'),
  topics: z.array(z.string()).min(1, '請至少選擇一個主題'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultValues: ProfileFormValues = {
  avatarFile: undefined,
  name: '',
  location: '',
  statement: '',
  about: '',
  industry: '',
  years_of_experience: '',
  experiences: [],
  educations: [],
  linkedin: '',
  facebook: '',
  instagram: '',
  twitter: '',
  youtube: '',
  website: '',
  what_i_offer: [],
  expertises: [],
  interested_positions: [],
  skills: [],
  topics: [],
};
