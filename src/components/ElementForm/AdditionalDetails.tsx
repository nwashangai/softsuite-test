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
import { formatDate } from '../../utilities/formatDate';
import { capitalizeFirstChar } from '../../utilities/capitalizeFirstChar';

type Props = {
  FormItem: typeof Form.Item;
};

const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'Fabuary' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

function AdditionalDetails({ FormItem }: Props) {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.element.value);

  const isSelectedMonthDisabled = useMemo(() => {
    if (element.payFrequency === 'monthly') {
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
          initialValue={formatDate(element.effectiveEndDate, 'YYYY-MM-DD')}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please input an effective start date',
            },
          ]}
        >
          <DateInput format={'YYYY-MM-DD'} placeholder=" Select Date" />
        </FormItem>

        <FormItem
          label="Effective End Date"
          name="effectiveEndDate"
          initialValue={formatDate(element.effectiveEndDate, 'YYYY-MM-DD')}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please input an effective end date',
            },
          ]}
        >
          <DateInput format={'YYYY-MM-DD'} placeholder="Select Date" />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Processing Type"
          name="processingType"
          initialValue={element.processingType}
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
            <RadioInput value={'closed'}>Closed</RadioInput>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="Pay Frequency"
          name="payFrequency"
          initialValue={element.payFrequency}
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
            <RadioInput value={'monthly'}>Monthly</RadioInput>
            <RadioInput value={'selectedMonths'}>Selected Month</RadioInput>
          </RadioGroup>
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Select Per Months"
        name="selectedMonths"
        initialValue={element.selectedMonths}
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
          options={months}
        />
      </FormItem>
      <DualFormContainer>
        <FormItem
          label="Prorate"
          name="prorate"
          initialValue={element.prorate}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'Please select prorate',
            },
          ]}
        >
          <RadioGroup>
            <RadioInput value={'yes'}>Yes</RadioInput>
            <RadioInput value={'no'}>No</RadioInput>
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
                  updateElement({ status: isActive ? 'active' : 'inactive' })
                )
              }
            />{' '}
            <span style={{ marginLeft: '10px' }}>
              {capitalizeFirstChar(element.status)}
            </span>
          </InputWrap>
        </FormItem>
      </DualFormContainer>
    </ElementFormWrapper>
  );
}

export default AdditionalDetails;
