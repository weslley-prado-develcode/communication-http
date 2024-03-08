import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingUserId, setEditingUserId] = useState(null); // Estado para armazenar o ID do usuário em edição

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
    };

    const createUser = async () => {
        await axios.post('http://localhost:8080/api/users', { name, email });
        fetchUsers();
        setName('');
        setEmail('');
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        fetchUsers();
    };

    const editUser = (id) => {
        const userToEdit = users.find(user => user.id === id);
        setName(userToEdit.name);
        setEmail(userToEdit.email);
        setEditingUserId(id);
    };

    const updateUser = async () => {
        await axios.put(`http://localhost:8080/api/users/${editingUserId}`, { name, email });
        fetchUsers();
        setName('');
        setEmail('');
        setEditingUserId(null);
    };

    return (
        <div className="container">
            <h1>Users</h1>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                {editingUserId ? (
                    <button onClick={updateUser}>Atualizar Usuário</button>
                ) : (
                    <button onClick={createUser}>Adicionar Usuário</button>
                )}
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                        <button onClick={() => editUser(user.id)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
