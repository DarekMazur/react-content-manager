import { Meta, StoryObj } from '@storybook/react';
import Link from './Link.tsx';

const meta: Meta<typeof Link> = {
  tags: ['autodocs'],
  component: Link,
  title: 'External link',
};

export default meta;
type Story = StoryObj<typeof Link>;

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
          summary: 'lm',
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
