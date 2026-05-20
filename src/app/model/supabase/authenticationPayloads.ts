export interface LoginPayload{
    email: string,
    password: string
}

export interface RegistrationPayload extends LoginPayload{
    age:number,
    name:string,
    lastName:string
}