import axios from "axios";
const API_BASE = "https://693793aef8dc350aff349870.mockapi.io/ApiExamenFinal";

export default {
  async listProducts() {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      return res.data;
    } catch (e) {
      console.error("Error obteniendo productos:", e);
      return [];
    }
  },

  async createProduct(product) {
    console.log("Simulación crear", product);
    return { ...product, id: "local_" + Date.now() };
  },

  async updateProduct(id, product) {
    console.log("Simulación update", id, product);
    return { ...product, id };
  },

  async deleteProduct(id) {
    console.log("Simulación delete", id);
    return true;
  }
};
