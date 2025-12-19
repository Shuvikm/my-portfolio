const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

// Get JWT token for form submission
export const getVisitorToken = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/token`);
  
  if (!response.ok) {
    throw new Error('Failed to get authentication token');
  }
  
  const data = await response.json();
  return data.token;
};

// Contact API - Submit contact form with JWT
export const submitContactForm = async (data: ContactFormData) => {
  // First get a visitor token
  const token = await getVisitorToken();
  
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit contact form');
  }
  
  return response.json();
};

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return response.json();
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects/featured`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch featured projects');
  }
  
  return response.json();
};

// Health check
export const checkServerHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};

// ==================== AUTH API ====================

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Sign up - Register new user
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Failed to sign up');
  }
  
  // Store token in localStorage
  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));
  
  return result;
};

// Login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Failed to login');
  }
  
  // Store token in localStorage
  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));
  
  return result;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Get stored token
export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getStoredToken();
};

// Get user profile from server
export const getUserProfile = async (): Promise<User> => {
  const token = getStoredToken();
  
  if (!token) {
    throw new Error('No authentication token');
  }
  
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Failed to get profile');
  }
  
  return result.user;
};
