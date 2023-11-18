import React from 'react';
import { Table } from '../../styles';
import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ActionWrapper, Tag, View } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DropdownType, ElementLinkState, LookupType } from '../../slices/types';
import { usePagination } from '../../hooks/usePagination';

type Props = {
  handleEditElementLink: (record: ElementLinkState) => void;
  handleDelete: (id: string) => void;
  showDetails: (record: ElementLinkState) => void;
};

function ElementLinksTable({
  handleEditElementLink,
  handleDelete,
  showDetails,
}: Props) {
  const lookupCache = useSelector((state: RootState) => state.lookup);
  const { value: allElementLinks, isLoading: loading } = useSelector(
    (state: RootState) => state.allElementLinks
  );
  const { data, pagination, onChange } =
    usePagination<ElementLinkState>(allElementLinks);
  const lookupLabel = (group: string, id: number) =>
    (lookupCache[group as keyof LookupType] as DropdownType[]).find(
      (option) => option.value.toString() === id.toString()
    )?.label;

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
      render: (id) => (
        <div>
          {id
            ? lookupLabel('subOrginazationValues', id) || 'loading...'
            : 'No Category'}
        </div>
      ),
    },
    {
      title: 'Department',
      key: 'departmentId',
      dataIndex: 'departmentId',
      render: (id) => (
        <div>
          {id
            ? lookupLabel('departmentvalues', id) || 'loading...'
            : 'No Category'}
        </div>
      ),
    },
    {
      title: 'Employee Category',
      dataIndex: 'employeeCategoryValueId',
      key: 'employeeCategoryValueId',
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
        <Space size="middle" onClick={() => showDetails(record)}>
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
          <Tag
            bordered={false}
            color="#F6F7F9"
            onClick={() => handleEditElementLink(record)}
          >
            <EditOutlined style={{ color: '#2D416F' }} />
          </Tag>
          <Tag
            bordered={false}
            color="red"
            onClick={() => handleDelete(record.id)}
          >
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
      dataSource={data}
      loading={loading}
      pagination={{ ...pagination, total: allElementLinks.length }}
      onChange={onChange}
    />
  );
}

export default ElementLinksTable;
