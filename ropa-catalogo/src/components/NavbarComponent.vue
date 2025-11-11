<template>
 <nav class="navbar navbar-expand navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">RopaStore</a>
      <div class="d-flex align-items-center">
        <button class="theme-toggle me-3" @click="toggleTheme">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
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
  },
  data() {
    return {
      isDark: false
    }
  },
  mounted() {
    const saved = localStorage.getItem('theme')
    this.isDark = saved === 'dark'
    this.applyTheme()
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    }
  }
} 
</script>
