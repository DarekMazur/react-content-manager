import { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading.tsx';

const meta: Meta<typeof Heading> = {
  tags: ['autodocs'],
  component: Heading,
  title: 'Atoms/Heading',
};

export default meta;

type Story = StoryObj<typeof Heading>;

const argTypes = {
  children: {
    control: 'text',
    description: 'Component children',
    name: 'Heading text',
  },
  tag: {
    control: 'select',
    table: {
      type: {
        summary: "string: | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
      },
    },
    description: 'Heading tag (level)',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  align: {
    control: 'select',
    description: 'text-align',
    table: {
      type: {
        summary:
          "string: | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'match-parent'",
      },
      defaultValue: {
        summary: 'inherit',
      },
    },
    options: [
      'start',
      'end',
      'left',
      'right',
      'center',
      'justify',
      'justify-all',
      'match-parent',
    ],
  },
  size: {
    control: 'select',
    description: 'font-size value',
    table: {
      defaultValue: {
        summary: 'inherit',
      },
      type: {
        summary: "string: | 's' | 'm' | 'lm' | 'l' | 'xl'",
      },
    },
    options: ['s', 'm', 'lm', 'l', 'xl'],
  },
  padding: {
    control: 'text',
    description: 'padding value',
    table: {
      defaultValue: {
        summary: 'inherit',
      },
    },
  },
  margin: {
    control: 'text',
    table: {
      defaultValue: {
        summary: 'inherit',
      },
    },
    description: 'margin value',
  },
};

export const Level1: Story = {
  argTypes,
  args: {
    children: 'Heading level 1',
    tag: 'h1',
    align: 'center',
    size: 'xl',
    padding: '1rem 0',
    margin: '1rem',
  },
};

export const Level2: Story = {
  argTypes,
  args: {
    children: 'Heading level 2',
    tag: 'h2',
    align: 'center',
    size: 'l',
  },
};

export const Level3: Story = {
  argTypes,
  args: {
    children: 'Heading level 3',
    tag: 'h3',
    align: 'center',
    size: 'lm',
  },
};

export const Level4: Story = {
  argTypes,
  args: {
    children: 'Heading level 4',
    tag: 'h4',
  },
};

export const Level5: Story = {
  argTypes,
  args: {
    children: 'Heading level 5',
    tag: 'h5',
  },
};

export const Level6: Story = {
  argTypes,
  args: {
    children: 'Heading level 6',
    tag: 'h6',
  },
};
