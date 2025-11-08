import axios from 'axios'

const API_BASE = 'https://dummyjson.com' // endpoints: /products

export default {
  async listProducts() {
    const res = await axios.get(`${API_BASE}/products`)
    return res.data.products
  },
  async getProduct(id) {
    const res = await axios.get(`${API_BASE}/products/${id}`)
    return res.data
  },
  async createProduct(product) {
    // DummyJSON supports POST /products (returns simulated creation)
    const res = await axios.post(`${API_BASE}/products/add`, product)
    return res.data
  },
  async updateProduct(id, product) {
    const res = await axios.put(`${API_BASE}/products/${id}`, product)
    return res.data
  },
  async deleteProduct(id) {
    const res = await axios.delete(`${API_BASE}/products/${id}`)
    return res.data
  }
}
