import styled from 'styled-components';

const Label = styled.label<{ criteria: string }>`
  border-radius: 15px;
  padding: 2px 10px;
  white-space: nowrap;
  background: ${({ criteria }) =>
    criteria === 'danger'
      ? '#ff4f4f'
      : criteria === 'warn'
      ? '#FBB01F'
      : '#47DD12'};
  color: white;
  font-size: 0.875rem;
  font-weight: var(--font-bold);
`;

export const DangerLabel = () => <Label criteria="danger">위험</Label>;

export const WarnLabel = () => <Label criteria="warn">경고</Label>;

export const NormalLabel = () => <Label criteria="normal">적정</Label>;
