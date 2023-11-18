import { ElementLinkState } from '../slices/types';

// const numberColumns = [
//   'elementId',
//   'suborganizationId',
//   'locationId',
//   'departmentId',
//   'employeeCategoryId',
//   'employeeCategoryValueId',
//   'employeeTypeId',
//   'employeeTypeValueId',
//   'jobTitleId',
//   'grade',
//   'gradeStep',
//   'unionId',
//   'amount',
//   'rate',
//   'payRunId',
//   'payRunValueId',
//   'classificationId',
//   'classificationValueId',
//   '',
//   '',
//   '',
//   '',
// ];

type DerivedElementState = Omit<ElementLinkState, 'elementId'>;

export const sanitizeElementLink = (payload: DerivedElementState) => {
  const result: { [key: string]: any } = {};

  for (const key in payload) {
    if (payload[key as keyof DerivedElementState]) {
      result[key] = payload[key as keyof DerivedElementState];
    }
  }

  return result;
};
