export interface registrationForm {
    username: string,
    email: string,
    password: string,
};
export interface registrationFormErrors {
    generic: string,
    username: string,
    email: string,
    password: string,
};

export interface loginFields {
    usernameOrEmail: string,
    password: string,
};
export interface loginFormErrors {
    generic: string,
    usernameOrEmail: string,
    password: string,
};