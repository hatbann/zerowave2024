import { useForm, useWatch } from 'react-hook-form';
import U from '@/utils/U';
import { useRouter } from 'next/navigation';
import { resolve } from 'path';

type Inputs = {
  email: string;
  password: string;
};

export const useSinginForm = () => {
  const f = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const r = {
    email: f.register('email', {
      required: true,
      pattern: {
        value: U.validEmailPattern,
        message: '유효하지 않은 이메일 입력',
      },
    }),
    password: f.register('password', {
      required: true,
      /*       pattern: {
        value: U.validPasswordPattern,
        message: "비밀번호 형식을 확인해주세요",
      }, */
    }),
  };

  return { f, r };
};
