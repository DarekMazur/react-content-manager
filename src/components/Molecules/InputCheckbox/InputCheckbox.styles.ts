import { styled } from 'styled-components';

interface ICheckboxTypes {
  $isChecked: boolean;
}

export const CheckboxSetting = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em 0;
`;

export const CheckboxLabel = styled.span`
  margin-right: 1em;
`;

export const CheckboxSwitch = styled.span`
  display: block;
  background-image: linear-gradient(hsl(225, 10%, 60%), hsl(225, 10%, 95%));
  box-shadow: 0 0 0.125em 0.125em hsl(225, 10%, 90%) inset;
  border-radius: 1em;
  flex-shrink: 0;
  position: relative;
  width: 5em;
  height: 2em;

  &::before,
  &::after {
    display: block;
    border-radius: 0.75em;
    content: '';
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    width: 4.5em;
    height: 1.5em;
  }

  &::before {
    background-color: hsl(225, 10%, 60%);
  }

  &::after {
    box-shadow: 0 0 0.5em hsl(225, 10%, 20%) inset;
    z-index: 1;
  }
`;

export const CheckboxFill = styled.span`
  border-radius: 0.75em;
  overflow: hidden;
  position: absolute;
  top: 0.25em;
  right: 0;
  left: 0.25em;
  width: 4.5em;
  height: 1.5em;
  z-index: 1;
`;

export const CheckboxInput = styled.input<ICheckboxTypes>`
  border-radius: 1em;
  box-shadow: 0 0 0 0.125em hsla(225, 90%, 50%, 0);
  cursor: pointer;
  outline: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  transition: box-shadow calc(0.3s / 2) cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 2;
  -webkit-appearance: none;
  appearance: none;

  &:focus-visible {
    box-shadow: 0 0 0 0.125em hsl(225, 90%, 50%);
  }

  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    display: block;
    position: absolute;
    transform: ${({ $isChecked }) => $isChecked && 'translateX(3.5em)'};
    transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  }

  &::before {
    background-image: linear-gradient(hsl(0, 0%, 100%), hsl(225, 10%, 60%));
    box-shadow:
      0 0 0.125em 0.0625em hsl(225, 10%, 40%),
      0 0.25em 0.25em hsla(225, 10%, 10%, 0.4);
    top: 0.125em;
    left: 0.125em;
    width: 1.75em;
    height: 1.75em;
  }

  &::after {
    background-image: linear-gradient(hsl(225, 10%, 90%), hsl(225, 10%, 80%));
    top: 0.25em;
    left: 0.25em;
    width: 1.5em;
    height: 1.5em;
  }
`;

export const CheckboxText = styled.span<ICheckboxTypes>`
  background-color: hsl(103, 90%, 50%, 0.5);
  color: hsl(103, 90%, 10%);
  display: block;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 2;
  opacity: 0.6;
  padding: 0 0.75em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-shadow: 0 0.0625rem 0 hsl(103, 90%, 55%);
  transform: ${({ $isChecked }) =>
    $isChecked ? 'translateX(0)' : 'translateX(-4.25em)'};
  transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -1;

  &:last-of-type {
    background-color: hsla(0, 0%, 0%, 0);
    color: hsl(225, 10%, 10%);
    text-shadow: 0 0.0625rem 0 hsl(225, 10%, 75%);
    text-align: right;
    transform: ${({ $isChecked }) =>
      $isChecked ? 'translateX(4em)' : 'translateX(0)'};
  }
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
`;
