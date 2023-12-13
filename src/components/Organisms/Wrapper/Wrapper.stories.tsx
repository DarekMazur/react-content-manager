import { Meta, StoryObj } from '@storybook/react';
import Wrapper from './Wrapper.tsx';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof Wrapper> = {
  tags: ['autodocs'],
  component: Wrapper,
  title: 'Organisms/Wrapper',
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

const mockElement = () => {
  return (
    <>
      <div>{faker.lorem.paragraphs({ min: 1, max: 4 })}</div>
      <div>{faker.lorem.paragraphs({ min: 1, max: 4 })}</div>
    </>
  );
};

export const Primary: Story = {
  argTypes: {
    justify: {
      control: 'select',
      description: 'justify-content value',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      table: {
        type: {
          summary:
            'string: | flex-start | flex-end | center | space-between | space-around | space-evenly',
        },
      },
    },
    align: {
      control: 'select',
      description: 'align-item value',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      table: {
        type: {
          summary:
            'string: | flex-start | flex-end | center | baseline | stretch',
        },
      },
    },
    children: {
      control: 'object',
      name: 'Component content (children)',
    },
  },
  args: {
    justify: 'center',
    align: 'center',
    children: mockElement(),
  },
};
