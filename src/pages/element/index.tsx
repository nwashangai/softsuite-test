/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ElementContainer, Title } from './styles';
import Tableheader from '../../components/TableHeader';
import { Modal, Result, TablePaginationConfig, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ElementState, Mode } from '../../slices/types';
import { RootState } from '../../store';
import ElementForm from '../../components/ElementForm';
import { ConfirmButton, Form } from '../../styles';
import { AnyAction } from 'redux';
import {
  deleteItemById,
  fetchAllDataAsync,
  toggleLoading,
} from '../../slices/allElementsSlice';
import {
  editElement,
  resetElement,
  createMode,
} from '../../slices/elementSlice';
import { request } from '../../utilities/request';
import ElementTable from '../../components/ElementTable';
import { DeleteOutlined } from '@ant-design/icons';
import eventBus from '../../utilities/eventBus';

const modalTitle = {
  [Mode.create]: 'Create Element',
  [Mode.edit]: 'Edit Element',
  [Mode.view]: 'Element Detail',
};

function Element() {
  const dispatch = useDispatch();
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { value: allElements, isLoading: loading } = useSelector(
    (state: RootState) => state.allElements
  );
  const element = useSelector((state: RootState) => state.element);
  const [form] = Form.useForm<ElementState>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const handleEditElement = (element: ElementState) => {
    dispatch(editElement(element));
    toggleModal(true);
  };

  const handleCreate = () => {
    dispatch(createMode());
    toggleModal(true);
  };

  const handleDelete = (id: string) => {
    dispatch(toggleLoading(true));
    request(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}`,
      'Delete'
    )
      .then(() => {
        dispatch(deleteItemById(id));
        setDeleteId(null);
        eventBus.emit('notification-message', {
          title: 'Element has been deleted successfully',
          isDelete: true,
        });
      })
      .catch(() => {
        message.error('Error Occured Creating Element');
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  };

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

  return (
    <>
      <ElementContainer>
        <Title level={3}>Element</Title>
        <Tableheader buttonText="Create Element" toggleModal={handleCreate} />
        <ElementTable
          handleEditElement={handleEditElement}
          handleDelete={setDeleteId}
        />
      </ElementContainer>
      {/* this line ensures that the modal rerenders on toggle for the the benefit of the form wizard */}
      {isModalVisible && (
        <Modal
          key={modalTitle[element.mode] + element.value.id || ''}
          title={modalTitle[element.mode]}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="100%"
          style={{ maxWidth: '700px' }}
        >
          <ElementForm formData={form} handleCancel={handleCancel} />
        </Modal>
      )}
      <Modal
        open={deleteId != null}
        width={400}
        onCancel={() => setDeleteId(null)}
        maskClosable={false}
        footer={null}
      >
        <Result
          status="error"
          title="Are you sure you want to delete Element?"
          subTitle="You can’t reverse this action"
          icon={<DeleteOutlined style={{ width: '40px', height: '40px' }} />}
          extra={[
            <ConfirmButton
              onClick={() => setDeleteId(null)}
              style={{ width: '35%' }}
            >
              Cancel
            </ConfirmButton>,
            <ConfirmButton
              onClick={() => handleDelete(deleteId!)}
              style={{ width: '60%' }}
              loading={loading}
              type="primary"
              danger
            >
              Yes, Delete
            </ConfirmButton>,
          ]}
        />
      </Modal>
    </>
  );
}

export default Element;
