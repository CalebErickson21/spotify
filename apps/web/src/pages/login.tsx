// Import dependencies
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import type { LoginInterface } from '@/utils/types';
import { stripWhitespace } from '@/utils/input';

// Import components
import Input from '@/components/input';
import { Link } from 'react-router-dom';


const Login = () => {
    const { login, loginError, isLoggingIn } = useAuth();
    const navigate = useNavigate();


    // States
    const [usernameEmailPhone, setUsernameEmailPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Login functionality
    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if ((usernameEmailPhone?.length ?? 0) === 0) {
            setError('Username required.');
            return;
        }
        if ((password?.length ?? 0) === 0) {
            setError('Password required.');
            return;
        }

        const params: LoginInterface = {
            usernameEmailPhone: usernameEmailPhone ?? '',
            password: password ?? '',
        }
        await login(params); // Will automatically throw and stop execution here if error
        navigate('/');
    }

    return (
        <div className="
        flex flex-row h-full w-full items-center justify-center
        px-4 py-2
        ">
            {/* Left side */}
            <div
            className="hidden md:flex flex-1 h-full flex-col items-center justify-center
            ">
                WELCOME BACK TO TEMPLATE APP (LOGO)
            </div>

            {/* Right side */}
            <div
            className="flex flex-1 flex-col h-full items-center justify-center
            ">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-2 w-full items-center justify-center">
                    {/* Username input */}
                    <div className="w-1/4 flex flex-col gap-2">
                        <Input
                        required
                        disabled={isLoggingIn}
                        value={usernameEmailPhone}
                        onChange={(e) =>
                            setUsernameEmailPhone(stripWhitespace(e.target.value))
                        }
                        type="text"
                        placeholder="Username" />

                        {/* Password input */}
                        <Input
                        required
                        disabled={isLoggingIn}
                        value={password}
                        onChange={(e) => setPassword(stripWhitespace(e.target.value))}
                        type="password"
                        placeholder="Password" />
                    </div>

                    {/* Login button */}
                    <button
                    disabled={isLoggingIn}
                    className="w-auto p-1 mt-2
                    text-accent font-semibold shadow-sm shadow-accent
                    bg-light-surface hover:bg-light-background
                    dark:bg-dark-surface dark:hover:bg-dark-background
                    disabled:opacity-50 disabled:cursor-not-allowed
                    rounded-md p-1
                    transition duration-300 ease-in-out
                    "
                    type="submit">{isLoggingIn ? 'Logging in...' : 'Login'}</button>
                </form>

                {(loginError || error) && (
                    <h4 className="text-md mt-2 text-red-500">
                        {loginError || error}
                    </h4>
                )}

                <h3
                className="text-md mt-2 text-accent">
                    Don't have an account? <Link
                    to="/register"
                    className="underline hover:font-bold"
                    >Register</Link></h3>
            </div>
        </div>
    )
}

export default Login;