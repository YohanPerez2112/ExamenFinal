<template>
  <div class="card product-card">
    <img :src="product.thumbnail || product.images?.[0]" class="card-img-top" alt="imagen">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text text-truncate">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${{ product.price }}</strong>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary me-1" @click="$emit('view', product)">Detalles</button>
          <button class="btn btn-sm btn-outline-warning me-1" @click="$emit('edit', product)">Editar</button>
          <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', product)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    product: { type: Object, required: true }
  }
}
</script>

<style scoped>
.card { width: 100%; }
</style>
