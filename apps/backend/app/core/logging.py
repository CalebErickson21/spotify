# Import dependencies
from app.core.settings import settings
from datetime import datetime, timezone
import logging
from pathlib import Path


def _reserved_log_record_keys() -> frozenset[str]:
    """Keys managed by LogRecord / Formatter; everything else is treated as user `extra`."""
    lr = logging.LogRecord(
        name="",
        level=logging.NOTSET,
        pathname="",
        lineno=0,
        msg="",
        args=(),
        exc_info=None,
    )
    reserved = set(lr.__dict__)
    reserved.update(("message", "asctime", "taskName"))
    return frozenset(reserved)


_RESERVED_KEYS = _reserved_log_record_keys()


class ExtraFormatter(logging.Formatter):
    """Standard line plus any varying ``extra`` fields from the log call."""

    def format(self, record: logging.LogRecord) -> str:
        extras = {
            k: v
            for k, v in record.__dict__.items()
            if k not in _RESERVED_KEYS and not k.startswith("_")
        }
        base = super().format(record)
        if not extras:
            return base
        tail = " ".join(f"{k}={v!r}" for k, v in sorted(extras.items()))
        return f"{base} [{tail}]"


def setup_logging(level=logging.DEBUG):
    """
    docstring TODO
    """

    # Create logs directory
    logs_dir = Path(settings.LOGS_DIR)
    logs_dir.mkdir(exist_ok=True)  # Don't raise error if path already exists

    # Get timestamp and log file name
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    # log_file = logs_dir / f"log_{timestamp}.log"
    log_file = logs_dir / "app.log"

    # Write header message
    with open(log_file, "w", encoding="utf-8") as f:
        f.write(f"===== LOG FILE {timestamp} =====\n")

    # Defines fields for logs; varying keys from ``extra=`` are appended after ``|``
    formatter = ExtraFormatter(
        "[%(asctime)s] [%(levelname)s] [%(name)s] [%(filename)s:%(lineno)d] [%(message)s]"
    )

    # Get app level logger to avoid conflicts with root
    # logger.getLogger(__name__) creates child loggers
    app_logger = logging.getLogger("app")

    # Set log level (INFO, DEBUG, WARNING, ERROR)
    app_logger.setLevel(level)

    # Avoid duplicate root handlers
    if app_logger.handlers:
        return

    # Outputs logs to terminal (stdout / stderr)
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # Outputs logs to log file
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(formatter)

    # Attach handlers to logger
    # root_logger.addHandler(console_handler)
    app_logger.addHandler(file_handler)
