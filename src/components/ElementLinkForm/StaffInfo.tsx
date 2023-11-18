/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import { ElementLinkFormWrapper } from './styles';
import { InputText, DualFormContainer, InputSelect } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateElementLink } from '../../slices/elementLinkSlice';
import eventBus from '../../utilities/eventBus';

type Props = {
  FormItem: typeof Form.Item;
  form: FormInstance;
};

function StaffInfo({ FormItem, form }: Props) {
  const dispatch = useDispatch();
  const elementLink = useSelector(
    (state: RootState) => state.elementLink.value
  );
  const lookup = useSelector((state: RootState) => state.lookup);

  const [departments, setDepartments] = useState(
    lookup.departmentvalues.filter(
      (item) =>
        elementLink.suborganizationId &&
        String(item.suborganizationId) === String(elementLink.suborganizationId)
    )
  );

  const updateDepartment = (suborganizationId: string) => {
    form.resetFields(['departmentId']);
    dispatch(updateElementLink({ departmentId: undefined, suborganizationId }));

    setDepartments(
      lookup.departmentvalues.filter(
        (item) =>
          suborganizationId && item.suborganizationId === suborganizationId
      )
    );
  };

  useEffect(() => {
    eventBus.on('change-suborganization', updateDepartment);
  }, []);

  return (
    <ElementLinkFormWrapper>
      <FormItem
        label="Element Link Name"
        name="name"
        initialValue={elementLink.name}
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
      <DualFormContainer>
        <FormItem
          label="Suborganization"
          name="suborganizationId"
          initialValue={elementLink.suborganizationId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select a Suborganization"
            options={lookup.subOrginazationValues}
            onChange={(value) => eventBus.emit('change-suborganization', value)}
          />
        </FormItem>

        <FormItem
          label="Department"
          name="departmentId"
          initialValue={elementLink.departmentId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select a Department"
            options={departments}
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Job Title"
          name="jobTitleId"
          initialValue={elementLink.jobTitleId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select a Job title"
            options={lookup.jobTitleValues}
          />
        </FormItem>

        <FormItem
          label="Location"
          name="locationId"
          initialValue={elementLink.locationId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select a Location"
            options={lookup.locationValues}
          />
        </FormItem>
      </DualFormContainer>
      <DualFormContainer>
        <FormItem
          label="Employee Type"
          name="employeeTypeValueId"
          initialValue={elementLink.employeeTypeValueId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select an Employee type"
            options={lookup.employeeTypeValues}
          />
        </FormItem>

        <FormItem
          label="Employee Category"
          name="employeeCategoryValueId"
          initialValue={elementLink.employeeCategoryValueId?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select an Employee Category"
            options={lookup.employeeCategoryValues}
          />
        </FormItem>
      </DualFormContainer>
    </ElementLinkFormWrapper>
  );
}

export default memo(StaffInfo);
