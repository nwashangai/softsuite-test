import React from 'react';
import { MenuProps } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { StyledMenu } from './styles';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const getLink = (label: string, path: string) => {
  return <Link to={path}>{label}</Link>;
};

const CustomMenu = () => {
  const menuItems = [
    getItem('Element Setup', 'element-setup', <SettingFilled />, [
      getItem(
        getLink('Elements', '/payrole-management/element-setup/element'),
        'element'
      ),
    ]),
  ];

  return (
    <StyledMenu
      defaultSelectedKeys={['element']}
      defaultOpenKeys={['element-setup']}
      mode="inline"
      items={menuItems}
    />
  );
};

export default CustomMenu;
