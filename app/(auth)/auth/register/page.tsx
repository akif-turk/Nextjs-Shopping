'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email required.',
  }),

  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
  firstname: z.string().min(2, {
    message: 'firstname must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'firstname must be at least 2 characters.',
  }),
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'deneme12@gmail.com',
      password: 'denemeE12',
      firstname: 'Youtube',
      lastname: 'Subscribe',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    });

    if (response.status === 201) {
      router.push('/');
      router.refresh();
    } else {
      response.status === 409
        ? setError('A user with this email already exist')
        : null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/5 ">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>firstname</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastname</FormLabel>
              <FormControl>
                <Input placeholder="lastname" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>

        <div className="mt-8 spas-x-2">
          <Label>Allready an Account</Label>
          <Link href={'/auth/login'}>Click here login page</Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPage;
