import { Envelope, Lock } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Heading } from '../../components/Heading';
import { Logo } from '../../components/Logo/Logo';
import { Text } from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { handleSignIn, user, error, status } = useAuth();

  function toggleRemember() {
    setRemember((val) => !val);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleSignIn({ email, password, remember });
  }

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-1 flex-col justify-center items-center">
      <header className="flex flex-col items-center mb-10">
        <Logo />
        <Heading size="lg" className="mt-6" asChild>
          <h1>Ignite Lab</h1>
        </Heading>
        <Text className="text-gray-400">Faça login e comece a usar</Text>
      </header>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 items-stretch w-full max-w-[400px]"
      >
        {status === 'success' && (
          <Heading size="sm">
            Usuário {user?.username} logado com sucesso
          </Heading>
        )}
        {status === 'error' && <Heading size="sm">{error}</Heading>}
        <label htmlFor="email" className="flex flex-col gap-3">
          <Text className="font-semibold">Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </TextInput.Root>
        </label>

        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Sua senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              id="password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />
          </TextInput.Root>
        </label>

        <label className="flex items-center gap-2" htmlFor="remember">
          <Checkbox
            id="remember"
            name="remember"
            checked={remember}
            onClick={toggleRemember}
            aria-label="remember me"
          />
          <Text size="sm" className="text-gray-200">
            Lembrar de mim por 30 dias
          </Text>
        </label>

        <Button type="submit" disabled={status === 'loading'}>
          Entrar na plataforma
        </Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size="sm">
          <a href="#" className="underline text-gray-400">
            Esqueceu sua senha?
          </a>
        </Text>
        <Text asChild size="sm">
          <a href="#" className="underline text-gray-400">
            Não possui conta? Criar uma agora
          </a>
        </Text>
      </footer>
    </div>
  );
}
