import styled from 'styled-components';
import { Avatar } from 'antd';

export const UserWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const UserAvatar = styled(Avatar)`
  align-self: center;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: auto;

  > span {
    font-size: 12px;
  }

  > span {
    line-height: 15px;
  }

  > span:first-child {
    font-weight: bold;
  }

  > span:last-child {
    font-weight: lighter;
  }
`;
