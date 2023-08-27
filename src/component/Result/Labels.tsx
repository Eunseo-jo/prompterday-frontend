import styled from 'styled-components';

const Label = styled.label<{ criteria: string }>`
  border-radius: 15px;
  padding: 5px 10px;
  white-space: nowrap;
  background: ${({ criteria }) =>
    criteria === 'danger'
      ? 'var(--color-danger)'
      : criteria === 'warn'
      ? 'var(--color-warning)'
      : 'var(--color-good)'};
  color: white;
  font-size: 0.875rem;
  font-weight: var(--font-regular);
`;

export const DangerLabel = () => <Label criteria="danger">위험</Label>;

export const WarnLabel = () => <Label criteria="warn">경고</Label>;

export const NormalLabel = () => <Label criteria="normal">적정</Label>;
