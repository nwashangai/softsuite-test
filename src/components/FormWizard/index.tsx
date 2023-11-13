import React, { useState } from 'react';
import { FormFooter, Line, StepsWrapper, WizardWrapper } from './styles';
import Step from './Step';
import Button from '../Button';
import { Form, FormInstance } from 'antd';

type Props = {
  steps: Array<{ title: string; content: JSX.Element }>;
  FormItem: typeof Form.Item;
  form: FormInstance<any>;
  handleCancel: () => void;
};

function FormWizard({ steps, FormItem, form, handleCancel }: Props) {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleBackBtn = () => {
    if (!currentTab) {
      handleCancel();
    } else {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleNextBtn = () => {
    if (steps.length - currentTab) {
      setCurrentTab(currentTab + 1);
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
          htmlType={steps.length - currentTab ? 'button' : 'submit'}
          onClick={handleNextBtn}
        >
          {steps.length - currentTab ? 'Next' : 'Create Element'}
        </Button>
      </FormFooter>
    </WizardWrapper>
  );
}

export default FormWizard;
