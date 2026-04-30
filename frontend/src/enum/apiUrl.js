export const AUTH_URLS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CHANGE_PASSWORD: '/auth/change-password',
    UPDATE_USER: '/auth/update-user',
}

export const NOTE_URLS = {
    GET_NOTES: '/notes',
    CREATE_NOTE: '/notes',
    UPDATE_NOTE: (id) => `/notes/${id}`,
    DELETE_NOTE: (id) => `/notes/${id}`,
}