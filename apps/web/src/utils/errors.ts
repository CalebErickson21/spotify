import axios from 'axios';

export function getApiErrorMessage(error: unknown): string {
  /**
   * TODO
   */
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((item) =>
          typeof item === 'string'
            ? item
            : typeof item === 'object' && item && 'msg' in item
              ? String((item as { msg: string }).msg)
              : JSON.stringify(item)
        )
        .join(', ');
    }
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}