import React from 'react'
import useFetch from '../../CustomHooks/useFetch'
import { getUsers } from '../../Services/user.service'
import usePagination from '../../CustomHooks/usePagination'
import { Spinner } from 'react-bootstrap'
import CustomPagination from '../Fragments/CustomPagination'
import UserTable from './UserTable'

export default function AdminUserPage() {

    const { searchParams } = usePagination();

    const { data, isLoading } = useFetch(getUsers, { searchParams });

    const { content: users, totalPages } = { ...data };

    return (
        <>
            {isLoading ? (
                <div className="w-100 text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className='my-5'>
                    <h1>Users</h1>
                    <hr />
                    <UserTable users={users} />
                    <CustomPagination total={totalPages} />
                </div>
            )}
        </>
    )
}
