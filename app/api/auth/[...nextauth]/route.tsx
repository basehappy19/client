import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    });
                    
                    if (response.ok) {
                        const user = await response.json();
                        if (user) {
                            return {
                                userId: user.payload.user.userId,
                                username: user.payload.user.username,
                                name: user.payload.user.name,
                                canManageUsers: user.payload.user.canManageUsers,
                                accessToken: user.token,
                            };
                        } else {
                            console.log("Invalid user object:", user);
                            return null;
                        }
                    } else {
                        console.log("API response not ok:", response.statusText);
                        return null;
                    }
                } catch (err) {
                    console.log("Authorization error:", err);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId;
                token.username = user.username;
                token.name = user.name;
                token.canManageUsers = user.canManageUsers;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.userId = token.userId;
                session.user.username = token.username;
                session.user.name = token.name;
                session.user.canManageUsers = token.canManageUsers;
                session.user.accessToken = token.accessToken;
            }
            return session;
        }
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
