import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import { MyAccount } from '../screens/MyAccount/MyAccount';
import { EditMyAccount } from '../screens/EditMyAccount/EditMyAccount';
import { ROUTES } from './config';

const routes = {
  [ROUTES.myAccount]: () => <MyAccount title="My Account" />,
  [ROUTES.edit]: () => <EditMyAccount title="My Account" />,
};

const Router = () => {
  useRedirect('/', '/my-account');
  const routeResult = useRoutes(routes);
  return routeResult || <div>Not found</div>;
};

export { Router };
