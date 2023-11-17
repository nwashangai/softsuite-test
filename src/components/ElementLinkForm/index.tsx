/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useMemo, useState } from 'react';
import { FormInstance, message } from 'antd';
import FormWizard from '../FormWizard';
import { Form, FormItem } from '../../styles';
import { ElementLinkState, Mode } from '../../slices/types';
import eventBus from '../../utilities/eventBus';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '../../slices/elementSlice';
import { RootState } from '../../store';
import { request } from '../../utilities/request';
import {
  addNewElementLink,
  replaceElementLink,
} from '../../slices/allElementLinkSlice';
import StaffInfo from './StaffInfo';
import { updateElementLink } from '../../slices/elementLinkSlice';
import AdditionalInfo from './AdditionalInfo';
import ProcessinInfo from './ProcessinInfo';
import { sanitizeElementLink } from '../../utilities/sanitizeData';

type Props = {
  formData: FormInstance<any>;
  handleCancel: () => void;
};

const ElementForm: React.FC<Props> = ({ formData, handleCancel }) => {
  const dispatch = useDispatch();
  const elementLink = useSelector(
    (state: RootState) => state.elementLink.value
  );
  const loading = useSelector((state: RootState) => state.element.isLoading);
  const mode = useSelector((state: RootState) => state.elementLink.mode);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const itemList = useMemo(
    () => [
      {
        title: 'Staff Information',
        content: <StaffInfo FormItem={FormItem} form={formData} />,
        fields: ['name'],
      },
      {
        title: 'Additional Information',
        content: <AdditionalInfo FormItem={FormItem} form={formData} />,
        fields: [],
      },
      {
        title: 'Processing Information',
        content: <ProcessinInfo FormItem={FormItem} />,
        fields: ['amountType', 'rate', 'amount'],
      },
    ],
    [elementLink.id]
  );

  const onFinish = (values: ElementLinkState) => {
    const {
      name,
      suborganizationId,
      departmentId,
      jobTitleId,
      locationId,
      employeeTypeId,
      employeeTypeValueId,
      employeeCategoryId,
      employeeCategoryValueId,
      grade,
      gradeStep,
      unionId,
      additionalInfo,
      status,
      elementId,
    } = elementLink;
    const {
      effectiveStartDate,
      effectiveEndDate,
      amount,
      amountType,
      rate,
      automate,
    } = values;

    const payload = {
      name,
      suborganizationId,
      departmentId,
      jobTitleId,
      locationId,
      employeeTypeId,
      employeeTypeValueId,
      employeeCategoryId,
      employeeCategoryValueId,
      grade,
      gradeStep,
      unionId,
      additionalInfo,
      effectiveStartDate,
      effectiveEndDate,
      amount,
      amountType,
      rate,
      automate,
      status,
      modifiedBy: 'Chiagoziem Young Nwadike',
    };

    const sanitizedPayload = sanitizeElementLink(
      payload as Omit<ElementLinkState, 'elementId'>
    );
    dispatch(toggleLoading(true));

    switch (mode) {
      case Mode.create:
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${elementId}/elementlinks`,
          'POST',
          sanitizedPayload
        )
          .then((response) => {
            dispatch(addNewElementLink(response.data));
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
          `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${elementId}/elementlinks/${elementLink.id}`,
          'PUT',
          payload
        )
          .then((response) => {
            dispatch(
              replaceElementLink({
                id: elementLink.id!,
                updatedElementLink: response.data,
              })
            );
            setCurrentTab(0);
            message.success('Element Link has been updated successfully');
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
    eventBus.emit('form-element-link-form', changedValues);
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
        name="element-link-form"
        handleCancel={handleCancel}
        updateSlice={updateElementLink}
        mode={mode}
      />
    </Form>
  );
};

export default ElementForm;
