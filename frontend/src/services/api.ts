export const AUTH_TOKEN_KEY = 'algoatlas_token';

export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}
