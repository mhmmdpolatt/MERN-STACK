// src/components/UserList.js
import React, { useEffect } from 'react';
import { useFetchUsersQuery } from '../store/apis/userApi'; // RTK Query kullanarak import et

const User = () => {
    const { data: users, error, isLoading } = useFetchUsersQuery(); // Kullanıcıları çek

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Users</h2>
            <h1>KULLANCI LİTESİ</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.username} </li>
                ))}
            </ul>
        </div>
    );
};

export default User;
