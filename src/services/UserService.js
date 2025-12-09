
import axios from "axios";

const API_BASE = "https://693793aef8dc350aff349870.mockapi.io/ApiExamenFinal";

export default {
  async listUsers() {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      return res.data;
    } catch (e) {
      console.error("Error obteniendo usuarios:", e);
      return [];
    }
  }
};
