// Environment context type
export type ScreenSizeType = 'small' | 'medium' | 'large';
export interface EnvironmentContextInterface {
    screenSize: ScreenSizeType
    setScreenSize: React.Dispatch<React.SetStateAction<ScreenSizeType>>;
};


export interface AuthContextInterface {
    user: UserInterface | null;
    isLoading: boolean;

    register: (data: RegisterInterface) => Promise<void>;
    registerError: string | null;
    isRegistering: boolean;

    login: (data: LoginInterface) => Promise<void>;
    loginError: string | null;
    isLoggingIn: boolean;

    logout: () => Promise<void>;
}

export interface UserInterface {
    username: string | null;
}

// Input props types
export interface InputPropsInterface extends React.InputHTMLAttributes<HTMLInputElement> {};

// Login interface
export interface LoginInterface {
    usernameEmailPhone: string;
    password: string;
}

// Register interface
export interface RegisterInterface {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailConfirm: string;
    phone: string;
    password: string;
    passwordConfirm: string;
}
