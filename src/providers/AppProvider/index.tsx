/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitalDataAsync } from '../../slices/lookupSlice';
import { AnyAction } from 'redux';
import { RootState } from '../../store';
import PageLoader from '../../components/PageLoader';

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

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const lookup = useSelector((state: RootState) => state.lookup);

  useEffect(() => {
    dispatch(fetchInitalDataAsync() as unknown as AnyAction);
  }, []);

  return (
    <ConfigContext.Provider value={{}}>
      {lookup.loading ? <PageLoader /> : children}
    </ConfigContext.Provider>
  );
};

export { useConfig };
export default ConfigProvider;
