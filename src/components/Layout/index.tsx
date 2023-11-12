import React from 'react';
import CustomMenu from './CustomMenu';
import { Outlet, useLocation } from 'react-router-dom';
import {
  StyledLayout,
  StyledSider,
  StyledHeader,
  StyledContent,
  ContentLayout,
  HeaderWrapper,
  SearchWrapper,
  LogoWrapper,
} from './styles';
import Search from '../Search';
import User from '../User';
import BreadCrumb from '../BreadCrumb';

const Layout = () => {
  const location = useLocation();
  const pathWithoutQueryString = location.pathname;

  return (
    <StyledLayout>
      <StyledHeader>
        <LogoWrapper>
          <img src="/img/logo.png" alt="logo" />
        </LogoWrapper>

        <HeaderWrapper>
          <SearchWrapper>
            <Search
              placeholder="Search for anything"
              onSearch={() => null}
              enterButton
            />
          </SearchWrapper>
          <User />
        </HeaderWrapper>
      </StyledHeader>
      <ContentLayout>
        <StyledSider width={250}>
          <CustomMenu />
        </StyledSider>
        <StyledContent>
          <BreadCrumb path={pathWithoutQueryString} />
          <Outlet />
        </StyledContent>
      </ContentLayout>
    </StyledLayout>
  );
};

export default Layout;
