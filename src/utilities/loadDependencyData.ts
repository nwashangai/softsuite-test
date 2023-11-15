import { updateCache } from '../slices/allElementsSlice';
import { ElementState } from '../slices/types';
import { request } from './request';
import { updateElement } from '../slices/elementSlice';
import { extractLookupValues } from './extractLookups';
import { AppDispatch } from '../store';

export const loadDependencyData = async (
  data: ElementState[],
  dispatch: any
) => {
  const cache: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const categoryKey = `category-${data[i].categoryId}:value-${data[i].categoryValueId}`;
    const classificationKey = `class-${data[i].classificationId}:value-${data[i].classificationValueId}`;

    if (!cache.includes(categoryKey)) {
      try {
        const response = await request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${data[i].categoryId}/lookupvalues/${data[i].categoryValueId}`
        );
        dispatch(updateCache({ key: categoryKey, value: response.name }));
        cache.push(categoryKey);
      } catch (error) {}
    }

    if (!cache.includes(classificationKey)) {
      try {
        const response = await request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${data[i].classificationId}/lookupvalues/${data[i].classificationValueId}`
        );
        dispatch(updateCache({ key: classificationKey, value: response.name }));
        cache.push(classificationKey);
      } catch (error) {}
    }
  }
};

export const getLookupValues = async (
  { classificationId, categoryId, payRunId }: Partial<ElementState>,
  dispatch: AppDispatch
) => {
  try {
    const [classificationValues, categoryValues, payValues] = await Promise.all(
      [
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${classificationId}/lookupvalues`
        ),
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${categoryId}/lookupvalues`
        ),
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${payRunId}/lookupvalues`
        ),
      ]
    );
    dispatch(
      updateElement({
        classificationValues: extractLookupValues(classificationValues),
        categoryValues: extractLookupValues(categoryValues),
        payValues: extractLookupValues(payValues),
      })
    );
  } catch (error) {}
};
