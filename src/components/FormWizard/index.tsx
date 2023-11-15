import React, { memo, useMemo } from 'react';
import { FormFooter, Line, StepsWrapper, WizardWrapper } from './styles';
import Step from './Step';
import Button from '../Button';
import { FormInstance } from 'antd';
import useValidate from '../../hooks/useValidate';
import { useDispatch } from 'react-redux';
import { updateElement } from '../../slices/elementSlice';

type Props = {
  steps: Array<{ title: string; content: JSX.Element; fields?: Array<string> }>;
  form: FormInstance<any>;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  name?: string;
  handleCancel: () => void;
  loading?: boolean;
};

function FormWizard({
  steps,
  form,
  name,
  currentTab,
  loading,
  setCurrentTab,
  handleCancel,
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
      dispatch(
        updateElement(form.getFieldsValue(steps[currentTab]?.fields || []))
      );
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
          {hasMoreTabs ? 'Next' : 'Create Element'}
        </Button>
      </FormFooter>
    </WizardWrapper>
  );
}

export default memo(FormWizard);
