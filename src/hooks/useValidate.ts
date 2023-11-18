import { useEffect, useState } from 'react';
import { Form } from '../styles';
import eventBus from '../utilities/eventBus';

export const useValidate = (fields: Array<string>, formName = '') => {
  const form = Form.useFormInstance();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    runValidate();
    eventBus.on(`form-${formName}`, eventCallback);
    return () => eventBus.off(`form-${formName}`, eventCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runValidate = () => {
    // eslint-disable-next-line array-callback-return
    fields.some((field) => {
      const fieldValue = form.getFieldValue(field);
      if (!Array.isArray(fieldValue) && !fieldValue) {
        setIsValid(false);
        return true;
      } else if (!fieldValue.length) {
        setIsValid(false);
        return true;
      } else {
        setIsValid(true);
      }
    });
  };

  const eventCallback = (changedValues: { [key: string]: any }) => {
    const keys = Object.keys(changedValues);

    if (fields.includes(keys[0])) {
      runValidate();
    }
  };

  return isValid;
};

export default useValidate;
