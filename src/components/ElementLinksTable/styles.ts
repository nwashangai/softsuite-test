import styled from 'styled-components';
import { Tag as AntTag } from 'antd';

export const View = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: underline;
  cursor: pointer;
`;

export const Tag = styled(AntTag)`
  padding: '0 2px';
  border-radius: '3px';
  cursor: pointer;
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;
