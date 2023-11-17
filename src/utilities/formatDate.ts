import moment from 'moment';

export const formatDate = (dateString?: string, format = 'YYYY-MM-DD') => {
  return dateString ? moment(dateString).format(format) : undefined;
};
