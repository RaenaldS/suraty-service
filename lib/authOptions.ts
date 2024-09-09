import { verify } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60,
        // maxAge: 60 * 60,
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                let res = await prisma.users.findUnique({ where: { user_name: username } });
                if (!res) {
                    throw new Error('Username tidak ditemukan!');
                }

                if (res.user_deleted !== null) {
                    throw new Error('User sudah dihapus! Silahkan hubungi admin.');
                }

                // const password_benar = await verify(password, res.user_pass);
                const password_benar = res.user_pass;
                if (!password_benar) {
                    throw new Error('Password anda salah!');
                }

                // if everything is fine
                // saveLog(req, res.user_id, res.user_name);
                // console.log(res);
                return {
                    id: String(res.user_id),
                    name: res.user_nama,
                    username: res.user_name,
                    email: res.user_email,
                    role: +res.user_level,
                    image: res.user_image,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
        // error: '/auth/error',
        signOut: '/logout',
    },
    callbacks: {
        async jwt(params) {
            // update token
            if (params.user) {
                // console.log("params jwt", params);
                params.token.id = params.user.id;
                params.token.role = params.user.role;
                params.token.username = params.user.username;
                params.token.email = params.user.email;
            }
            // return final_token
            // console.log("params tokens", params.token);
            return params.token;
        },
        async session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                // console.log("token session", token);
                session.user.id = token.id.toString();
                session.user.role = token.role;
                session.user.username = token.username;
                session.user.email = token.email;
            }
            return session;
        },
    },
};
