import { useForm, useWatch } from 'react-hook-form';
import U from '@/utils/U';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  nickname: string;
  password: string;
  re_password: string;
};

export const useSignupForm = () => {
  const f = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      re_password: '',
    },
  });

  const r = {
    email: f.register('email', {
      required: true,
      pattern: {
        value: U.validEmailPattern,
        message: '유효하지 않은 이메일 입니다',
      },
    }),
    password: f.register('password', {
      required: true,
      /*       pattern: {
        value: U.validPasswordPattern,
        message: '비밀번호 형식을 확인해주세요',
      }, */
    }),
    re_password: f.register('re_password', {
      required: true,
    }),
    nickname: f.register('nickname', {
      required: '필수 입력 항목입니다',
    }),
  };

  return { f, r };
};
