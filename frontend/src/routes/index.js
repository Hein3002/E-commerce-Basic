import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import Signup from '../pages/Signup'
import AdminPanel from '../pages/AdminPanel'
import AllUser from '../pages/AllUser'
import AllProduct from '../pages/AllProduct'
import CategoryProduct from '../components/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Appadmin from '../AppAdmin'
import ModalUser from '../components/Admin/Modal'
import SearchProduct from '../pages/SearchProduct'
import AdminTable from '../components/Admin/AdminTable'
import TableProduct from '../components/Admin/AdminTable'
import Confirmation from '../pages/Confirmation';
import Order from '../pages/Order'



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: 'product-category',
                element: <CategoryProduct />
            },
            {
                path: 'product-details/:id',
                element: <ProductDetails />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'order',
                element: <Order />
            },
            {
                path: 'cart-confirmation',
                element: <Confirmation />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUser />
                    },
                    {
                        path: "all-products",
                        element: <AllProduct />
                    },
                ]
            },
        ]
    },
    {
        path: "/admin",
        element: <Appadmin />,
        children: [
            {
                path: "product",
                element: <TableProduct />
            },
        ]
    }
])

export default router