export const jwtCookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true, 
    secure: false,//true for HTTPS
    SameSite: 'Lax', // request originating from other source
    path: '/', //works for / and paths beyond
}