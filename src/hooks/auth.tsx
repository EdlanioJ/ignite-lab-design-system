import axios, { AxiosError } from 'axios';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

type SignInData = {
  email: string;
  password: string;
  remember: boolean;
};

type Status = 'success' | 'error' | 'loading' | 'idle';

type User = {
  username: string;
  id: string;
};

type AuthContextData = {
  user: User | null;
  error: string | null;
  status: Status;
  handleSignIn(data: SignInData): Promise<void>;
};

type AuthResponseData = {
  accessToken: string;
  username: string;
  id: string;
};

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<Status>('idle');

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async (data: SignInData) => {
    setIsLoading(true);
    setStatus('loading');
    setError(null);
    setUser(null);
    try {
      const response = await axios.post<AuthResponseData>('/sessions', data);
      setUser({
        id: response.data.id,
        username: response.data.username,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        return;
      }
      console.log(error);
      setError('não foi possível fazer o login');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ status, user, error, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx;
}
