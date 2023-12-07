import { Meta, StoryObj } from '@storybook/react';
import FooterWrapper from './Footer.tsx';

const meta: Meta<typeof FooterWrapper> = {
  tags: ['autodocs'],
  component: FooterWrapper,
};

export default meta;
type Story = StoryObj<typeof FooterWrapper>;

/** Footer component */
export const Primary: Story = {};
