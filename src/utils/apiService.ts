export async function apiService<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<{ data?: T; error?: string }> {
  const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://drsb8tyzjf.execute-api.eu-west-3.amazonaws.com/dev';

  try {
    const token = localStorage.getItem('token'); // Obtener el token almacenado
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // Incluir el token de autorización
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Error de servidor' };
    }

    const data = await response.json();
    return { data };

  } catch (error) {
    console.error('Error en apiService:', error);
    return { error: 'Error de red o servidor' };
  }
}