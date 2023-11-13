import React from 'react';
import { Form } from 'antd';
import { ElementFormWrapper } from './styles';
import {
  DualFormContainer,
  InputSelect,
  DateInput,
  RadioGroup,
  RadioInput,
  InputSwitch,
  InputWrap,
} from '../../styles';

type Props = {
  FormItem: typeof Form.Item;
};

function AdditionalDetails({ FormItem }: Props) {
  return (
    <ElementFormWrapper>
      <DualFormContainer>
        <FormItem
          label="First Date"
          name="date"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <DateInput placeholder="book name" />
        </FormItem>

        <FormItem
          label="Second Date"
          name="date2"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <DateInput placeholder="book name" />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Process Type"
          name="status"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <RadioGroup>
            <RadioInput value={'open'}>Open</RadioInput>
            <RadioInput value={'close'}>Close</RadioInput>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Pay Frequency"
          name="status2"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <RadioGroup>
            <RadioInput value={'month'}>Monthly</RadioInput>
            <RadioInput value={'select'}>Selected Month</RadioInput>
          </RadioGroup>
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Select Per Month"
        name="month"
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: true,
            message: 'Please enter book name!',
          },
        ]}
      >
        <InputSelect
          mode="multiple"
          allowClear
          placeholder="Select Per Month"
          options={[
            { value: 'january', label: 'January' },
            { value: 'february', label: 'Fabuary' },
            { value: 'march', label: 'March' },
            { value: 'april', label: 'April' },
          ]}
        />
      </FormItem>
      <DualFormContainer>
        <FormItem
          label="Prorate"
          name="prorate"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter prorate',
            },
          ]}
        >
          <RadioGroup>
            <RadioInput value={'open'}>Yes</RadioInput>
            <RadioInput value={'close'}>No</RadioInput>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Pay Frequency"
          name="status2"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <InputWrap>
            <InputSwitch /> <span style={{ marginLeft: '10px' }}>Active</span>
          </InputWrap>
        </FormItem>
      </DualFormContainer>
    </ElementFormWrapper>
  );
}

export default AdditionalDetails;
