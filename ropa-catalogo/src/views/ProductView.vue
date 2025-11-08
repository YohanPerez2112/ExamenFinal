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
          Accesorios 🕶️
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
        // 🔹 Filtrar solo las categorías que nos interesan
        const allowed = [
          'mens-shirts', 'mens-shoes', 'mens-watches',
          'womens-dresses', 'womens-shoes', 'womens-bags',
          'womens-jewellery', 'womens-watches',
          'sunglasses', 'fragrances'
        ]
        this.products = data.filter(p => allowed.includes(p.category))
        this.filtered = [...this.products]
      } catch (err) {
        console.error(err)
        alert('Error cargando productos')
      } finally {
        this.loading = false
      }
    },
    setCategory(type) {
      this.category = type
      if (type === 'all') {
        this.filtered = this.products
      } else if (type === 'men') {
        this.filtered = this.products.filter(p =>
          ['mens-shirts', 'mens-shoes', 'mens-watches'].includes(p.category)
        )
      } else if (type === 'women') {
        this.filtered = this.products.filter(p =>
          [
            'womens-dresses', 'womens-shoes',
            'womens-bags', 'womens-jewellery', 'womens-watches'
          ].includes(p.category)
        )
      } else if (type === 'acc') {
        this.filtered = this.products.filter(p =>
          ['sunglasses', 'fragrances'].includes(p.category)
        )
      }
    },
    viewProduct(product) {
      alert(`${product.title}\n\n${product.description}\n\n$${product.price}`)
    }
  }
}
</script>

<style scoped>
.btn-group .btn {
  min-width: 120px;
}
</style>
