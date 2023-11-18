/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';
import {
  AdditionalAssignmentInfo,
  AdditionalAssignmentInfoContent,
  AdditionalInfoTitle,
  ElementLinkFormWrapper,
} from './styles';
import { DualFormContainer, InputSelect } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { convertToValueFormat } from '../../utilities/loadDependencyData';
import { DropdownType, LookupType } from '../../slices/types';
import {
  updateAdditionalAssignmentInfo,
  updateElementLink,
} from '../../slices/elementLinkSlice';

type Props = {
  FormItem: typeof Form.Item;
  form: FormInstance;
};

function AdditionalInfo({ FormItem, form }: Props) {
  const dispatch = useDispatch();
  const elementLink = useSelector(
    (state: RootState) => state.elementLink.value
  );
  const lookup = useSelector((state: RootState) => state.lookup);
  const [gradeSteps, setGradeSteps] = useState(
    lookup.gradeStepsValues.filter(
      (item) =>
        elementLink.grade && String(item.gradeId) === String(elementLink.grade)
    )
  );

  const updateGradeSteps = (grade: string) => {
    dispatch(updateElementLink({ gradeStep: undefined, grade }));

    setGradeSteps(
      lookup.gradeStepsValues.filter((item) => grade && item.gradeId === grade)
    );
  };

  useEffect(() => {
    if (!elementLink.gradeStep) {
      form.resetFields(['gradeStep']);
    }
  }, [elementLink.gradeStep]);

  return (
    <ElementLinkFormWrapper>
      <DualFormContainer>
        <FormItem
          label="Grade"
          name="grade"
          initialValue={elementLink.grade?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect
            placeholder="Select a Grade"
            options={lookup.gradeValues}
            onChange={(value) => updateGradeSteps(value as string)}
          />
        </FormItem>

        <FormItem
          label="Grade Step"
          name="gradeStep"
          initialValue={elementLink.gradeStep?.toString()}
          wrapperCol={{ span: 24, offset: 0 }}
        >
          <InputSelect placeholder="Select a Grade Step" options={gradeSteps} />
        </FormItem>
      </DualFormContainer>
      <FormItem
        label="Union"
        name="unionId"
        initialValue={elementLink.unionId?.toString()}
        wrapperCol={{ span: 24, offset: 0 }}
      >
        <InputSelect
          placeholder="Select a Union"
          options={lookup.unionValues}
        />
      </FormItem>
      <AdditionalAssignmentInfo>
        <AdditionalInfoTitle>
          Additional Assignment Information
        </AdditionalInfoTitle>
        <AdditionalAssignmentInfoContent>
          {lookup.lookups
            .filter((item) => item.type === 'User Defined')
            .map((item, index) => (
              <DualFormContainer
                key={`additional-${index}`}
                style={{ width: '49%' }}
              >
                <FormItem
                  label={item.name}
                  name={item.id}
                  initialValue={elementLink.additionalInfo
                    .find((info) => String(info.lookupId) === String(item.id))
                    ?.lookupValueId?.toString()}
                  wrapperCol={{ span: 24, offset: 0 }}
                >
                  <InputSelect
                    placeholder={`Select a ${item.name}`}
                    options={
                      (lookup[
                        convertToValueFormat(item.name) as keyof LookupType
                      ] || []) as DropdownType[]
                    }
                    onChange={(value: string) =>
                      dispatch(
                        updateAdditionalAssignmentInfo({
                          lookupId: item.id,
                          lookupValueId: value,
                        })
                      )
                    }
                  />
                </FormItem>
              </DualFormContainer>
            ))}
        </AdditionalAssignmentInfoContent>
      </AdditionalAssignmentInfo>
    </ElementLinkFormWrapper>
  );
}

export default memo(AdditionalInfo);
