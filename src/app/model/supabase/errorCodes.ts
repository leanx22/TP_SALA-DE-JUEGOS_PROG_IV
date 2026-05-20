export const SUPABASE_ERRORS: Record<string, string> = {
    'invalid_credentials':'Las credenciales no coinciden con ningún usuario en el sistema.',
    'email_not_confirmed':'El correo electrónico aún no ha sido confirmado.',
    'over_request_rate_limit':'Demasiados intentos fallidos. Esperá unos minutos y volvé a intentar.',
    'user_banned':'Te fuiste baneado.',
    'weak_password':'La contraseña es muy debil. Debe tener, al menos, 6 caracteres.',
    'user_already_exists':'El correo ya está registrado.'
}