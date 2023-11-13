import React from 'react';
import { Form } from 'antd';
import { ElementFormWrapper } from './styles';
import {
  InputText,
  DualFormContainer,
  InputSelect,
  TextArea,
} from '../../styles';

type Props = {
  FormItem: typeof Form.Item;
};

function ElementDetails({ FormItem }: Props) {
  return (
    <ElementFormWrapper>
      <DualFormContainer>
        <FormItem
          label="Name"
          name="name"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <InputText placeholder="book name" />
        </FormItem>

        <FormItem
          label="Name"
          name="name"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Classification"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Name"
          name="name"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Classification"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </FormItem>

        <FormItem
          label="Name"
          name="name"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please enter book name!',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Classification"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Description"
        name="name"
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: true,
            message: 'Please enter book name!',
          },
        ]}
      >
        <TextArea rows={3} placeholder="Input Description" />
      </FormItem>
      <FormItem
        label="Reporting Name"
        name="name"
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: true,
            message: 'Please enter book name!',
          },
        ]}
      >
        <TextArea rows={3} placeholder="Input Reporting Name" />
      </FormItem>
    </ElementFormWrapper>
  );
}

export default ElementDetails;
