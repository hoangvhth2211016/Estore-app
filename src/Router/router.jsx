import ResetPasswordPage from "../Components/Public/ResetPasswordPage";
import CartPage from "../Components/CartAndOrder/CartPage";
import LoginPage from "../Components/Public/LoginPage";
import RegisterPage from "../Components/Public/RegisterPage";
import ProfilePage from "../Components/Client/ProfilePage";
import { Outlet, createBrowserRouter } from "react-router-dom"
import App from "../App";
import { ProtectedRoute } from "./ProtectedRoute";
import ProductFilterPage from "../Components/Product/ProductFilterPage";
import AccountActivate from "../Components/Public/AccountActivate";
import ProductAddPage from "../Components/Product/ProductAddPage";
import AdminCategoryPage from "../Components/Category/AdminCategoryPage";
import AdminOrderPage from "../Components/CartAndOrder/AdminOrderPage";
import ProductList from "../Components/Product/ProductList";
import ProductDetail from "../Components/Product/ProductDetail";
import PaginationProvider from "../ContextProvider/PaginationProvider";
import PublicLayout from "../Components/Layout/PublicLayout";
import AdminLayout from "../Components/Layout/AdminLayout";
import AdminBrandPage from "../Components/Brand/AdminBrandPage";
import AdminUserPage from "../Components/User/AdminUserPage";
import NotFoundPage from "../Components/Public/NotFoundPage";


export const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '',
                element: <PublicLayout />,
                children: [
                    {
                        index: true, element:
                            <PaginationProvider>
                                <ProductList />
                            </PaginationProvider>
                    },
                    { path: 'login', element: <LoginPage /> },
                    { path: 'register', element: <RegisterPage /> },
                    { path: 'reset-password', element: <ResetPasswordPage /> },
                    { path: 'account/activate', element: <AccountActivate /> },
                    {
                        path: 'products',
                        element: <Outlet />,
                        children: [
                            {
                                index: true,
                                element:
                                    <PaginationProvider>
                                        <ProductList />
                                    </PaginationProvider>
                            },
                            {
                                path: 'filter',
                                element:
                                    <PaginationProvider>
                                        <ProductFilterPage />
                                    </PaginationProvider>
                            },
                            {
                                path: ':id',
                                element:
                                    <PaginationProvider>
                                        <ProductDetail />
                                    </PaginationProvider>
                            }
                        ]
                    },
                    {
                        path: 'user',
                        element: <ProtectedRoute hasAnyRoles={['CLIENT', 'ADMIN']} />,
                        children: [
                            { index: true, element: <ProfilePage /> },
                            { path: 'cart', element: <CartPage /> }
                        ]
                    }
                ]
            },
            {
                path: 'admin',
                element:
                    <AdminLayout>
                        <ProtectedRoute hasAnyRoles={['ADMIN']} />
                    </AdminLayout>,
                children: [
                    {
                        path: 'products',
                        element: <Outlet />,
                        children: [
                            {
                                index: true,
                                element:
                                    <PaginationProvider>
                                        <ProductList />
                                    </PaginationProvider>
                            },
                            {
                                path: 'add',
                                element:
                                    <ProductAddPage />
                            },
                            {
                                path: ':id/edit',
                                element:
                                    <ProductDetail />
                            }
                        ]
                    },
                    {
                        path: 'categories',
                        element: <AdminCategoryPage />
                    },
                    {
                        path: 'orders',
                        element:
                            <PaginationProvider>
                                <AdminOrderPage />
                            </PaginationProvider>
                    },
                    {
                        path: 'brands',
                        element: <AdminBrandPage />
                    },
                    {
                        path: 'users',
                        element:
                            <PaginationProvider>
                                <AdminUserPage />
                            </PaginationProvider>
                    }
                ]
            }

        ]
    }
]);
