import styled from 'styled-components';
import { Typography } from 'antd';

export const Title = styled(Typography.Title)`
  &&& {
    color: ${({ theme }) => theme.textColor};
  }
`;

// *****************************

export const ElementContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 20px;
  max-width: 1255px;
`;

export const ControlWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;
