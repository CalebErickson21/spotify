// Import dependencies
import type { InputPropsInterface } from '../utils/types'


const Input = ({ ...props }: InputPropsInterface) => {

    return (
        <input
        className="w-full h-full
        border border-2 focus:outline-none focus:ring-1 focus:ring-neutral/50
        bg-light-surface text-light-secondary border-neutral/50
        [&:not(:placeholder-shown)]:text-light-text-primary [&:not(:placeholder-shown)]:bg-light-background
        dark:bg-dark-surface dark:text-dark-secondary dark:border-neutral/50
        dark:[&:not(:placeholder-shown)]:text-dark-text-primary dark:[&:not(:placeholder-shown)]:bg-dark-background
        disabled:opacity-50 disabled:cursor-not-allowed
        rounded-md p-1"
        {...props}
        />
    )
}

export default Input;