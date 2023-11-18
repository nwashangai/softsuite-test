import React from 'react';
import { UserAvatar, UserInfoWrapper, UserWrapper } from './styles';

function User() {
  return (
    <UserWrapper>
      <UserAvatar src="https://i.pravatar.cc" />
      <UserInfoWrapper>
        <span>Young Nwadike</span>
        <span>Project Manager</span>
      </UserInfoWrapper>
    </UserWrapper>
  );
}

export default User;
