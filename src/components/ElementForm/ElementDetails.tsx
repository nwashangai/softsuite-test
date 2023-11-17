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
  const lookup = useSelector((state: RootState) => state.lookup);

  const category = useMemo(() => {
    const classificatioValue = lookup.elementClassificationValues.find(
      (item) => item.value === element.classificationValueId
    );

    if (classificatioValue?.label.toLowerCase() === 'deduction') {
      return lookup.elementCategoryValues.filter((item) =>
        item.label.toLowerCase().includes('deduction')
      );
    } else if (classificatioValue?.label.toLowerCase() === 'earning') {
      return lookup.elementCategoryValues.filter((item) =>
        item.label.toLowerCase().includes('earning')
      );
    }

    return lookup.elementCategoryValues;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.classificationValueId, lookup.elementClassificationValues]);

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
          initialValue={element.classificationValueId?.toString()}
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
            options={lookup.elementClassificationValues}
            onChange={(value: string) =>
              dispatch(updateElement({ classificationValueId: value }))
            }
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Element Category"
          name="categoryValueId"
          initialValue={element.categoryValueId?.toString()}
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
          initialValue={element.payRunValueId?.toString()}
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
            options={lookup.payRunValues}
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
