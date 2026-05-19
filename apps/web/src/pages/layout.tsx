// Import dependencies
import { Outlet } from "react-router-dom";

// Import components
import ThemeButton from "../components/themeButton";

// Import components
import Header from "@/components/header";
import Footer from "@/components/footer";

// Import styles

// Layout component
const Layout = () => {

    return (
        <div id='layout-container' className='flex flex-col h-screen w-screen m-0 p-0'>
            
            {/* Header */}
            <div
            id='header-container'
            className="sticky w-full top-0 z-50">
                <Header />
            </div>

            {/* Background */}
            <div
            id='background-container'
            className="
            flex flex-1 flex-row min-h-screen w-full
            absolute inset-0 z-0">
                
                {/* Left gradient */}
                <div
                className="
                w-1/2 h-full
                bg-gradient-to-br
                from-light-background via-light-background to-accent/50
                dark:from-dark-background dark:via-dark-background dark:to-dark-background/75
                transition duration-300 ease-in-out
                ">
                </div>

                {/* Right gradient */}
                <div
                className="
                w-1/2 h-full
                bg-gradient-to-bl
                from-light-background via-light-background to-accent/50
                dark:from-dark-background dark:via-dark-background dark:to-dark-background/75
                transition duration-300 ease-in-out
                ">
                </div>
            </div>

            {/* Outlet */}
            <main
            id='outlet-container'
            className="flex-1
            bg-transparent
            transition duration-300 ease-in-out
            z-10">
                <Outlet />
            </main>

            {/* Footer */}
            <div
            id='footer-container'
            className="w-full z-[45]">
                <Footer />
            </div>

            {/* Theme button */}
            <div
            id='theme-button-container'
            className="fixed bottom-4 left-4 z-50">
                <ThemeButton />
            </div>
            
        </div>
    )
}

// Export component
export default Layout;
