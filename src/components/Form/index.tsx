import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';


import * as S from './styles';

import { MdEmail, MdLock } from 'react-icons/md';

import Button from '../Button';

import { useRouter } from 'next/dist/client/router';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface Props {
  register: boolean;
}

interface FormInput {
  email: string;
  password: string;
}

const Form = ({register: isRegister}: Props) => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }} = useForm<FormInput>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleError = (type: string | undefined, inputType: string) => {
    if (type === 'required') {
      return `${inputType === 'email' ? 'Email' : 'Password'} field is required`;
    }

    if (type === 'pattern') {
      return 'Email is not valid.';
    }

    return;
  };

  const onSubmit: SubmitHandler<FormInput> = async ({email, password}) => {
    if (isRegister) {
      await axios.post('/api/auth/signup', {
        email,
        password
      }).then(response => {
        toast.success(response.data.message);
        router.push('/');
      }).catch(error => {
        toast.error(error.response.data.message);
      });
      return;
    }

    await signIn('credentials', {
      redirect: false,
      email,
      password,
    }).then(data => {
      if (!data?.error) {
        toast.success('Logged. Redirecting...');
        router.push('/dashboard');
        return;
      }
      toast.error(data.error);
    });
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputContainer>
        <MdEmail size={24} color={'#828282'}/>
        <S.Input
          placeholder='Email'
          {...register('email', {required: true, pattern: emailRegex})}
          aria-invalid={errors.email ? 'true' : 'false'}/>
      </S.InputContainer>
      <S.Errors>{handleError(errors.email?.type, 'email')}</S.Errors>

      <S.InputContainer>
        <MdLock size={24} color={'#828282'}/>
        <S.Input
          placeholder='Password'
          type='password' {...register('password', {required: true})}
          aria-invalid={errors.password ? 'true' : 'false'}/>
      </S.InputContainer>
      <S.Errors>{handleError(errors.password?.type, 'password')}</S.Errors>

      {
        !isRegister ? (
          <Button isEdit={false}>Login</Button>
        ) : (
          <Button isEdit={false}>Start coding now</Button>
        )
      }
    </S.Form>
  );
};

export default Form;
