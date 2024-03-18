import React from 'react'
import Sidebar from '../Fragments/Sidebar'

export default function AdminLayout({ children }) {
    return (
        <div className='container-fluid g-0'>
            <div className='row g-0'>
                <div className='col-2 position-fixed'>
                    <Sidebar />
                </div>
                <div className='col offset-2'>
                    <div className='container p-5'>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}
