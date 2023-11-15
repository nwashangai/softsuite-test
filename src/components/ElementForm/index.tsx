/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { FormInstance, message } from 'antd';
import FormWizard from '../FormWizard';
import { Form, FormItem } from '../../styles';
import ElementDetails from './ElementDetails';
import AdditionalDetails from './AdditionalDetails';
import { ElementState, Mode } from '../../slices/types';
import eventBus from '../../utilities/eventBus';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitalDataAsync, toggleLoading } from '../../slices/elementSlice';
import { AnyAction } from 'redux';
import { RootState } from '../../store';
import moment from 'moment';
import { request } from '../../utilities/request';
import { addNewElement, replaceElement } from '../../slices/allElementsSlice';

type Props = {
  formData: FormInstance<any>;
  handleCancel: () => void;
};

const ElementForm: React.FC<Props> = ({ formData, handleCancel }) => {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.element.value);
  const loading = useSelector((state: RootState) => state.element.isLoading);
  const mode = useSelector((state: RootState) => state.element.mode);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    // Dispatch the Thunk action when the component mounts
    dispatch(fetchInitalDataAsync() as unknown as AnyAction);
  }, []);

  const itemList = useMemo(
    () => [
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
    ],
    [element.id]
  );

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
      payRunId: parseInt(payRunId!, 10),
      payRunValueId: parseInt(payRunValueId!, 10),
      classificationId: parseInt(classificationId!, 10),
      classificationValueId: parseInt(classificationValueId!, 10),
      categoryId: parseInt(categoryId!, 10),
      categoryValueId: parseInt(categoryValueId!, 10),
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

    switch (mode) {
      case Mode.create:
        request(
          'https://650af6bedfd73d1fab094cf7.mockapi.io/elements',
          'POST',
          payload
        )
          .then((response) => {
            dispatch(addNewElement(response.data));
            setCurrentTab(0);
            message.success('Element Link has been created successfully');
            handleCancel();
          })
          .catch(() => {
            message.error('Error Occured Creating Element');
          })
          .finally(() => {
            dispatch(toggleLoading(false));
          });
        break;

      case Mode.edit:
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${element.id}`,
          'PUT',
          payload
        )
          .then((response) => {
            console.log(response);
            dispatch(
              replaceElement({ id: element.id!, updatedElement: response.data })
            );
            setCurrentTab(0);
            message.success('Element has been updated successfully');
            handleCancel();
          })
          .catch(() => {
            message.error('Error Occured Creating Element');
          })
          .finally(() => {
            dispatch(toggleLoading(false));
          });
        break;

      default:
        break;
    }
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
