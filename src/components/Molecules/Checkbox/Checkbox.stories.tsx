import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox.tsx';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof Checkbox> = {
  tags: ['autodocs'],
  component: Checkbox,
  title: 'Molecules/Checkbox',
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: 'Checkbox controller',
      name: 'Controller',
    },
    handleClick: {
      description: 'onClick action',
    },
    uuid: {
      control: 'string',
      description: 'Set automatically - id of element connected with checkbox',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    isChecked: false,
    uuid: faker.string.uuid(),
    handleClick: () => {},
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    uuid: faker.string.uuid(),
    handleClick: () => {},
  },
};
