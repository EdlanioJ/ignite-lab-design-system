import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

import { AuthProvider } from '../../hooks/auth';
import { SignIn } from './SignIn';

export default {
  title: 'Pages/Sign in',
  component: SignIn,
  decorators: [
    (Story) => {
      return <AuthProvider>{Story()}</AuthProvider>;
    },
  ],
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.post('/sessions', (req, res, ctx) => {
        return res(
          ctx.json({
            accessToken: 'any_token',
            username: 'edlanioj',
            id: 'any_id',
          })
        );
      }),
    ],
  },
};

export const LoginSuccess = Template.bind({});
LoginSuccess.parameters = {
  msw: {
    handlers: [
      rest.post('/sessions', (req, res, ctx) => {
        return res(
          ctx.json({
            accessToken: 'any_token',
            username: 'edlanioj',
            id: 'any_id',
          })
        );
      }),
    ],
  },
};
LoginSuccess.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(
    canvas.getByPlaceholderText('Digite seu e-mail'),
    'edlanioj@gmail.com'
  );
  userEvent.type(canvas.getByPlaceholderText('*******'), '1234567');
  userEvent.click(canvas.getByLabelText('Lembrar de mim por 30 dias'));
  userEvent.click(canvas.getByRole('button'));

  await waitFor(() =>
    expect(
      canvas.getByText('Usuário edlanioj logado com sucesso')
    ).toBeInTheDocument()
  );
};

export const LoginFailure = Template.bind({});
LoginFailure.parameters = {
  msw: {
    handlers: [
      rest.post('/sessions', (req, res, ctx) => {
        return res(ctx.status(401), ctx.text('E-mail ou senha invalida'));
      }),
    ],
  },
};
LoginFailure.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.type(
    canvas.getByPlaceholderText('Digite seu e-mail'),
    'edlanioj@gmail.com'
  );
  userEvent.type(canvas.getByPlaceholderText('*******'), '1234567');
  userEvent.click(canvas.getByRole('button'));

  await waitFor(
    () =>
      expect(canvas.getByText('E-mail ou senha invalida')).toBeInTheDocument(),
    {
      interval: 1000,
    }
  );
};
