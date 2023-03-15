import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthRegistration } from './components/auth/auth-registration/auth-registration';
import { ForgotPassword } from './components/auth/forgot-password/forgot-password';
import { LogInAuth } from './components/auth/log-in-auth';
import { RegistrationLayout } from './components/auth/registration-layout';
import { BookPage } from './components/book';
import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout/layout-main-page';
import { MainPage } from './components/layout/layout-main-page/main';
import { Terms } from './components/layout/layout-main-page/terms';
import { PrivateRoute, PrivateRouteAuth } from './private-route/private-route';
import { store } from './store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Provider store={store}>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route element={<LayoutMainPage />}>
            <Route path='/' element={<Navigate to='books/all' />} />
            <Route path='books/:category' element={<MainPage />} />
            <Route path='rules' element={<Terms contentView='Правила пользования' />} />
            <Route path='contract' element={<Terms contentView='Договор оферты' />} />
          </Route>
          <Route path='books/:category/:id' element={<BookPage />} />
        </Route>
        <Route
          path='/auth/'
          element={
            <PrivateRouteAuth>
              <RegistrationLayout />
            </PrivateRouteAuth>
          }
        >
          <Route path='forgot-pass' element={<ForgotPassword />} />
          <Route path='local' element={<LogInAuth />} />
          <Route path='register' element={<AuthRegistration />} />
        </Route>
      </Routes>
    </Provider>
  </HashRouter>
);
