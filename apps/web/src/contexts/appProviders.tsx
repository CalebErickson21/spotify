// Import providers
import { AuthProvider } from "./auth"

// App providers component
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
                { children }
        </AuthProvider>
    )
}
