<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
      <h3 class="mb-2">Catálogo de Ropa y Accesorios</h3>

      <select v-model="category" @change="filterCategory" class="form-select w-auto mb-2">
        <option value="all">Todas las categorías</option>
        <option value="men">Ropa Hombre</option>
        <option value="women">Ropa Mujer</option>
        <option value="acc">Accesorios / Joyas</option>
        <option value="local">Mis productos creados</option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else class="row g-3">
      <div v-for="p in filtered" :key="p.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <ProductCardComponent
          :product="p"
          @view="viewProduct"
          @delete="askDelete"
          @edit="askEdit"
        />
      </div>
    </div>

    <div v-if="!loading && filtered.length === 0" class="text-center text-muted py-5">
      <h5>No hay productos disponibles.</h5>
    </div>

    <div class="card p-3 shadow mt-4">
      <h5>Crear nuevo producto</h5>
      <form @submit.prevent="crearProducto">
        <div class="mb-2"><label>Nombre</label><input v-model="nuevo.title" class="form-control" required></div>
        <div class="mb-2"><label>Precio</label><input v-model.number="nuevo.price" type="number" class="form-control" required></div>
        <div class="mb-2"><label>Descripción</label><textarea v-model="nuevo.description" class="form-control"></textarea></div>
        <div class="mb-2"><label>Imagen URL</label><input v-model="nuevo.image" class="form-control" placeholder="https://..." /></div>
        <div class="mb-2"><label>Categoría</label><input v-model="nuevo.category" class="form-control" placeholder="men's clothing" /></div>
        <button class="btn btn-primary w-100">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
import ProductCardComponent from "@/components/ProductCardComponent.vue";
import api from "@/services/api";

export default {
  components: { ProductCardComponent },

  data() {
    return {
      products: [],
      filtered: [],
      loading: false,
      category: "all",

      nuevo: {
        title: "",
        price: null,
        description: "",
        image: "",
        category: ""
      }
    };
  },

  async created() {
    await this.load();
  },

  methods: {
    async load() {
      this.loading = true;
      try {
        const data = await api.listProducts();

        this.products = (data || []).map(p => ({
          id: p.id,
          title: p.title ?? p.name,
          price: p.price ?? 0,
          description: p.description ?? "",
          image: p.image ?? "https://via.placeholder.com/300",
          category: p.category ?? "uncategorized"
        }));

        this.filtered = [...this.products];

      } catch (e) {
        this.$root.showToast("Error cargando productos", "danger");
        this.products = [];
        this.filtered = [];
      }

      this.loading = false;
    },

    filterCategory() {
      if (this.category === "all") this.filtered = this.products;
      else if (this.category === "men") this.filtered = this.products.filter(p => p.category === "men's clothing");
      else if (this.category === "women") this.filtered = this.products.filter(p => p.category === "women's clothing");
      else if (this.category === "acc") this.filtered = this.products.filter(p => p.category === "jewelery");
      else if (this.category === "local") this.filtered = this.products.filter(p => p.category === "local-product");
    },

    viewProduct(p) {
      this.$root.showToast(`${p.title} — $${p.price}`, "info");
    },

    async askDelete(id) {
      const ok = await this.$root.confirm("¿Eliminar este producto?");
      if (!ok) return;

      try {
        if (!String(id).startsWith("local_")) {
          await api.deleteProduct(id);
        }
      } catch {}

      this.products = this.products.filter(p => p.id !== id);
      this.filterCategory();
      this.$root.showToast("Producto eliminado", "danger");
    },

    async askEdit(product) {
      const edited = await this.$root.openEditModel(product);
      if (!edited) return;

      try {
        if (!String(product.id).startsWith("local_")) {
          await api.updateProduct(product.id, edited);
        }
      } catch {}

      const i = this.products.findIndex(p => p.id === product.id);
      if (i !== -1) this.products.splice(i, 1, { ...this.products[i], ...edited });

      this.filterCategory();
      this.$root.showToast("Producto actualizado", "info");
    },

    crearProducto() {
      const nuevoProd = {
        ...this.nuevo,
        id: "local_" + Date.now(),
        category: "local-product",
        image: this.nuevo.image || "https://placehold.co/300"
      };

      this.products.push(nuevoProd);
      this.filterCategory();

      this.nuevo = { title: "", price: null, description: "", image: "", category: "" };

      this.$root.showToast("Producto creado correctamente", "success");
    }
  }
};
</script>
