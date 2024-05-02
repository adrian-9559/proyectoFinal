const model = require('./addressModel');

const addAddress = async (req, res) => {
    const newAddress = req.body;
    newAddress.user_id = req.user.userId;
    try {
        const address = await model.insertAddress(newAddress);
        res.json(address);
    } catch (error) {
        console.error('Error adding the address:', error);
        res.status(500).json({ message: 'Error adding the address' });
    }
};

const deleteAddressById = async (req, res) => {
    const deletedAddress = await model.deleteAddress(req.params.addressId);

    if (!deletedAddress) {
        return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
};

const updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const address = await model.updateAddress(addressId, req.body);
    if (!address) {
        throw new Error('Not found');
    }
    res.json({ message: 'Address modified successfully' });
};

const getAddressById = async (req, res) => {
    try {
        const address = await model.getAddress(req.params.addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json({address});
    } catch (error) {
        console.error('Error getting the address:', error);
        res.status(500).json({ message: 'Error getting the address' });
    }
};

const getAddresses = async (req, res) => {
    const addresses = await model.getAddresses();
    if (!addresses) {
        throw new Error('Not found');
    }

    res.json(addresses);
};

const getAddressesByUserId = async (req, res) => {
    const userId = req.params.userId==="null"?req.user.userId:req.params.userId;
    const addresses = await model.getAddressesByUserId(userId);
    if (!addresses) {
        throw new Error('Not found');
    }
    res.json(addresses);
};

const setDefaultAddress = async (req, res) => {
    const { addressId } = req.params;
    const userId = req.user.userId;
    console.log('userId', userId);
    console.log('addressId', addressId);
    const response = await model.setDefaultAddress(userId, addressId);
    if (!response) {
        res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Default address set successfully' });
};

module.exports = {
    addAddress,
    getAddresses,
    getAddressById,
    getAddressesByUserId,
    updateAddress,
    deleteAddressById,
    setDefaultAddress
};