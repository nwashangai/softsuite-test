import styled from 'styled-components';
import { Layout as AntLayout, Menu } from 'antd';

const { Header, Content, Sider } = AntLayout;

export const StyledMenu = styled(Menu)`
  &&& {
    .ant-menu-submenu-selected > .ant-menu-submenu-title,
    .ant-menu-submenu-title:hover,
    .ant-menu-submenu-selected > .ant-menu-submenu-title > span {
      background-color: ${(props) => props.theme.primaryColor};
      color: ${(props) => props.theme.white};
    }
  }

  .ant-menu-item-selected {
    background-color: ${(props) => props.theme.selectioBg};
  }
`;

export const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

export const ContentLayout = styled(AntLayout)`
  margin-top: 65px;
`;

export const StyledSider = styled(Sider)`
  padding-top: 20px;
  overflow: auto;
  left: 0;

  &&& {
    background-color: ${(props) => props.theme.white};
  }
`;

export const LogoWrapper = styled.div`
  width: 250px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const StyledHeader = styled(Header)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  background-color: ${(props) => props.theme.white};
  padding: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
`;

export const StyledContent = styled(Content)`
  > * {
    margin-left: 5%;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  max-width: 400px;

  > span {
    padding: 5px;
  }
`;
