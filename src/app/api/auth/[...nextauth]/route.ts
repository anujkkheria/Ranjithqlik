import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import generateTicket from '../../utils/qlik-ticket';
import userData from '../../utils/fetchData';

const authOptions = {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials, _req): Promise<any> => {
                const { username, password } = credentials || {};
                const user = userData?.find((u: any) => u.name === username && u.password === password)
                if (user) {
                    const data = await generateTicket(user.directory, user.userId);
                    console.log(data);

                    if (data)
                        return { ...user, ...data }
                    else
                        return null
                } else {
                    return null
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
        async jwt({ token, account, user }: any) {
            if (account?.accessToken) token.accessToken = account.accessToken;
            return { ...token, ...account, ...user };
        },
        async session({ session, token, _user }: any) {
            return { ...session, ...token, ..._user }
        },
    },
}

// @ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }