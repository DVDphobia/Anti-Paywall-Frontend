export interface User {
  id: string;
  email: string;
}

export interface SearchHistory {
  _id: string;
  url: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
} 