import { Meta, StoryObj } from '@storybook/react';
import ExtLink from './ExtLink.tsx';

const meta: Meta<typeof ExtLink> = {
  tags: ['autodocs'],
  component: ExtLink,
  title: 'Atoms/External link',
};

export default meta;
type Story = StoryObj<typeof ExtLink>;

/** Component for external link */
export const Primary: Story = {
  argTypes: {
    name: {
      control: 'text',
      description: 'Link label',
    },
    url: {
      control: 'text',
      description: 'Link url',
    },
    size: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
        type: {
          summary: "string: | 's' | 'm' | 'lm' | 'l' | 'xl'",
        },
      },
      description: 'Link size   (optional)',
      options: ['s', 'm', 'lm', 'l', 'xl'],
    },
  },
  args: {
    url: 'https://www.google.com/',
    name: 'Custom link',
    size: 'lm',
  },
};
