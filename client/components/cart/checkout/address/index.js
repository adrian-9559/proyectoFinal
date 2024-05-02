// AddressMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalFooter, Tabs, Tab } from '@nextui-org/react';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';
import AddressService from '@services/addressService';
import AuthTabs from '@components/auth/authMenu/partials/authTabs';
import AddressList from '@components/cart/checkout/address/partials/addressList';
import AddressForm from '@components/cart/checkout/address/partials/addressForm';

const AddressMenu = ({handleSelectAddress}) => {
    const router = useRouter();
    const [ UserAddress, SetUserAddress ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const [ editAddress, setEditAddress ] = useState(null);
    const { isLoggedIn } = useAppContext();

    const fetchAddress = async () => {
        console.log('fetching address');
        const addressData = await AddressService.getAddressByUserId();
        SetUserAddress(addressData);
        if(addressData.length === 0) {
            setShowForm(true);
        }
    };

    useEffect(() => {
        if(isLoggedIn && !showForm){
            fetchAddress();
        }
    }, [showForm]);

    const handleDelete = async (id) => {
        await AddressService.deleteAddress(id);
        fetchAddress();
    }

    const handleEdit = (address) => {
        setShowForm(true);
        setEditAddress(address);
        fetchAddress();
    }

    const handleAddAddress = async (address) => {
        setEditAddress(null);
        setShowForm(true);
    }

    return (
        <section className="flex flex-col justify-center items-center w-96">
            {isLoggedIn ? (
                <section>
                    {!showForm && UserAddress?.length > 0 && (
                        <section className="flex flex-col justify-center items-center gap-4">
                        <h2 className="text-2xl font-bold">Seleccionar dirección</h2>
                            <section className='flex flex-row justify-end items-center w-full p-0'>
                                <Button 
                                    onPress={handleAddAddress} 
                                    isIconOnly
                                    className='m-o'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Button>
                            </section>
                            <AddressList 
                                addressList={UserAddress}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                handleSelectAddress={handleSelectAddress}
                            />
                        </section>
                    )}
                    {showForm &&(
                        <section className="flex flex-col justify-center items-center gap-4">
                            <AddressForm setShowForm={setShowForm} editAddress={editAddress} setEditAddress={setEditAddress}/>
                            {UserAddress?.length !== 0 && (
                                <Button onPress={() => setShowForm(false)} className="w-full">Cancelar</Button>
                            )}
                        </section>
                    )}
                </section>
            ) : (
                <AuthTabs/>
            )}
        </section>
    );
};

export default AddressMenu;