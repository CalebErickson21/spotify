# Import dependencies
import logging

# Constants
LOG_FILE = "logs.log"


class Logger:
    def __init__(self):
    # Set up the logger once
        self.__logger = logging.getLogger("logger")
        self.__logger.setLevel(logging.DEBUG)  # Capture all levels

        # Avoid adding multiple handlers if the function is called repeatedly
        if not self.__logger.handlers:
            file_handler = logging.FileHandler(LOG_FILE)
            formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
            file_handler.setFormatter(formatter)
            self.__logger.addHandler(file_handler)

        # Clear the log file
        with open(LOG_FILE, "w") as f:
            f.write("===== LOGS =====\n\n")

    # Logging function
    def log(self, level: str, message: str):
        level = level.lower()
        if level == "debug":
            self.__logger.debug(message)
        elif level == "info":
            self.__logger.info(message)
        elif level == "warning":
            self.__logger.warning(message)
        elif level == "error":
            self.__logger.error(message)
        elif level == "critical":
            self.__logger.critical(message)
        else:
            self.__logger.warning(f"Unknown log level '{level}' - message: {message}")

