import React, { useState } from 'react';
import { ElementContainer, Title } from './styles';
import Tableheader from '../../components/TableHeader';
import { Form, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { ElementState } from '../../slices/types';
import { RootState } from '../../store';
import ElementForm from '../../components/ElementForm';

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
        title="Create Element"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="100%"
        style={{ maxWidth: '700px' }}
      >
        <ElementForm
          formData={form}
          initialValues={element}
          createElement={() => null}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}

export default Element;
