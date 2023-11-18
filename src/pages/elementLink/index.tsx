/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { ControlWrapper, ElementContainer, Title } from './styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { fetchElementById } from '../../slices/elementSlice';
import { RootState } from '../../store';
import ElementDetals from '../../components/ElementDetails';
import Tableheader from '../../components/TableHeader';
import ElementLinksTable from '../../components/ElementLinksTable';
import {
  deleteItemById,
  fetchAllLinkDataAsync,
} from '../../slices/allElementLinkSlice';
import { Modal, message } from 'antd';
import ElementLinkForm from '../../components/ElementLinkForm';
import { ElementLinkState, Mode } from '../../slices/types';
import { ConfirmButton, Drawer, Form, Result } from '../../styles';
import {
  editElementLink,
  resetElementLink,
  toggleLoading,
} from '../../slices/elementLinkSlice';
import { request } from '../../utilities/request';
import ElementLinkDetals from '../../components/ElementLinkDetails';
import { DeleteOutlined } from '@ant-design/icons';
import eventBus from '../../utilities/eventBus';

const modalTitle = {
  [Mode.create]: 'Create Element Link',
  [Mode.edit]: 'Edit Element Link',
  [Mode.view]: 'Element Link Details',
};

function Element() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [elementLinkDetails, setElementLinkDetails] =
    useState<ElementLinkState | null>(null);
  const element = useSelector((state: RootState) => state.element);
  const elementLink = useSelector((state: RootState) => state.elementLink);
  const loading = useSelector(
    (state: RootState) => state.elementLink.isLoading
  );
  const { elementId } = useParams();
  const [form] = Form.useForm<ElementLinkState>();
  useEffect(() => {
    dispatch(fetchElementById(elementId || '') as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (elementId) {
      dispatch(fetchAllLinkDataAsync(elementId) as unknown as AnyAction);
    }
  }, [elementId]);

  useEffect(() => {
    if (elementLink.mode === Mode.create || !isModalVisible) {
      dispatch(resetElementLink(elementId || ''));
    }
    form.resetFields();
  }, [isModalVisible]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditElementLink = (elementLinkData: ElementLinkState) => {
    dispatch(editElementLink(elementLinkData));
    toggleModal(true);
  };

  const handleDelete = (id: string) => {
    dispatch(toggleLoading(true));
    request(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${elementId}/elementlinks/${id}`,
      'Delete'
    )
      .then(() => {
        dispatch(deleteItemById(id));
        setDeleteId(null);
        eventBus.emit('notification-message', {
          title: 'Element Link has been deleted successfully',
          isDelete: true,
        });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  };

  const handleCancel = () => {
    toggleModal(false);
  };

  const showElementLinkDetails = (details: ElementLinkState) => {
    setElementLinkDetails(details);
  };

  return (
    <>
      <ElementContainer>
        <ControlWrapper>
          <img
            style={{ cursor: 'pointer' }}
            onClick={() => handleGoBack()}
            src="/img/back.png"
            alt="arrow-left"
          />
        </ControlWrapper>
        <Title level={3}>Element Details</Title>
        <ElementDetals element={element.value} />
        <Title level={3}>Element Links</Title>
        <Tableheader
          buttonText="Create Element Link"
          toggleModal={toggleModal}
        />
        <ElementLinksTable
          handleEditElementLink={handleEditElementLink}
          handleDelete={setDeleteId}
          showDetails={showElementLinkDetails}
        />
        {/* this line ensures that the modal rerenders on toggle for the the benefit of the form wizard */}
        {isModalVisible && (
          <Modal
            key={modalTitle[elementLink.mode] + elementLink.value.id || ''}
            title={modalTitle[elementLink.mode]}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width="100%"
            style={{ maxWidth: '700px' }}
          >
            <ElementLinkForm formData={form} handleCancel={handleCancel} />
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
            title="Are you sure you want to delete Element Link?"
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
        <Drawer
          placement="right"
          width={640}
          closeIcon={<img src="/img/close.png" alt="close" />}
          onClose={() => setElementLinkDetails(null)}
          open={elementLinkDetails != null}
        >
          <Title level={3} style={{ marginBottom: '45px' }}>
            Element Link Details
          </Title>
          <ElementLinkDetals elementLinkDetail={elementLinkDetails} />
        </Drawer>
      </ElementContainer>
    </>
  );
}

export default Element;
