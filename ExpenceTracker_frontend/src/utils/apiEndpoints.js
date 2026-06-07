const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const storage = sessionStorage;

const getToken = () => storage.getItem('token');

const request = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  } catch {
    throw new Error(
      'Cannot connect to server. Make sure the backend is running on port 5000.'
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const register = (body) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(body) });

export const login = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const getExpenses = (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category) query.set('category', params.category);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  return request(`/expenses${qs ? `?${qs}` : ''}`);
};

export const getDashboard = () => request('/expenses/dashboard');

export const createExpense = (body) =>
  request('/expenses', { method: 'POST', body: JSON.stringify(body) });

export const updateExpense = (id, body) =>
  request(`/expenses/${id}`, { method: 'PUT', body: JSON.stringify(body) });

export const deleteExpense = (id) =>
  request(`/expenses/${id}`, { method: 'DELETE' });

export const saveSession = (token, user) => {
  storage.setItem('token', token);
  storage.setItem('user', JSON.stringify(user));
};

export const clearSession = () => {
  storage.removeItem('token');
  storage.removeItem('user');
};

export const getUser = () => {
  const user = storage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getToken();
