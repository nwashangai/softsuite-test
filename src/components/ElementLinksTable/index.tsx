import React, { useState } from 'react';
import { Table } from '../../styles';
import { Space, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ActionWrapper, Tag, View } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function ElementLinksTable() {
  const lookupCache = useSelector((state: RootState) => state.lookup);
  const { value: allElementLinks, isLoading: loading } = useSelector(
    (state: RootState) => state.allElementLinks
  );
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: allElementLinks.length,
  });

  const lookupLabel = (group: string, id: number) =>
    lookupCache.employeeCategoryValues.find(
      (option) => Number(option.value) === id
    )?.label;

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Sub-Organization',
      dataIndex: 'suborganizationId',
      key: 'suborganizationId',
      render: (id, record) => (
        <div>{lookupLabel('subOrginazationValues', id) || 'loading...'}</div>
      ),
    },
    {
      title: 'Department',
      key: 'departmentId',
      dataIndex: 'departmentId',
      render: (id, record) => (
        <div>{lookupLabel('departmentvalues', id) || 'loading...'}</div>
      ),
    },
    {
      title: 'Employee Category',
      dataIndex: 'employeeCategoryId',
      key: 'employeeCategoryId',
      render: (id) => (
        <div>
          {id
            ? lookupLabel('employeeCategoryValues', id) || 'loading...'
            : 'No Category'}
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Details',
      key: 'details',
      width: 110,
      render: (_, record) => (
        <Space size="middle">
          <View>View Details</View>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <ActionWrapper>
          <Tag bordered={false} color="#F6F7F9">
            <EditOutlined style={{ color: '#2D416F' }} />
          </Tag>
          <Tag bordered={false} color="red">
            <DeleteOutlined />
          </Tag>
        </ActionWrapper>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      sticky
      dataSource={allElementLinks.slice(
        (pagination.current! - 1) * pagination.pageSize!,
        pagination.current! * pagination.pageSize!
      )}
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange}
    />
  );
}

export default ElementLinksTable;
