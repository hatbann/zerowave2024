import { useForm, useWatch } from 'react-hook-form';
import U from '../utils/U';
import { useRouter } from 'next/navigation';
import { resolve } from 'path';

export type ReviewInputs = {
  title: string;
  content: string;
  location: string;
  address: string;
};

export const useReviewForm = ({
  location,
  address,
}: {
  location: string | undefined;
  address: string | undefined;
}) => {
  const f = useForm<ReviewInputs>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      content: '',
      location: location,
      address: address,
    },
  });

  const r = {
    title: f.register('title', {
      required: true,
      minLength: 1,
    }),
    content: f.register('content', {
      required: true,
      minLength: 1,
    }),
  };

  return { f, r };
};
