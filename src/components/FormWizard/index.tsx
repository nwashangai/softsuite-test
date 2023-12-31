import React, { memo, useMemo } from 'react';
import { FormFooter, Line, StepsWrapper, WizardWrapper } from './styles';
import Step from './Step';
import Button from '../Button';
import { FormInstance } from 'antd';
import useValidate from '../../hooks/useValidate';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { Mode } from '../../slices/types';

type Props = {
  steps: Array<{ title: string; content: JSX.Element; fields?: Array<string> }>;
  form: FormInstance<any>;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  name?: string;
  handleCancel: () => void;
  updateSlice: (payload: { [key: string]: any }) => AnyAction;
  loading?: boolean;
  mode: Mode;
};

const nameMap: { [key: string]: string } = {
  'element-link-form': 'Element Link',
  'element-form': 'Element',
};

const modeMap: { [key: string]: string } = {
  [Mode.create]: 'Create',
  [Mode.edit]: 'Update',
};

function FormWizard({
  steps,
  form,
  name,
  currentTab,
  loading,
  setCurrentTab,
  handleCancel,
  updateSlice,
  mode,
}: Props) {
  const dispatch = useDispatch();
  const hasMoreTabs = useMemo(
    () => Boolean(steps.length - (currentTab + 1)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTab]
  );
  const canGoToNext = useValidate(steps[currentTab]?.fields || [], name);

  const handleBackBtn = () => {
    if (!currentTab) {
      handleCancel();
    } else {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleNextBtn = () => {
    if (hasMoreTabs) {
      dispatch(updateSlice(form.getFieldsValue()));
      setCurrentTab(currentTab + 1);
    } else {
      form.submit();
    }
  };

  return (
    <WizardWrapper>
      <StepsWrapper length={steps.length}>
        {steps.map((item, index) => (
          <Step
            key={`step-${index}`}
            item={item}
            index={index}
            current={currentTab}
          />
        ))}
        <Line />
      </StepsWrapper>
      {steps[currentTab].content}
      <FormFooter>
        <Button isInverted width="48%" onClick={handleBackBtn}>
          {currentTab ? 'Back' : 'Cancel'}
        </Button>
        <Button
          width="48%"
          onClick={handleNextBtn}
          disabled={hasMoreTabs && !canGoToNext}
          loading={loading}
        >
          {hasMoreTabs ? 'Next' : `${modeMap[mode]} ${nameMap[name as string]}`}
        </Button>
      </FormFooter>
    </WizardWrapper>
  );
}

export default memo(FormWizard);
