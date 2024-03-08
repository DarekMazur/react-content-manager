import '@testing-library/jest-dom';
import { getYear } from './getYear.ts';

const testDate = new Date();

describe('Method getDate:', () => {
  it('Return proper year', () => {
    expect(getYear()).toBe(testDate.getFullYear());
  });
});
