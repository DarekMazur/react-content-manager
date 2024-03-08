import { Meta, StoryObj } from '@storybook/react';
import InLink from './InLink.tsx';

/** Internal link based on React Router Link component */
const meta: Meta<typeof InLink> = {
  tags: ['autodocs'],
  component: InLink,
  title: 'Atoms/Internal link',
  decorators: [
    (Story) => (
      <div style={{ fontSize: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InLink>;

export const Default: Story = {
  argTypes: {
    name: {
      control: 'text',
      description: 'Link label',
    },
    target: {
      control: 'text',
      description: 'Link url',
    },
  },
  args: {
    target: '/',
    name: 'Internal link',
  },
};
