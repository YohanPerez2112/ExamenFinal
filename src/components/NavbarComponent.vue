<template>
  <nav class="navbar navbar-expand navbar-light bg-white shadow-sm py-2">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <span class="badge bg-primary me-2">RC</span>
        <span class="fw-bold" style="color:var(--primary)">Ropa-Catalogo</span>
      </a>

      <div class="d-flex align-items-center">
        <div class="me-3 text-muted small">Hola, {{ userName }}</div>
        <button class="btn btn-outline-secondary btn-sm" @click="$emit('logout')">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: { userName: { type: String, default: "Invitado" } }
};
</script>

<style scoped>
.navbar-brand span.badge { font-weight: 700; border-radius: 6px; }
</style>
