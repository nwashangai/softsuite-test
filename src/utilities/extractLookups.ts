type LookupType = {
  name: string;
  description: string;
  id: string;
};

const lookups: Array<{ name: string; key: string }> = [
  {
    name: 'Element Classification',
    key: 'classificationId',
  },
  {
    name: 'Element Category',
    key: 'categoryId',
  },
  {
    name: 'Pay Run',
    key: 'payRunId',
  },
];

export function extractLookupIds(data: Array<LookupType>) {
  const result: { [key: string]: string | undefined } = {};
  lookups.forEach((lookup) => {
    const value = data.find((item) => lookup.name === item.name);
    result[lookup.key] = value?.id;
  });

  return result;
}

export function extractLookupValues(data: Array<LookupType>) {
  return data.map((item) => ({ label: item.name, value: item.id }));
}
