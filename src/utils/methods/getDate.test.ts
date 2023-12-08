import '@testing-library/jest-dom';
import { getDate } from './getDate.ts';

const testDate = new Date();

describe('Method getDate:', () => {
  it('Return proper year', () => {
    expect(getDate()).toBe(testDate.getFullYear());
  });
});
