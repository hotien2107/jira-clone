export type LoginResponseType = {
    access_token: string
    token_type: string
}

export type RegisterResponseType = {
    success: boolean
}

export type GetUserInfoResponseType = {
    username: string
    email: string
    id: string
}
