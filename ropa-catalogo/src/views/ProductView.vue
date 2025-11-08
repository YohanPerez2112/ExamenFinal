<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
      <h3 class="mb-2">Catálogo de Ropa y Accesorios</h3>
      <div class="btn-group mb-2">
        <button
          class="btn"
          :class="category === 'all' ? 'btn-primary' : 'btn-outline-primary'"
          @click="setCategory('all')"
        >
          Todos
        </button>
        <button
          class="btn"
          :class="category === 'men' ? 'btn-primary' : 'btn-outline-primary'"
          @click="setCategory('men')"
        >
          Hombre 👔
        </button>
        <button
          class="btn"
          :class="category === 'women' ? 'btn-primary' : 'btn-outline-primary'"
          @click="setCategory('women')"
        >
          Mujer 👗
        </button>
        <button
          class="btn"
          :class="category === 'acc' ? 'btn-primary' : 'btn-outline-primary'"
          @click="setCategory('acc')"
        >
          Accesorios 💍
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else class="row g-3">
      <div
        v-for="p in filtered"
        :key="p.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <ProductCardComponent
          :product="p"
          @view="viewProduct"
          @delete="deleteProduct(p.id)"
          @edit="editProduct(p)"
        />
      </div>
    </div>

    <div v-if="!loading && filtered.length === 0" class="text-center text-muted py-5">
      <h5>No hay productos disponibles en esta categoría.</h5>
    </div>
  </div>
</template>

<script>
import ProductCardComponent from '../components/ProductCardComponent.vue'
import api from '../services/api'

export default {
  name: 'ProductView',
  components: { ProductCardComponent },
  data() {
    return {
      products: [],
      filtered: [],
      loading: false,
      category: 'all'
    }
  },
  async created() {
    await this.load()
  },
  methods: {
    async load() {
      this.loading = true
      try {
        const data = await api.listProducts()
        this.products = data
        this.filtered = data
      } catch (err) {
        console.error(err)
        alert('Error cargando productos desde Fake Store API')
      } finally {
        this.loading = false
      }
    },
    setCategory(type) {
      this.category = type
      if (type === 'all') {
        this.filtered = this.products
      } else if (type === 'men') {
        this.filtered = this.products.filter(p => p.category === "men's clothing")
      } else if (type === 'women') {
        this.filtered = this.products.filter(p => p.category === "women's clothing")
      } else if (type === 'acc') {
        this.filtered = this.products.filter(p => p.category === 'jewelery')
      }
    },
    viewProduct(product) {
      alert(`${product.title}\n\n${product.description}\n\nPrecio: $${product.price}`)
    },
    async deleteProduct(id) {
      if (confirm('¿Seguro que deseas eliminar este producto?')) {
        await api.deleteProduct(id)
        this.products = this.products.filter(p => p.id !== id)
        this.setCategory(this.category)
        alert('Producto eliminado (simulado en API FakeStore)')
      }
    },
    async editProduct(product) {
      const nuevoTitulo = prompt('Editar nombre del producto:', product.title)
      if (nuevoTitulo && nuevoTitulo !== product.title) {
        product.title = nuevoTitulo
        await api.updateProduct(product.id, product)
        alert('Producto editado (simulado en API FakeStore)')
      }
    }
  }
}
</script>

<style scoped>
.btn-group .btn {
  min-width: 120px;
}
</style>
