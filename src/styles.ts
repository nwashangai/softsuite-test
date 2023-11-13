import styled from 'styled-components';
import {
  Input,
  Select,
  DatePicker,
  Switch,
  Form as AntForm,
  Radio,
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
  .ant-switch.ant-switch-checked {
    background-color: ${({ theme }) => theme.primaryColor};
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
