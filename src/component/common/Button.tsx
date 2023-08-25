import styled from 'styled-components';

const StyledButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--color-sub-1)' : 'var(--color-main)'};
  color: ${({ disabled }) => (disabled ? 'black' : 'white')};
  font-size: 1.25rem;
  font-weight: var(--font-regular);
  white-space: nowrap;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

interface ButtonProps {
  isDisabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ isDisabled, children, onClick }: ButtonProps) => {
  return (
    <StyledButton disabled={isDisabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
