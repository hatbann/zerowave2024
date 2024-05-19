import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FormEvent } from 'react';
import { FieldValues } from 'react-hook-form';

export const signupHandler = async (data: FieldValues) => {
  const supabase = createClientComponentClient();

  console.log(data);
  /*     try {
      const { data, error } = await supabase.auth.signUp({
        email : ""
        password : ""
      });
      if (error) console.error(error);
      console.log(data);
    } catch (error) {
      console.error(error);
    } */
};
