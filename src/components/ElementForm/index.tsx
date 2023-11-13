'use client';
import React from 'react';
import { FormInstance } from 'antd';
import FormWizard from '../FormWizard';
import { Form, FormItem } from '../../styles';
import ElementDetails from './ElementDetails';
import AdditionalDetails from './AdditionalDetails';
import { ElementState } from '../../slices/types';

type Props = {
  createElement: () => any;
  formData: FormInstance<any>;
  handleCancel: () => void;
  initialValues: ElementState;
};

const ElementForm: React.FC<Props> = ({
  createElement,
  formData,
  handleCancel,
}) => {
  const itemList = [
    {
      title: 'Element Details',
      content: <ElementDetails FormItem={FormItem} />,
    },
    {
      title: 'Additional Details',
      content: <AdditionalDetails FormItem={FormItem} />,
    },
  ];

  const onFinish = (values: any) => {
    createElement()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      form={formData}
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
    >
      <FormWizard
        steps={itemList}
        FormItem={FormItem}
        form={formData}
        handleCancel={handleCancel}
      />
    </Form>
  );
};

export default ElementForm;
