// Import dependencies
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="
        w-full p-4
        bg-light-background dark:bg-dark-background
        transition duration-300 ease-in-out
        ">
            <div className="flex flex-col justify-center items-center">
                <Link
                to={"/"}
                className="text-lg font-bold text-light-text-secondary dark:text-dark-text-secondary transition duration-300 ease-in-out">
                    © 2026 Template App
                </Link>
            </div>
        </footer>
    )
}

export default Footer;