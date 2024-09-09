'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();
    signOut();
    router.push('/login');
    return <>Loading...</>;
}
