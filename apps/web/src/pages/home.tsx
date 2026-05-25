// Import dependencies

const Home = () => {

    const slotItems = ["Item 1", "Item 2", "Item 3", "Item 4"]

    return (
        <div className="
        w-full h-full flex flex-col items-center
        px-4 py-2
        ">
            <h1 className="
            mt-[15dvh] text-center
            text-6xl font-bold text-light-text-primary dark:text-dark-text-primary
            [text-shadow:0_0_3px]
            transition duration-300 ease-in-out
            ">
                TEMPLATE APP
            </h1>

            <h2 className="
            my-2 text-center
            text-3xl font-semibold text-light-text-secondary dark:text-dark-text-secondary
            transition duration-300 ease-in-out
            ">
                Template App Description
                <br />
                Template App Description
            </h2>

            {/* Split left and right sections */}
            <div className="flex flex-col lg:flex-row w-full h-full mt-4 mb-2">

                {/* Left section */}
                <div className="flex flex-1 flex-col h-full justify-center items-center">
                    
                    <h3 className="text-4xl font-semibold text-center text-light-text-primary dark:text-dark-text-secondary">
                        Template App Feature
                    </h3>

                    {/* Viewport */}
                    <div className="h-[3.5rem] overflow-hidden">
                        {/* Track that moves up/down */}
                        <div className="animate-slot">
                            {[...slotItems, slotItems[0]].map((item, index) => (

                                <div key={index} className="h-[3.5rem] flex items-center justify-center">
                                    <h3 className="text-4xl font-semibold text-accent [text-shadow:0_0_2px]">
                                        {item}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right section */}
                <div className="flex flex-1 flex-col h-full justify-center items-center">
                    <button
                    className="
                    px-4 py-2 rounded-md
                    text-accent font-semibold shadow-md shadow-accent
                    bg-light-surface hover:bg-light-background
                    dark:bg-dark-surface dark:hover:bg-dark-background
                    transition duration-300 ease-in-out
                    text-2xl
                    ">
                        Template App Button
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;