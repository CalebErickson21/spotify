// Import dependencies
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

const Header = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Logout button clicked")
        await logout();
        navigate('/');
      };

    return (
        <header className="
        sticky w-full top-0 z-50 p-4
        bg-light-background dark:bg-dark-background
        transition duration-300 ease-in-out
        ">
            <div className="flex flex-row justify-between items-center">

                {/* Left: Logo */}
                <div className="flex justify-start items-center
                text-xl font-bold text-light-text-primary dark:text-dark-text-primary
                transition duration-300 ease-in-out
                ">
                    LOGO HERE
                </div>

                {/* Center: Username */}
                { user && (
                    <div className="absolute left-1/2 -translate-x-1/2
                    text-md font-semibold text-light-text-secondary dark:text-dark-text-secondary
                    transition duration-300 ease-in-out
                    ">
                        Welcome back, {user.username}!
                    </div>
                )}

                {/* Right: Login / Logout / Register */}
                <div className="flex justify-end items-center
                text-md font-semibold text-light-text-secondary dark:text-dark-text-secondary
                transition duration-300 ease-in-out
                "> 
                    <h3
                    className="
                    text-md font-semibold text-light-text-secondary dark:text-dark-text-secondary cursor-pointer
                    transition duration-300 ease-in-out
                    hover:text-light-text-primary dark:hover:text-dark-text-primary
                    ">
                        {user ? (
                            <button
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="hover:underline">Login</Link>
                                {" | "}
                                <Link to="/register" className="hover:underline">Register</Link>
                            </>
                        )}
                    </h3>
                </div>

            </div>
        </header>
    )
}

export default Header;