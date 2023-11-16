/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ElementContainer, Title } from './styles';
import Tableheader from '../../components/TableHeader';
import {
  MenuProps,
  Modal,
  Space,
  TablePaginationConfig,
  Tag,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ElementState, Mode } from '../../slices/types';
import { RootState } from '../../store';
import ElementForm from '../../components/ElementForm';
import { ActionItems, Dropdown, Form, Table } from '../../styles';
import { AnyAction } from 'redux';
import {
  deleteItemById,
  fetchAllDataAsync,
  toggleLoading,
} from '../../slices/allElementsSlice';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { editElement, resetElement } from '../../slices/elementSlice';
import { request } from '../../utilities/request';
import moment from 'moment';

const modalTitle = {
  [Mode.create]: 'Create Element',
  [Mode.edit]: 'Edit Element',
  [Mode.view]: 'Element Detail',
};

function Element() {
  const dispatch = useDispatch();
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const loading = useSelector(
    (state: RootState) => state.allElements.isLoading
  );
  const lookupCache = useSelector((state: RootState) => state.lookup);
  const allElements = useSelector(
    (state: RootState) => state.allElements.value
  );
  const element = useSelector((state: RootState) => state.element);
  const [form] = Form.useForm<ElementState>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: allElements.length,
  });

  const handleEditElement = (element: ElementState) => {
    dispatch(editElement(element));
    toggleModal(true);
  };

  const handleDelete = (id: string) => {
    request(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}`,
      'Delete'
    )
      .then(() => {
        dispatch(deleteItemById(id));
        message.success('Element has been deleted successfully');
        handleCancel();
      })
      .catch(() => {
        message.error('Error Occured Creating Element');
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  };

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
        <div>
          {lookupCache.elementCategoryValues.find(
            (option) => Number(option.value) === id
          )?.label || 'loading...'}
        </div>
      ),
    },
    {
      title: 'Element Classification',
      key: 'classificationValueId',
      dataIndex: 'classificationValueId',
      render: (id, record) => (
        <div>
          {lookupCache.elementClassificationValues.find(
            (option) => Number(option.value) === id
          )?.label || 'loading...'}
        </div>
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
      render: (text) => (
        <div>{moment(text).format('DD-MM-YYYY || hh:mm A')}</div>
      ),
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

  useEffect(() => {
    dispatch(fetchAllDataAsync() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (element.mode === Mode.create || !isModalVisible) {
      dispatch(resetElement());
    }
    form.resetFields();
  }, [isModalVisible]);

  useEffect(() => {
    setPagination({ ...pagination, total: allElements.length });
  }, [allElements]);

  const handleCancel = () => {
    toggleModal(false);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  return (
    <>
      <ElementContainer>
        <Title level={3}>Element</Title>
        <Tableheader buttonText="Create Element" toggleModal={toggleModal} />
        <Table
          columns={columns}
          sticky
          dataSource={allElements.slice(
            (pagination.current! - 1) * pagination.pageSize!,
            pagination.current! * pagination.pageSize!
          )}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </ElementContainer>
      {isModalVisible && (
        <Modal
          key={modalTitle[element.mode] + element.value.id || ''}
          title={modalTitle[element.mode]}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="100%"
          style={{ maxWidth: '700px' }}
        >
          <ElementForm formData={form} handleCancel={handleCancel} />
        </Modal>
      )}
    </>
  );
}

export default Element;
