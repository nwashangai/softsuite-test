import styled from 'styled-components';
import { Breadcrumb } from 'antd';

const Item = Breadcrumb.Item;

export const StyledBreadCrumb = styled(Breadcrumb)`
  li:last-child > a {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const CrumbItem = styled(Item)`
  font-weight: 700;
`;
