import { updateCache } from '../slices/lookupSlice';
import { DropdownType, LookupValuesType } from '../slices/types';
import { request } from './request';
import { extractLookupValues } from './extractLookups';
import { AppDispatch } from '../store';
import { setLookupValues } from '../slices/lookupSlice';

type LooupCacheType = {
  lookupIdKey: string;
  valueIdKey: string;
};

export const loadDependencyData = async (
  data: any[],
  columns: LooupCacheType[],
  dispatch: any,
  defaultCache: {
    [key: string]: any;
  }
) => {
  const cache: string[] = Object.keys(defaultCache);
  for (let i = 0; i < data.length; i++) {
    for (const item of columns) {
      const key = `${item.lookupIdKey}-${data[i][item.lookupIdKey]}:value-${
        data[i][item.valueIdKey]
      }`;

      if (!cache.includes(key)) {
        try {
          const response = await request(
            `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${
              data[i][item.lookupIdKey]
            }/lookupvalues/${data[i][item.valueIdKey]}`
          );
          dispatch(updateCache({ key, value: response.name }));
          cache.push(key);
        } catch (error) {}
      }
    }
  }
};

function convertToValueFormat(inputString: string) {
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

    dispatch(setLookupValues(dataObj));
  } catch (error: any) {
    console.error(error);
  }
};
