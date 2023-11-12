import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { UserAvatar, UserInfoWrapper, UserWrapper } from './styles';

function User() {
  return (
    <UserWrapper>
      <UserAvatar icon={<AntDesignOutlined />} />
      <UserInfoWrapper>
        <span>Henry Okoro</span>
        <span>Project Manager</span>
      </UserInfoWrapper>
    </UserWrapper>
  );
}

export default User;
