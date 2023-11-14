import React, { useState } from 'react';
import { ElementContainer, Title } from './styles';
import Tableheader from '../../components/TableHeader';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { ElementState, Mode } from '../../slices/types';
import { RootState } from '../../store';
import ElementForm from '../../components/ElementForm';
import { Form } from '../../styles';

const modalTitle = {
  [Mode.create]: 'Create Element',
  [Mode.edit]: 'Edit Element',
};

function Element() {
  const [isModalVisible, toggleModal] = useState<boolean>(false);
  const element = useSelector((state: RootState) => state.element);
  const [form] = Form.useForm<ElementState>();

  const handleCancel = () => {
    toggleModal(false);
  };

  return (
    <>
      <ElementContainer>
        <Title level={3}>Element</Title>
        <Tableheader toggleModal={toggleModal} />
      </ElementContainer>
      <Modal
        title={modalTitle[element.mode]}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="100%"
        style={{ maxWidth: '700px' }}
      >
        <ElementForm formData={form} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Element;
