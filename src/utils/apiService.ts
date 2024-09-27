const apiUrl = process.env.REACT_APP_API_URL;

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const apiService = async <T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData= await response.json();
      return { error: errorData.message || 'Error en la solicitud a la API' };
    }

    const data: T = await response.json();
    return { data };
  } catch (error) {
    return { error: (error as Error).message || 'Error en la solicitud' };
  }
};