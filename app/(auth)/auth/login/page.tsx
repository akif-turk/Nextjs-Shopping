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
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email required.',
  }),

  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'deneme12@gmail.com',
      password: 'denemeE12',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!response?.error) {
      router.push('/');
      router.refresh();
    } else {
      response.status === 401
        ? setError('Your email of password is incorrect')
        : null;

      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/5 ">
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
        <Button type="submit">Login</Button>

        <div className="mt-8 spas-x-2">
          <Label> Don't have an Account</Label>
          <Link href={'/auth/register'}>Click here Register page</Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
