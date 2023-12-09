export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  loginUser: User;
}

export interface LoginUserVariables {
  input: LoginUserInput;
}
