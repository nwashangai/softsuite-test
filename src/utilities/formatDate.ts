import moment, { Moment } from 'moment';

/**
 * Detect the format of a date string using moment.js.
 * @param {string} dateString - The input date string.
 * @returns {string | undefined} - The detected format or null if not recognized.
 */
const detectDateFormat = (dateString: string): string | undefined => {
  const formatsToCheck = [
    'YYYY-MM-DDTHH:mm:ss.SSSZ',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD',
    'DD-MM-YYYY HH:mm:ss',
    'DD-MM-YYYY HH:mm',
    'DD-MM-YYYY',
  ];

  for (const format of formatsToCheck) {
    const parsedDate = moment(dateString, format, true);
    if (parsedDate.isValid()) {
      return format;
    }
  }

  return undefined;
};

/**
 * Convert a date string from any format to a format suitable for Ant Design DatePicker.
 * @param {string} dateString - The input date string in any format.
 * @returns {Moment | undefined} - The formatted date string for Ant Design DatePicker, or undefined if parsing fails.
 */
export const convertToAntDatePickerFormat = (
  dateString: string
): Moment | undefined => {
  const parsedDate = moment(dateString, detectDateFormat(dateString), true);

  return parsedDate.isValid() ? parsedDate : undefined;
};

export const formatDate = (dateString?: string, format = 'DD-MM-YYYY') => {
  try {
    return dateString ? moment(dateString).format(format) : undefined;
  } catch (error) {
    console.log(dateString, error);
    return dateString;
  }
};
