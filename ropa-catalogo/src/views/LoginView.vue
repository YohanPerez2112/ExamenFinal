<template>
  <div class="container d-flex align-items-center justify-content-center" style="min-height:100vh;">
    <div class="card p-4 shadow" style="max-width:420px; width:100%;">
      <h4 class="mb-3 text-center">Ingresar a RopaStore</h4>

      <div v-if="alert" class="alert alert-danger">{{ alert }}</div>

      <form @submit.prevent="doLogin">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <div class="d-grid">
          <button class="btn" :class="['btn-primary']">Ingresar</button>
        </div>
      </form>

      <small class="text-muted mt-3 d-block">
        Nota: validación educativa con archivo JSON local (no es autenticación real).
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return { username: '', password: '', alert: null }
  },
  methods: {
    async doLogin() {
      this.alert = null
      try {
        const res = await fetch('/users.json')
        const data = await res.json()
        const found = data.users.find(u => u.username === this.username && u.password === this.password)
        if (found) {
          // guardar usuario en sessionStorage simple
          sessionStorage.setItem('user', JSON.stringify(found))
          this.$router.push('/dashboard')
        } else {
          this.alert = 'Credenciales incorrectas'
        }
      } catch (err) {
        this.alert = 'Error al validar credenciales'
        console.error(err)
      }
    }
  }
}
</script>
