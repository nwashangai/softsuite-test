import moment from 'moment';

export const formatDate = (dateString?: string, format = 'DD-MM-YYYY') => {
  return dateString ? moment(dateString).format(format) : undefined;
};
