/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitalDataAsync } from '../../slices/lookupSlice';
import { AnyAction } from 'redux';
import { RootState } from '../../store';
import PageLoader from '../../components/PageLoader';
import Button from '../../components/Button';
import { CheckOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Result } from '../../styles';
import eventBus from '../../utilities/eventBus';

/**
 * Using context for scalability purpose as it posibly be used to set/provide any configuration data in the feature
 */

interface ConfigContextProps {}

// initial values will be specified here when necessary and updated in the Provider values
const ConfigContext = createContext<ConfigContextProps>({});

const useConfig = () => useContext(ConfigContext);

interface ConfigProviderProps {
  children: ReactNode;
}

export type Notification = {
  title: string;
  isDelete?: boolean;
};

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const lookup = useSelector((state: RootState) => state.lookup);
  const [message, setMessage] = useState<Notification | null>(null);

  useEffect(() => {
    dispatch(fetchInitalDataAsync() as unknown as AnyAction);
    eventBus.on('notification-message', setMessage);
    return () => eventBus.off('notification-message', setMessage);
  }, []);

  return (
    <ConfigContext.Provider value={{}}>
      {lookup.loading ? <PageLoader /> : children}
      <Modal
        open={message != null}
        width={400}
        onCancel={() => setMessage(null)}
        maskClosable={false}
        footer={null}
      >
        <Result
          status="success"
          title={message?.title}
          isDelete={message?.isDelete}
          icon={<CheckOutlined style={{ width: '35px', height: '35px' }} />}
          extra={[
            <Button width="100%" onClick={() => setMessage(null)}>
              Close to continue
            </Button>,
          ]}
        />
      </Modal>
    </ConfigContext.Provider>
  );
};

export { useConfig };
export default ConfigProvider;
