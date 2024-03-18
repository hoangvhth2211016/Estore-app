import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../CustomHooks/useAuth';


export default function Sidebar() {

    const navItems = [
        { path: '/admin/products', label: 'Products' },
        { path: '/admin/categories', label: 'Categories' },
        { path: '/admin/brands', label: 'Brands' },
        { path: '/admin/orders', label: 'Orders' },
        { path: '/admin/users', label: 'Users' }
    ]

    const location = useLocation();

    const { handleLogout } = useAuth();

    return (
        <div className="d-flex flex-column p-3 text-white bg-dark min-vh-100">
            <div className='text-center py-4'>
                <Link to="/" className="mb-3 mb-md-0 text-white text-decoration-none fs-4">
                    Admin Dashboard
                </Link>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {navItems.map(item => (
                    <li className="nav-item my-2" key={item.label}>
                        <Link to={item.path} className={`nav-link text-white ps-3 ${location.pathname === item.path && 'active'}`}>
                            {location.pathname === item.path && <i className="bi bi-caret-right-fill me-2"></i>}
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <hr />
            <div>
                <i className="btn btn-link text-white bi bi-box-arrow-right fs-3" onClick={handleLogout}></i>
            </div>
        </div>
    )
}
