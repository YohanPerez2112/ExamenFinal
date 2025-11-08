<template>
  <div class="card h-100 shadow-sm">
    <img
  :src="product.image"
  :alt="product.title"
  class="card-img-top product-img"
/>

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text text-muted mb-2">{{ product.category }}</p>
      <p class="fw-bold mb-3">$ {{ product.price }}</p>
      <div class="mt-auto d-flex justify-content-between">
        <button class="btn btn-outline-primary btn-sm" @click="$emit('view', product)">
          Ver
        </button>
        <button class="btn btn-outline-secondary btn-sm" @click="$emit('edit', product)">
          Editar
        </button>
        <button class="btn btn-outline-danger btn-sm" @click="$emit('delete')">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    product: Object
  }
}
</script>
<style scoped>
.product-img {
  height: 250px;              
  object-fit: cover;         
  object-position: center;    
  border-bottom: 1px solid #ddd; 
}
.card {
  border-radius: 10px;
  overflow: hidden;
}
</style>

