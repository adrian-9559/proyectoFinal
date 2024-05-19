import api from './axios';

class PaymentService {

  async getCustomerOrders(userId=null) {
    const response = await api.get('/stripe/get-customer-orders', { userId });
    return response.data;
  }

}

const paymentService = new PaymentService();

export default paymentService;