'use client';
import React, { useEffect, useState } from 'react';
import { FormInstance, message } from 'antd';
import FormWizard from '../FormWizard';
import { Form, FormItem } from '../../styles';
import ElementDetails from './ElementDetails';
import AdditionalDetails from './AdditionalDetails';
import { ElementState } from '../../slices/types';
import eventBus from '../../utilities/eventBus';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInitalDataAsync,
  resetElement,
  toggleLoading,
} from '../../slices/elementSlice';
import { AnyAction } from 'redux';
import { RootState } from '../../store';
import moment from 'moment';
import { simulateAsyncCall } from '../../_mock/fackAsyncRequest';

type Props = {
  formData: FormInstance<any>;
  handleCancel: () => void;
};

const ElementForm: React.FC<Props> = ({ formData, handleCancel }) => {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.element.value);
  const loading = useSelector((state: RootState) => state.element.isLoading);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    // Dispatch the Thunk action when the component mounts
    dispatch(fetchInitalDataAsync() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemList = [
    {
      title: 'Element Details',
      content: <ElementDetails FormItem={FormItem} />,
      fields: [
        'name',
        'classificationValueId',
        'categoryValueId',
        'payRunValueId',
        'reportingName',
        'description',
      ],
    },
    {
      title: 'Additional Details',
      content: <AdditionalDetails FormItem={FormItem} />,
      fields: [],
    },
  ];

  const onFinish = (values: ElementState) => {
    const {
      name,
      classificationValueId,
      categoryValueId,
      classificationId,
      categoryId,
      payRunValueId,
      payRunId,
      status,
      description,
      reportingName,
    } = element;
    const {
      effectiveStartDate,
      effectiveEndDate,
      processingType,
      payFrequency,
      selectedMonths,
      prorate,
    } = values;

    const formattedEffectiveStartDate =
      moment(effectiveStartDate).format('YYYY-MM-DD');
    const formattedEffectiveEndDate =
      moment(effectiveEndDate).format('YYYY-MM-DD');

    const payload = {
      name,
      description,
      payRunId,
      payRunValueId,
      classificationId,
      classificationValueId,
      categoryId,
      categoryValueId,
      reportingName,
      processingType,
      status,
      prorate,
      effectiveStartDate: formattedEffectiveStartDate,
      effectiveEndDate: formattedEffectiveEndDate,
      selectedMonths,
      payFrequency,
      modifiedBy: 'Chiagoziem Young Nwadike',
    };

    dispatch(toggleLoading(true));

    simulateAsyncCall()
      .then(() => {
        setCurrentTab(0);
        dispatch(resetElement());
        formData.resetFields();
        message.success('New Element Created Successfully');
        handleCancel();
      })
      .catch(() => {
        message.error('Error Occured Creating Element');
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  };

  const handleFormUpdate = (changedValues: { [key: string]: any }) => {
    eventBus.emit('form-element-form', changedValues);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      form={formData}
      onValuesChange={handleFormUpdate}
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
    >
      <FormWizard
        steps={itemList}
        form={formData}
        currentTab={currentTab}
        loading={loading}
        setCurrentTab={setCurrentTab}
        name="element-form"
        handleCancel={handleCancel}
      />
    </Form>
  );
};

export default ElementForm;
