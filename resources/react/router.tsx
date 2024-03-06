import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import Loading from './components/Loading';

const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Product = React.lazy(() => import('./pages/Dashboard/Product'));
const CreateProduct = React.lazy(() => import('./pages/Dashboard/Product/Create'));
const EditProduct = React.lazy(() => import('./pages/Dashboard/Product/Edit'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout />}
        >
            <Route
                index
                element={
                    <React.Suspense fallback={<Loading />}>
                        <Home />
                    </React.Suspense>
                }
            />
            <Route
                path='/dashboard'
                element={
                    <React.Suspense fallback={<Loading />}>
                        <Dashboard />
                    </React.Suspense>
                }
            />
            <Route
                path='/dashboard/product'
                element={
                    <React.Suspense fallback={<Loading />}>
                        <Product />
                    </React.Suspense>
                }
            />
            <Route
                path='/dashboard/product/create'
                element={
                    <React.Suspense fallback={<Loading />}>
                        <CreateProduct />
                    </React.Suspense>
                }
            />
            <Route
                path='/dashboard/product/edit/:id'
                element={
                    <React.Suspense fallback={<Loading />}>
                        <EditProduct />
                    </React.Suspense>
                }
            />
        </Route>
    )
)

export default router;
