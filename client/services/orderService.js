import api from './axios';
import toastr from 'toastr';

class OrderService {
    async getOrdersByUser(userId) {
        try {
            const response = await api.get(`/orders/user/${userId}`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    } 

    async updateOrder(orderId, order) {
        try {
            const response = await api.put(`/orders/${orderId}`, order);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            const response = await api.delete(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createOrder(order) {
        try {
            const response = await api.post(`/orders`, order);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getOrdersCount() {
        try {
            const response = await api.get(`/orders/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByDate(startDate, endDate) {
        try {
            const response = await api.post(`/orders/date`, {startDate, endDate});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUserOrders() {
        try {
          const response = await api.get(`/orders/user`);
          return response.data;
        } catch (error) {
            console.error(error);
          throw error;
        }
    }
}

const orderService = new OrderService();

export default orderService;