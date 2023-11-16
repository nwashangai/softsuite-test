/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { ControlWrapper, ElementContainer, Title } from './styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnyAction } from 'redux';
import { fetchElementById } from '../../slices/elementSlice';
import { RootState } from '../../store';
import ElementDetals from '../../components/ElementDetails';
import Tableheader from '../../components/TableHeader';
import ElementLinksTable from '../../components/ElementLinksTable';
import { fetchAllLinkDataAsync } from '../../slices/allElementLinkSlice';

function Element() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const element = useSelector((state: RootState) => state.element);
  const { lookUpCache } = useSelector((state: RootState) => state.lookup);
  const { elementId } = useParams();
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

  const handleGoBack = () => {
    navigate(-1);
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
          toggleModal={() => null}
        />
        <ElementLinksTable />
      </ElementContainer>
    </>
  );
}

export default Element;
