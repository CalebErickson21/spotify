// Import dependencies
import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Send cookies with requests
})

/** Path only (no query), leading slash, for comparison with backend routes. */
function requestPathname(url: string | undefined): string {
    if (!url) return ''
    try {
        const pathname = new URL(url, 'http://local.invalid').pathname
        return pathname.replace(/\/+$/, '') || '/'
    } catch {
        return (url.split('?')[0] ?? '').replace(/\/+$/, '') || ''
    }
}

/** 401 is expected for guests or wrong password — do not hard-redirect. */
function shouldSkip401Redirect(error: unknown): boolean {
    if (!axios.isAxiosError(error) || !error.config) return false
    const method = (error.config.method ?? 'get').toLowerCase()
    const path = requestPathname(error.config.url)
    if (method === 'get' && path.endsWith('/auth/me')) return true
    if (method === 'post' && path.endsWith('/auth/login')) return true
    return false
}

// Global error handling: redirect to login on unexpected 401
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401 && !shouldSkip401Redirect(error)) {
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)