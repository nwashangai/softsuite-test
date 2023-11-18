/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { TablePaginationConfig } from 'antd';

const defaultPagination: TablePaginationConfig = {
  current: 1,
  pageSize: 10,
};

export const usePagination = <T>(
  data: T[],
  initialPagination = defaultPagination
) => {
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(initialPagination);

  return {
    data: data.slice(
      (pagination.current! - 1) * pagination.pageSize!,
      pagination.current! * pagination.pageSize!
    ),
    pagination,
    onChange: setPagination,
  };
};
