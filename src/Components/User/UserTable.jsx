import React from 'react'

export default function UserTable({ users }) {
    return (
        <div className='table-responsive'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserRow user={user} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}

const UserRow = ({ user }) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.firstname + ', ' + user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone ? user.phone : ''}</td>
            <td>{user.dob ? user.dob : ''}</td>
            <td>{user.role}</td>
        </tr>
    );
}
