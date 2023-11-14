import React, { memo, useMemo } from 'react';
import { Form } from 'antd';
import { ElementFormWrapper } from './styles';
import {
  InputText,
  DualFormContainer,
  InputSelect,
  TextArea,
} from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateElement } from '../../slices/elementSlice';

type Props = {
  FormItem: typeof Form.Item;
};

function ElementDetails({ FormItem }: Props) {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.element.value);

  const category = useMemo(() => {
    const classificatioValue = element.classificationValues.find(
      (item) => item.value === element.classificationId
    );

    if (classificatioValue?.label.toLowerCase() === 'deduction') {
      return element.categoryValues.filter((item) =>
        item.label.toLowerCase().includes('deduction')
      );
    } else if (classificatioValue?.label.toLowerCase() === 'earning') {
      return element.categoryValues.filter((item) =>
        item.label.toLowerCase().includes('earning')
      );
    }

    return element.categoryValues;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.classificationId, element.classificationValues]);

  console.log();

  return (
    <ElementFormWrapper>
      <DualFormContainer>
        <FormItem
          label="Name"
          name="name"
          initialValue={element.name}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please Input name',
            },
          ]}
        >
          <InputText placeholder="Input Name" />
        </FormItem>

        <FormItem
          label="Element Classification"
          name="classificationValueId"
          initialValue={element.classificationValueId}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please select element classification',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Classification"
            options={element.classificationValues}
            onChange={(value) =>
              dispatch(updateElement({ classificationId: value as string }))
            }
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Element Category"
          name="categoryValueId"
          initialValue={element.categoryValueId}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please select element category',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Element Category"
            options={category}
          />
        </FormItem>

        <FormItem
          label="Payrun"
          name="payRunValueId"
          initialValue={element.payRunValueId}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please select payrun',
            },
          ]}
        >
          <InputSelect
            placeholder="Select Payrun"
            options={element.payValues}
          />
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Description"
        name="description"
        initialValue={element.description}
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: true,
            message: 'Please input description',
          },
        ]}
      >
        <TextArea rows={3} placeholder="Input Description" />
      </FormItem>
      <FormItem
        label="Reporting Name"
        name="reportingName"
        initialValue={element.reportingName}
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: true,
            message: 'Please enter reporting name!',
          },
        ]}
      >
        <TextArea rows={3} placeholder="Input Reporting Name" />
      </FormItem>
    </ElementFormWrapper>
  );
}

export default memo(ElementDetails);
