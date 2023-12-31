import styled from 'styled-components';
import {
  Input,
  Select,
  Button,
  DatePicker,
  Switch,
  Form as AntForm,
  Radio,
  Drawer as AntDrawer,
  Table as AntTable,
  Dropdown as AntDropdown,
  Result as AntResult,
  ResultProps,
} from 'antd';

export const InputText = styled(Input)`
  padding: 10px;
  border-radius: 4px;
`;

export const TextArea = styled(Input.TextArea)`
  padding: 10px;
  border-radius: 4px;

  && {
    resize: none;
  }
`;

export const InputSelect = styled(Select)`
  && {
    height: 44px;
  }

  .ant-select-selector {
    border-radius: 4px;
  }
`;

export const DateInput = styled(DatePicker)`
  width: 100%;
  border-radius: 4px;
  && {
    height: 44px;
  }
`;

export const InputSwitch = styled(Switch)`
  &[aria-checked='true'] {
    background-color: ${({ theme }) => theme.primaryColor};
  }

  &:not([aria-checked='true']) {
    background-color: ${({ theme }) => theme.danger};
  }

  &&&[aria-checked='true']:hover {
    background-color: ${({ theme }) => theme.grayBg};
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  .ant-radio-checked .ant-radio-inner {
    border-color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.white};
  }

  .ant-radio-wrapper:hover .ant-radio-inner {
    border-color: ${({ theme }) => theme.primaryColor};
  }

  .ant-radio-checked .ant-radio-inner::after {
    margin-block-start: 0;
    margin-inline-start: 0;
    transform: scale(1);
    opacity: 1;
    width: 10px;
    height: 10px;
    top: 2px;
    left: 2px;
    display: table;
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const InputWrap = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const RadioInput = Radio;

export const Form = AntForm;

export const FormItem = styled(AntForm.Item)`
  width: 100%;
  margin-bottom: 15px;

  &&&& {
    label {
      color: ${({ theme }) => theme.textColor};
    }

    label::before {
      content: '';
    }
  }

  .ant-form-item-label {
    white-space: nowrap;
    overflow: visible;
  }
`;

export const DualFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
`;

export const Table = styled(AntTable)`
  margin-top: 20px;
  .ant-pagination .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination .ant-pagination-item {
    background-color: ${({ theme }) => theme.grayBg};

    a {
      color: ${({ theme }) => theme.grayText};
    }
  }

  .ant-pagination .ant-pagination-item-active {
    background-color: ${({ theme }) => theme.secondaryColor};
    border-width: 0;

    a {
      color: ${({ theme }) => theme.white};
    }
  }

  .ant-table-thead .ant-table-cell {
    background-color: ${({ theme }) => theme.secondaryColor};
  }

  &&&& {
    .ant-table-cell {
      color: ${({ theme }) => theme.white};
      font-weight: 400;
    }

    .ant-table-header {
      border-radius: 0;
    }

    .ant-table-cell {
      border-start-start-radius: 0;
    }

    .ant-table-cell {
      border-start-end-radius: 0;
    }
  }
`;

export const Dropdown = styled(AntDropdown)``;

export const ActionItems = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

export const Drawer = styled(AntDrawer)``;

export const GridWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.grayBg};
  border-right: 1px solid ${({ theme }) => theme.grayBg};
  margin-bottom: 100px;
`;

export const GridRow = styled.div`
  display: flex;
  width: 100%;
`;

export const GridCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-top: 1px solid ${({ theme }) => theme.grayBg};
  border-left: 1px solid ${({ theme }) => theme.grayBg};
  padding: 10px;

  > span:first-child {
    text-transform: capitalize;
    color: ${({ theme }) => theme.grayShade1};
    margin-bottom: 8px;
  }

  > span:last-child {
    font-weight: 500;
  }
`;

export const Result = styled(AntResult)<ResultProps & { isDelete?: boolean }>`
  &.ant-result {
    padding: 10px;
  }

  &.ant-result-error .ant-result-icon > .anticon,
  &.ant-result-success .ant-result-icon > .anticon {
    padding: 15px;
    border-radius: 50%;
  }

  &.ant-result-error .ant-result-icon > .anticon {
    background-color: ${({ theme }) => theme.dangerLight};
  }

  &.ant-result-success .ant-result-icon > .anticon {
    background-color: ${({ theme, isDelete }) =>
      isDelete ? theme.dangerLight : theme.success};
    color: ${({ theme, isDelete }) =>
      isDelete ? theme.confirmDelete : theme.primaryColor};
  }

  &.ant-result .ant-result-title {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const ConfirmButton = styled(Button)`
  height: 40px;

  &:last-child > span {
    color: ${({ theme }) => theme.white};
  }

  &:first-child > span {
    color: ${({ theme }) => theme.grayText};
  }

  &.ant-btn-primary.ant-btn-dangerous {
    background-color: ${({ theme }) => theme.confirmDelete};
  }
`;
