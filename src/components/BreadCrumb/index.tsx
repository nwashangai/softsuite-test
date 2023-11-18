import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { CrumbItem, StyledBreadCrumb } from './styles';

type Props = {
  path: string;
};

type ColumnType = {
  title: string;
  href: string;
};

const columns = {
  'payrole-management': 'Payrole Management',
  'element-setup': 'Element Setup',
  link: 'Element Link',
  element: 'Element',
};

const generateCrumb = (columnList: Array<keyof typeof columns>) => {
  return columnList.reduce((prev: Array<ColumnType>, current) => {
    const columnValue = columns[current];

    if (columnValue) {
      prev.push({ title: columnValue, href: `/` });
    }
    return prev;
  }, [] as Array<ColumnType>);
};

function BreadCrumb({ path }: Props) {
  const columnList = path
    .split('/')
    .filter(Boolean) as (keyof typeof columns)[];
  const crumbs = generateCrumb(columnList);

  return (
    <StyledBreadCrumb separator={<RightOutlined />}>
      {crumbs.map((crumb, index) => (
        <CrumbItem key={index} href={crumb.href}>
          {crumb.title}
        </CrumbItem>
      ))}
    </StyledBreadCrumb>
  );
}

export default BreadCrumb;
