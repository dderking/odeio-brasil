import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Verifica se a URL de redirecionamento é relativa ou pertence ao mesmo site
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    // Adicione outros callbacks conforme necessário, por exemplo:
    // async session({ session, token, user }) { ... }
    // async jwt({ token, user, account, profile, isNewUser }) { ... }
  },
  // Considere adicionar outras opções conforme necessário:
  // pages: { ... },
  // session: { ... },
  // jwt: { ... },
})
