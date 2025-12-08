<template>
  <div class="card product-card h-100 shadow-sm">
    <div class="position-relative">
      <img :src="product.image" :alt="product.title" class="card-img-top product-img" />
      <span class="badge position-absolute top-0 start-0 m-2" :class="badgeClass">{{ shortCategory }}</span>
    </div>

    <div class="card-body d-flex flex-column">
      <h6 class="card-title mb-1">{{ product.title }}</h6>
      <p class="text-muted small mb-2 truncate">{{ product.description }}</p>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <strong class="text-success">${{ product.price }}</strong>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-primary" @click="$emit('view', product)">Ver</button>
          <button class="btn btn-sm btn-outline-secondary" @click="$emit('edit', product)">Editar</button>
          <button class="btn btn-sm btn-outline-danger" @click="$emit('delete')">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCardComponent",
  props: { product: { type: Object, required: true } },
  computed: {
    shortCategory() {
      return (this.product.category || "").split("/")[0];
    },
    badgeClass() {
      const c = (this.product.category || "").toLowerCase();
      if (c.includes("men")) return "bg-primary text-white";
      if (c.includes("women")) return "bg-danger text-white";
      if (c.includes("jewel") || c.includes("acc")) return "bg-warning text-dark";
      if (c.includes("local")) return "bg-secondary text-white";
      return "bg-info text-white";
    }
  }
};
</script>

<style scoped>
.product-card { border-radius: 10px; overflow: hidden; transition: transform .12s, box-shadow .12s; }
.product-card:hover { transform: translateY(-6px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
.product-img { height: 200px; object-fit: cover; width: 100%; }
.truncate { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.badge { font-size: 0.75rem; padding: .35rem .5rem; border-radius: .5rem; }
</style>
