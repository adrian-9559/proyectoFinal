import React, { useState, useEffect } from 'react';
import EditUserImage from '@components/users/editUserImage';
import UserImage from '@components/users/userImage';
import UserService from '@services/userService';
import { Input, Button, Image, Link , Skeleton, Badge } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import useTitle from '@hooks/useTitle';

const DataUser = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser} = useAppContext();
    useTitle('Mis Datos');

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await UserService.updateUser(user);
                if (!response) {
                    console.log('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }

    const handdleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    return (
        <main className='grid pt-6 pb-20 w-full lg:w-3/4 gap-6'>
            <section className='flex flex-col sm:flex-row items-center gap-3 pb-5'>
                <section className="w-24 h-24 sm:w-1/12 sm:h-1/12">
                    <Skeleton isLoaded={!isLoading} className="rounded-lg h-full w-full">
                        {user && 
                            <EditUserImage>
                                <UserImage user={user}/>
                            </EditUserImage>
                        }
                    </Skeleton>
                </section>
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2 w-full sm:w-auto">
                    <p className="font-bold text-center sm:text-left">{user ? user.email : ''}</p>
                </Skeleton>
            </section>
            <section className='w-full flex flex-col gap-5'>
                <Input type='text' className='w-full' value={user ? user.email : ''} onChange={handdleChange} disabled={!isEditing} label="Email:" name="email" />
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                    <Input type='text' className='w-full' value={user ? user.first_name : ''} onChange={handdleChange} disabled={!isEditing} label="Nombre:" name="first_name" />
                </Skeleton>
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                    <Input type='text' className='w-full' value={user ? user.last_name : ''} onChange={handdleChange} disabled={!isEditing} label="Apellido:" name="last_name" />
                </Skeleton>
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                    <Input type='text' className='w-full' value={user ? user.dni : ''} onChange={handdleChange} disabled={!isEditing} label="DNI:" name="dni" />
                </Skeleton>
                <Button color={isEditing ? 'primary' : 'default'} onClick={toggleEdit} className='w-full'>{isEditing ? 'Guardar' : 'Editar'}</Button>
            </section>
        </main>
    )
}

export default DataUser;