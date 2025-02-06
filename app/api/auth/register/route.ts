import directus from '@/lib/directus';
import { registerUser } from '@directus/sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstname, lastname, email, password } = await request.json();
    const data = {
      first_name: firstname,
      last_name: lastname,
    };

    const result = await directus.request(registerUser(email, password, data));

    return NextResponse.json({ message: 'Account Created!' }, { status: 201 });
  } catch (e: any) {
    const code = e.errors[0].extensions.code;
    if (code === 'RECORD_NOT_UNIQUE') {
      return NextResponse.json(
        { message: 'This user already exist' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'An unexpected error occured, please try again' },
      { status: 500 }
    );
  }
}
