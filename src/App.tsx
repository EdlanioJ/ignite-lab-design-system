import { AuthProvider } from './hooks/auth';
import { SignIn } from './page/SignIn';
import './styles/global.css';

export function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}
