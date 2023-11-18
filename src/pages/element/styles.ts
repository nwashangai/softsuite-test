import styled from 'styled-components';
import { Typography } from 'antd';

export const ElementContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 10px;
  max-width: 1255px;
`;

export const Title = styled(Typography.Title)`
  &&& {
    color: ${({ theme }) => theme.textColor};
  }
`;
