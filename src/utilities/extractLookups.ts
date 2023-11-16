type LookupType = {
  name: string;
  description: string;
  suborganizationId: string;
  id: string;
};

function convertToIdFormat(inputString: string) {
  const words = inputString.split(' ');
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCaseWords.join('') + 'Id';
}

export function extractLookupIds(data: Array<LookupType>) {
  const result: { [key: string]: string | undefined } = {};
  data.forEach((lookup) => {
    const value = data.find((item) => lookup.name === item.name);
    result[convertToIdFormat(lookup.name)] = value?.id;
  });

  return result;
}

export function extractLookupValues(data: Array<LookupType>) {
  return data.map((item) => ({
    label: item.name,
    value: item.id,
    suborganizationId: item.suborganizationId,
  }));
}
