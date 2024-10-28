export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/admin/:path*"]  // ajuste conforme suas rotas protegidas
}
