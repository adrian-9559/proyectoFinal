import api from './axios.js';

class CategoryService {
     async getCategoryById(id) {
        try {
            const response = await api.get(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category:', error.message);
        }
    };

     async getAllCategories(page = 1, limit = 10) {
        try {
            const response = await api.get(`/categories?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

     async addCategory(category) {
        try {
            const response = await api.post('/categories', category);
            return response.data;
        } catch (error) {
            console.error('Error adding category:', error.message);
        }
    };

     async updateCategory(id, category) {
        try {
            const response = await api.put(`/categories/${id}`, category);
            return response.data;
        } catch (error) {
            console.error('Error updating category:', error.message);
        }
    };

     async deleteCategory(id) {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    };

     async getParentCategories() {
        try {
            const response = await api.get('/categories/parent');
            return response.data.categories;
        } catch (error) {
            console.error('Error fetching parent categories:', error.message);
        }
    };

     async getChildCategories(categoryId) {
        try {
            const response = await api.get(`/categories/${categoryId}/child`);
            if (!response.data.categories) {
                return [];
            }
            return response.data.categories;
        } catch (error) {
            console.error('Error fetching child categories:', error.message);
        }
    };
}

export default new CategoryService();