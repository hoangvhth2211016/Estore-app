import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import { RouterProvider } from 'react-router-dom';
import ModalProvider from './ContextProvider/ModalProvider.jsx';
import { router } from './Router/router';
import CategoryProvider from './ContextProvider/CategoryProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BrandProvider from './ContextProvider/BrandProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <CategoryProvider>
        <BrandProvider>
          <RouterProvider router={router} />
          <ToastContainer autoClose={2000} />
        </BrandProvider>
      </CategoryProvider>
    </ModalProvider>
  </React.StrictMode>,
)
