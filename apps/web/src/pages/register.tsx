// Import dependencies
import { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import type { RegisterInterface } from '@/utils/types';
import {
  formatPhoneDisplay,
  formatPhoneApi,
  getRawDigits,
} from '@/utils/phone';
import { stripWhitespace } from '@/utils/input';

// Environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Import components
import Input from '@/components/input';
import BillingSetupForm from "@/components/billingSetupForm";


const Register = () => {
    const { register, registerError, isRegistering } = useAuth();
    const navigate = useNavigate();

    // States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [phoneRawDigits, setPhoneRawDigits] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if ((firstName?.length ?? 0) === 0) {
            setError('First name required.');
            return;
        }
        if ((lastName?.length ?? 0) === 0) {
            setError('Last name required.');
            return;
        }
        if ((email?.length ?? 0) === 0) {
            setError('Email required.');
            return;
        }
        if ((emailConfirm?.length ?? 0) === 0) {
            setError('Confirm email required.');
            return;
        }
        if ((email ?? '') !== (emailConfirm ?? '')) {
            setError('Emails do not match.');
            return;
        }
        if ((phoneRawDigits?.length ?? 0) !== 10) {
            setError('Phone number must be 10 digits.');
            return;
        }
        if ((username?.length ?? 0) === 0) {
            setError('Username required.');
            return;
        }
        if ((password?.length ?? 0) === 0) {
            setError('Password required.');
            return;
        }
        if ((passwordConfirm?.length ?? 0) === 0) {
            setError('Confirm password required.');
            return;
        }
        if ((password ?? '') !== (passwordConfirm ?? '')) {
            setError('Passwords do not match.');
            return;
        }

        // Build params
        const params: RegisterInterface = {
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            username: username ?? '',
            email: email ?? '',
            emailConfirm: emailConfirm ?? '',
            phone: formatPhoneApi(phoneRawDigits ?? ''),
            password: password ?? '',
            passwordConfirm: passwordConfirm ?? '',
        }
      
        await register(params);
        navigate('/');
      };


    return (
        <div className="
        flex flex-row h-full w-full items-center justify-center
        px-4 py-2
        ">
            {/* Left side */}
            <div
            className="hidden md:flex flex-1 h-full flex-col items-center justify-center
            ">
                WELCOME TO TEMPLATE APP (LOGO)
            </div>

            {/* Right side */}
            <div
            className="flex flex-1 flex-col h-full items-center justify-center
            ">

                {/* If no client secret, show register form, else show add card form */}
                {!clientSecret ? (
                    <form
                        className="flex flex-col gap-2 w-full items-center justify-center"
                        onSubmit={handleRegister}
                    >

                        {/* Use CSS grid for 2 columns */}
                        <div className="w-1/2 grid grid-cols-2 gap-2">
                            {/* First name input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(stripWhitespace(e.target.value))
                                }
                                type="text"
                                placeholder="First Name"
                                aria-label='First name'
                            />

                            {/* Last name input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(stripWhitespace(e.target.value))
                                }
                                type="text"
                                placeholder="Last Name"
                                aria-label="Last name"
                            />

                            {/* Email input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={email}
                                onChange={(e) =>
                                    setEmail(stripWhitespace(e.target.value))
                                }
                                type="email"
                                placeholder="Email"
                                aria-label='Email'
                            />

                            {/* Confirm email input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={emailConfirm}
                                onChange={(e) =>
                                    setEmailConfirm(stripWhitespace(e.target.value))
                                }
                                type="email"
                                placeholder="Confirm Email"
                                aria-label='Confirm Email'
                            />

                            {/* Phone number input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={
                                    (phoneRawDigits?.length ?? 0) > 0
                                        ? formatPhoneDisplay(phoneRawDigits ?? '')
                                        : ''
                                }
                                onChange={(e) => {
                                    setPhoneRawDigits(getRawDigits(e.target.value));
                                }}
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="+1 (415) 555-2671"
                                aria-label="Phone number (US, 10 digits)"
                            />

                            {/* Username input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={username}
                                onChange={(e) =>
                                    setUsername(stripWhitespace(e.target.value))
                                }
                                type="text"
                                placeholder="Username"
                                aria-label='Username'
                            />

                            {/* Password input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) =>
                                    setPassword(stripWhitespace(e.target.value))
                                }
                                type="password"
                                placeholder="Password"
                                aria-label='Password'
                            />

                            {/* Confirm password input */}
                            <Input
                                required
                                disabled={isRegistering}
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(
                                        stripWhitespace(e.target.value),
                                    )
                                }
                                type="password"
                                placeholder="Confirm Password"
                                aria-label='Confirm Password'
                            />
                        </div>

                        {/* Register button */}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-auto p-1 mt-2
                            text-accent font-semibold shadow-sm shadow-accent
                            bg-light-surface hover:bg-light-background
                            dark:bg-dark-surface dark:hover:bg-dark-background
                            disabled:opacity-50 disabled:cursor-not-allowed
                            rounded-md p-1
                            transition duration-300 ease-in-out
                            "
                        >
                            {isRegistering ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4 w-full items-center justify-center text-center">
                        <div>
                            <h2 className="text-lg font-semibold">Add a payment method</h2>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                Your card is saved securely with Stripe.
                            </p>
                        </div>

                        <Elements options={{ clientSecret }} stripe={stripePromise}>
                            <BillingSetupForm />
                        </Elements>
                    </div>
                )}

                {(registerError || error) && (
                    <h4 className="text-md mt-2 text-red-500">
                        {registerError || error}
                    </h4>
                )}

                <h1>{phoneRawDigits}</h1>

                <h3
                className="text-md mt-2 text-accent
                ">Already have an account? <Link
                    to="/login"
                    className="underline hover:font-bold
                    ">Login</Link></h3>
            </div>
        </div>
    )
}

export default Register;