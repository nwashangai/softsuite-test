import { DropdownType, LookupValuesType } from '../slices/types';
import { request } from './request';
import { extractLookupValues } from './extractLookups';
import { AppDispatch } from '../store';
import { setLookupValues } from '../slices/lookupSlice';

export function convertToValueFormat(inputString: string) {
  const words = inputString.split(' ');
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCaseWords.join('') + 'Values';
}

const loadDepartments = async (data: LookupValuesType[]) => {
  try {
    const asyncCalls = data.map((item) =>
      request(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/suborganizations/${item.id}/departments`
      )
    );
    const batchResponse = await Promise.all(asyncCalls);
    const flatData = batchResponse.reduce(
      (prev, current) => [...prev, ...current.data],
      []
    );
    const departments = extractLookupValues(flatData);
    return departments;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const loadGradeSteps = async (dispatch: AppDispatch) => {
  try {
    const grades = await request(
      'https://650af6bedfd73d1fab094cf7.mockapi.io/grade'
    );
    const asyncCalls = grades.data.map((item: LookupValuesType) =>
      request(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/grade/${item.id}/gradesteps`
      )
    );
    const batchResponse = await Promise.all(asyncCalls);
    const flatData = batchResponse.reduce(
      (prev, current) => [...prev, ...current.data],
      []
    );
    const gradeValues = extractLookupValues(grades.data);
    const gradeSteps = extractLookupValues(flatData);
    dispatch(setLookupValues({ gradeValues, gradeStepsValues: gradeSteps }));
  } catch (error) {
    console.log(error);
  }
};

export const getLookupValues = async (
  lookup: LookupValuesType[],
  dispatch: AppDispatch
) => {
  const dataObj: { [key: string]: DropdownType[] } = {};
  try {
    const asyncCalls = lookup.map((lookupItem) =>
      request(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${lookupItem.id}/lookupvalues`
      )
    );
    asyncCalls.push(
      request('https://650af6bedfd73d1fab094cf7.mockapi.io/suborganizations')
    );
    const batchResponse = await Promise.all(asyncCalls);
    lookup.forEach((item, index) => {
      dataObj[convertToValueFormat(item.name)] = extractLookupValues(
        batchResponse[index]
      );
    });
    dataObj['subOrginazationValues'] = extractLookupValues(
      batchResponse[batchResponse.length - 1].data
    );
    dataObj['departmentvalues'] = await loadDepartments(
      batchResponse[batchResponse.length - 1].data
    );
    loadGradeSteps(dispatch);
    dispatch(setLookupValues(dataObj));
  } catch (error: any) {
    console.error(error);
  }
};
