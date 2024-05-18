import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

const CreateUser = () => {
    const router = useRouter();
    const {id} = router.query;
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        email:  '',
        current_password:  '',
        first_name:  '',
        last_name:  '',
        dni: '',
        role: ''
    });

    useEffect(() => {
    const id = router.query.id;
    
    if(id){
        const fetchUser = async () => {
            try {
                const response = await UserService.getUserById(id);
                console.log(response.data);
                const { email, current_password, UserInfo, Roles } = response.data[0];
                const { first_name, last_name, dni } = UserInfo;
                const role = Roles[0].role_id;
                setUser(prevUser => ({
                    ...prevUser,
                    email,
                    current_password,
                    first_name,
                    last_name,
                    dni,
                    role
                }));
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }
    const fetchRoles = async () => {
        try {
            const response = await RoleService.getAllRoles();
            setRoles(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchRoles();
}, [router.query.id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userToEdit) {
            await UserService.updateUser(userToEdit.id, user);
        } else {
            await UserService.registerUser(user);
        }
        router.push('/administrador?view=Usuarios');
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    aria-label="Email"
                    required
                />
                <Input
                    name="current_password"
                    placeholder="Contraseña"
                    value={user.current_password}
                    onChange={handleChange}
                    aria-label="Contraseña"
                    required
                />
                
                <Input
                    name="first_name"
                    placeholder="Nombre"
                    value={user.first_name}
                    onChange={handleChange}
                    aria-label="Nombre"
                    required
                />
                <Input
                    name="last_name"
                    placeholder="Apellidos"
                    value={user.last_name}
                    onChange={handleChange}
                    aria-label="Apellidos"
                    required
                />
                <Input
                    name="dni"
                    placeholder="DNI"
                    value={user.dni}
                    onChange={handleChange}
                    aria-label="DNI"
                    required
                />
                <Select
                    name="role"
                    placeholder="Role"
                    value={user.role}
                    onChange={handleChange}
                    aria-label="Role"
                    required
                >
                    {roles && roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                            {role.role_name.value}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="button" onClick={() => router.push('/administrador?view=Usuarios')} aria-label="Cancelar">Cancelar</Button>
                <Button type="submit" aria-label="Crear">Crear</Button>
            </form>
        </div>
    );
}

export default CreateUser;