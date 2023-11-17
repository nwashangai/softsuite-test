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
import { Form } from '../../styles';
import {
  editElementLink,
  resetElementLink,
  toggleLoading,
} from '../../slices/elementLinkSlice';
import { request } from '../../utilities/request';

const modalTitle = {
  [Mode.create]: 'Create Element Link',
  [Mode.edit]: 'Edit Element Link',
  [Mode.view]: 'Element Link Details',
};

function Element() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const element = useSelector((state: RootState) => state.element);
  const elementLink = useSelector((state: RootState) => state.elementLink);
  const { lookUpCache } = useSelector((state: RootState) => state.lookup);
  const { elementId } = useParams();
  const [form] = Form.useForm<ElementLinkState>();
  useEffect(() => {
    dispatch(fetchElementById(elementId || '') as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (elementId) {
      dispatch(
        fetchAllLinkDataAsync(elementId, lookUpCache) as unknown as AnyAction
      );
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
    toggleLoading(true);
    request(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${elementId}/elementlinks/${id}`,
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

  const handleCancel = () => {
    toggleModal(false);
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
          handleDelete={handleDelete}
        />
        {/* this line ensures that the modal rerenders on toggle for the the benefit of the form wizard */}
        {isModalVisible && (
          <Modal
            key={modalTitle[elementLink.mode] + elementLink.value.id || ''}
            title={modalTitle[elementLink.mode]}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width="100%"
            style={{ maxWidth: '700px' }}
          >
            <ElementLinkForm formData={form} handleCancel={handleCancel} />
          </Modal>
        )}
      </ElementContainer>
    </>
  );
}

export default Element;
