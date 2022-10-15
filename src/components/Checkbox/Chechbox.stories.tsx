import { Meta, StoryObj } from '@storybook/react';
import { Envelope } from 'phosphor-react';
import { Text } from '../Text';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => {
      return (
        <div className="flex items-center gap-2">
          {Story({ args: { id: 'remember', 'aria-label': 'remember me' } })}
          <label htmlFor="remember">
            <Text size="sm">Lembrar de mim por 30 dias</Text>
          </label>
        </div>
      );
    },
  ],
} as Meta<CheckboxProps>;

export const Default: StoryObj<CheckboxProps> = {};
