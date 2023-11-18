import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = styled(Search)`
  &&& {
    button {
      background-color: ${({ theme }) => theme.primaryColor};

      &:hover {
        background-color: ${({ theme }) => theme.primaryColor};
      }

      > span {
        color: ${({ theme }) => theme.white};
      }
    }
  }
`;
