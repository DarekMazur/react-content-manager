import { Meta, StoryObj } from '@storybook/react';
import P from './P.tsx';
import { faker } from '@faker-js/faker';

/** Paragraph with styles based on theme provider */
const meta: Meta<typeof P> = {
  tags: ['autodocs'],
  component: P,
  title: 'Atoms/Paragraph',
};
export default meta;

type Story = StoryObj<typeof P>;

export const Primary: Story = {
  argTypes: {
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
      description: 'Font size',
      options: ['s', 'm', 'lm', 'l', 'xl'],
    },
    color: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
        type: {
          summary:
            "string: | 'white' | 'blue' | 'lightBlue' | 'darkBlue' | 'red'",
        },
      },
      description: 'Font color',
      options: ['white', 'blue', 'lightBlue', 'darkBlue', 'red'],
    },
    weight: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
        type: {
          summary: "string: | 'regular' | 'bold' | 'fat' | 'thin'",
        },
      },
      description: 'Font weight',
      options: ['regular', 'bold', 'fat', 'thin'],
    },
    family: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'inherit',
        },
        type: {
          summary: "string: | 'main'",
        },
      },
      description: 'Font family',
      options: ['main'],
    },
  },
  args: {
    children: faker.lorem.paragraph(15),
  },
};

export const LargeBold: Story = {
  args: {
    children: faker.lorem.paragraph(15),
    size: 'l',
    weight: 'bold',
  },
};

export const MediumRed: Story = {
  args: {
    children: faker.lorem.paragraph(15),
    size: 'm',
    color: 'red',
  },
};
