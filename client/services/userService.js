import api from './axios';

// UserService.js

class UserService {
    async loginUser(email, password) {
        const response = await api.post(`/users/login`, {
            email: email,
            current_password: password,
        });
        return response.data.token;
    }

    async registerUser(user) {
        const response = await api.post(`/users`, {
            user
        });

        if (!response.data) {
            console.error('Error registering user:', response.status);
            throw new Error('Error al registrar el usuario');
        }

        return response.data;
    }

    async updateUser(user) {
        return api.put(`/users/${user.user_id}`, {
            user
        });
    }

    async addUser(email, password, firstName, lastName, dni, roleId) {
        return api.post(`/users`, {
            email: email,
            current_password: password,
            first_name: firstName,
            last_name: lastName,
            dni: dni,
            role_id: roleId,
        });
    }

    async getUserInfo() {
        const response = await api.post(`/users/info`);
        return response.data[0];
    }

    async getAllUsersInfo(page = 1, limit = 10) {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        return response.data;
    }

    async deleteUser(id) {
        return api.delete(`/users/${id}`);
    }

    async getUserById(id) {
        return api.get(`/users/${id}`);
    }

    async setUserImage(image) {
        const formData = new FormData();
        formData.append('image', image);
        const response = await api.post(`/files/uploadUser`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response;
    }
}

export default new UserService();