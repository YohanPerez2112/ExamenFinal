<template>
  <nav class="navbar navbar-expand navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">RopaStore</a>
      <div class="d-flex align-items-center">
        <span class="me-3">{{ userName }}</span>
        <button class="btn btn-outline-secondary btn-sm" @click="$emit('logout')">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    userName: { type: String, default: 'Invitado' }
  }
}
</script>
