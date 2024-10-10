export async function apiService<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<{ data?: T; error?: string }> {
  const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://u7yl46hyr3.execute-api.eu-west-3.amazonaws.com/dev';

  try {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { error: errorData.message || 'Error de servidor' };
      } catch (jsonError) {
        console.error('Error al parsear el error del servidor:', jsonError);
        return { error: 'Error desconocido del servidor' };
      }
    }

    const data: T = await response.json();
    return { data };

  } catch (error) {
    console.error('Error en apiService:', error);
    return { error: 'Error de red o servidor' };
  }
}