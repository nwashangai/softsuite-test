import React, { useMemo } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateElement } from '../../slices/elementSlice';
import moment from 'moment';

type Props = {
  FormItem: typeof Form.Item;
};

function AdditionalDetails({ FormItem }: Props) {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.element.value);

  const isSelectedMonthDisabled = useMemo(() => {
    if (element.payFrequency === 'Monthly') {
      return true;
    }

    return false;
  }, [element.payFrequency]);

  return (
    <ElementFormWrapper>
      <DualFormContainer>
        <FormItem
          label="Effective Start Date"
          name="effectiveStartDate"
          initialValue={
            element.effectiveStartDate
              ? moment(element.effectiveStartDate, 'YYYY-MM-DD')
              : undefined
          }
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please input an effective start date',
            },
          ]}
        >
          <DateInput placeholder=" Select Date" />
        </FormItem>

        <FormItem
          label="Effective End Date"
          name="effectiveEndDate"
          initialValue={
            element.effectiveEndDate
              ? moment(element.effectiveEndDate, 'YYYY-MM-DD')
              : undefined
          }
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please input an effective end date',
            },
          ]}
        >
          <DateInput placeholder="Select Date" />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Processing Type"
          name="processingType"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please input process type',
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
          name="payFrequency"
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please select frequency in payment',
            },
          ]}
        >
          <RadioGroup
            onChange={(event) =>
              dispatch(updateElement({ payFrequency: event.target.value }))
            }
          >
            <RadioInput value={'Monthly'}>Monthly</RadioInput>
            <RadioInput value={'Selected Month'}>Selected Month</RadioInput>
          </RadioGroup>
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Select Per Months"
        name="selectedMonths"
        wrapperCol={{ span: 24, offset: 0 }}
        rules={[
          {
            required: !isSelectedMonthDisabled,
            message: 'Please select months',
          },
        ]}
      >
        <InputSelect
          mode="multiple"
          allowClear
          placeholder="Select"
          disabled={isSelectedMonthDisabled}
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
              message: 'Please select prorate',
            },
          ]}
        >
          <RadioGroup>
            <RadioInput value={'Yes'}>Yes</RadioInput>
            <RadioInput value={'No'}>No</RadioInput>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Status"
          name="status"
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputWrap>
            <InputSwitch
              defaultChecked={element.status === 'active'}
              onChange={(isActive) =>
                dispatch(
                  updateElement({ status: isActive ? 'active' : 'not active' })
                )
              }
            />{' '}
            <span style={{ marginLeft: '10px' }}>Active</span>
          </InputWrap>
        </FormItem>
      </DualFormContainer>
    </ElementFormWrapper>
  );
}

export default AdditionalDetails;
