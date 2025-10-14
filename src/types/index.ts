export interface User {
  email: string;
  password: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export type ActionResult<T> =
  | { data: T; error?: never }
  | { error: string; data?: never };
