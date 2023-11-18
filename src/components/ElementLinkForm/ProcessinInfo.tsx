import React, { useMemo } from 'react';
import { Form } from 'antd';
import { ElementLinkFormWrapper } from './styles';
import {
  DualFormContainer,
  InputSelect,
  DateInput,
  RadioGroup,
  RadioInput,
  InputSwitch,
  InputWrap,
  InputText,
} from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ElementLinkState } from '../../slices/types';
import { capitalizeFirstChar } from '../../utilities/capitalizeFirstChar';
import { updateElementLink } from '../../slices/elementLinkSlice';
import { amountTypeOptions } from '../../constants';
import { convertToAntDatePickerFormat } from '../../utilities/formatDate';

type Props = {
  FormItem: typeof Form.Item;
};

const amountTypeMap: { [key: string]: string } = {
  fixed: 'Amount',
  rate: 'Rate(%)',
  '*': '...',
};

function ProcessinInfo({ FormItem }: Props) {
  const dispatch = useDispatch();
  const elementLink = useSelector(
    (state: RootState) => state.elementLink.value
  );

  const amountTypeKey = useMemo(
    () =>
      (elementLink.amountType === 'fixed'
        ? 'amount'
        : 'fixed') as keyof ElementLinkState,
    [elementLink.amountType]
  );

  return (
    <ElementLinkFormWrapper>
      <DualFormContainer>
        <FormItem
          label="Amount Type"
          name="amountType"
          initialValue={elementLink.amountType}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              required: true,
              message: 'please input an amount type',
            },
          ]}
        >
          <InputSelect
            placeholder=" Select an Amount Type"
            options={amountTypeOptions}
            onChange={(value: string) =>
              dispatch(updateElementLink({ amountType: value }))
            }
          />
        </FormItem>

        <FormItem
          label={amountTypeMap[elementLink.amountType || '*']}
          name={amountTypeKey}
          initialValue={elementLink[amountTypeKey]}
          wrapperCol={{ span: 24, offset: 0 }}
          rules={[
            {
              pattern: /^(\d*\.)?\d+$/,
              message: 'Please enter a valid number!',
            },
            {
              required: true,
              message: `please Input ${capitalizeFirstChar(amountTypeKey)}`,
            },
          ]}
        >
          <InputText
            placeholder={
              elementLink.amountType?.length
                ? `Enter ${capitalizeFirstChar(
                    amountTypeMap[elementLink.amountType]
                  )}`
                : 'Select'
            }
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Effective Start Date"
          name="effectiveStartDate"
          initialValue={convertToAntDatePickerFormat(
            elementLink.effectiveStartDate || ''
          )}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <DateInput format={'DD-MM-YYYY'} placeholder=" Select Date" />
        </FormItem>

        <FormItem
          label="Effective End Date"
          name="effectiveEndDate"
          initialValue={convertToAntDatePickerFormat(
            elementLink.effectiveEndDate || ''
          )}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <DateInput format={'DD-MM-YYYY'} placeholder="Select Date" />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Automate"
          name="automate"
          initialValue={elementLink.automate}
          wrapperCol={{ span: 24, offset: 0 }}
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
              defaultChecked={elementLink.status === 'active'}
              onChange={(isActive) =>
                dispatch(
                  updateElementLink({
                    status: isActive ? 'active' : 'inactive',
                  })
                )
              }
            />{' '}
            <span style={{ marginLeft: '10px' }}>
              {capitalizeFirstChar(elementLink.status)}
            </span>
          </InputWrap>
        </FormItem>
      </DualFormContainer>
    </ElementLinkFormWrapper>
  );
}

export default ProcessinInfo;
