import { JoinFormValue } from '@/app/join/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent } from 'react';
import { FieldValues } from 'react-hook-form';

export const signupHandler = async (inputData: JoinFormValue) => {
  const supabase = createClientComponentClient();

  console.log(inputData);
  try {
    const { data, error } = await supabase.auth.signUp({
      email: inputData.email,
      password: inputData.password,
      options: {
        data: {
          username: inputData.user_name,
          avatar_url: null,
        },
        emailRedirectTo: 'http://localhost:3000/welcome',
      },
    });
    if (error) console.error(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const signinHandler = async (inputData: JoinFormValue) => {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputData.email,
      password: inputData.password,
    });
    if (error) console.error(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
