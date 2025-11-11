
import axios from 'axios'

const API_BASE = 'https://fakestoreapi.com'

export default {
  async listProducts() {
    const res = await axios.get(`${API_BASE}/products`)

    return res.data.filter(
      p =>
        p.category === "men's clothing" ||
        p.category === "women's clothing" ||
        p.category === 'jewelery'
    )
  },
  async createProduct(product) {
    const res = await axios.post(`${API_BASE}/products`, product)
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
