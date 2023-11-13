import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import Layout from './components/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Element from './pages/element';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={enUS}>
        <Provider store={store}>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Element />} />
                <Route path="*" element={<App />} />
              </Route>
            </Routes>
          </Router>
        </Provider>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
