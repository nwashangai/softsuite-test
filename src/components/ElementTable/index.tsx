import React from 'react';
import { ActionItems, Dropdown, Table } from '../../styles';
import { MenuProps, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { DropdownType, ElementState, LookupType } from '../../slices/types';
import { formatDate } from '../../utilities/formatDate';
import { usePagination } from '../../hooks/usePagination';

type Props = {
  handleEditElement: (record: ElementState) => void;
  handleDelete: (id: string) => void;
};

function ElementTable({ handleEditElement, handleDelete }: Props) {
  const lookupCache = useSelector((state: RootState) => state.lookup);
  const { value: allElements, isLoading: loading } = useSelector(
    (state: RootState) => state.allElements
  );
  const { data, pagination, onChange } =
    usePagination<ElementState>(allElements);

  const lookupLabel = (group: string, id: number) =>
    (lookupCache[group as keyof LookupType] as DropdownType[]).find(
      (option) => option.value.toString() === id.toString()
    )?.label || 'not founnd';

  const getItems = (record: ElementState): MenuProps['items'] => {
    return [
      {
        key: '1',
        label: (
          <ActionItems>
            <EyeOutlined />
            <a
              href={`/payrole-management/element-setup/element/${record.id}/link`}
            >
              View Element Links
            </a>
          </ActionItems>
        ),
      },
      {
        key: '2',
        label: (
          <ActionItems onClick={() => handleEditElement(record)}>
            <EditOutlined />
            <span>Edit Element</span>
          </ActionItems>
        ),
      },
      {
        key: '3',
        label: (
          <ActionItems onClick={() => handleDelete(record.id!)}>
            <DeleteOutlined />
            <span>Delete Element</span>
          </ActionItems>
        ),
      },
    ];
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Element Category',
      dataIndex: 'categoryValueId',
      key: 'categoryValueId',
      render: (id, record) => (
        <div>{lookupLabel('elementCategoryValues', id)}</div>
      ),
    },
    {
      title: 'Element Classification',
      key: 'classificationValueId',
      dataIndex: 'classificationValueId',
      render: (id, record) => (
        <div>{lookupLabel('elementClassificationValues', id)}</div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text) => (
        <Tag
          style={{ padding: '3px 10px', borderRadius: '13px' }}
          bordered={false}
          color={text === 'active' ? 'green' : 'red'}
        >
          {text.length
            ? text.charAt(0).toUpperCase() + text.slice(1)
            : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Date & Time Modified',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <div>{formatDate(text, 'DD-MM-YYYY || hh:mm A')}</div>,
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{ items: getItems(record) }}
            trigger={['click']}
            overlayClassName="element-action"
            placement="top"
          >
            <img src="/img/action.png" alt="action" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      sticky
      dataSource={data}
      loading={loading}
      pagination={{ ...pagination, total: allElements.length }}
      onChange={onChange}
    />
  );
}

export default ElementTable;
