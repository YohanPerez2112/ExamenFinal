<template>
  <div class="login-bg d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow-lg" style="width: 380px; border-radius: 18px;">
      <h3 class="text-center mb-3">Iniciar Sesión</h3>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input v-model="username" class="form-control" :disabled="locked" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" :disabled="locked" required />
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <small class="text-muted">Intentos: {{ attempts }}/3</small>
          <button class="btn btn-primary" :disabled="locked">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Entrar
          </button>
        </div>

        <div v-if="locked" class="alert alert-warning p-2">
          Has excedido los intentos. Intenta en {{ lockSeconds }}s
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"; // Asegúrate de la ruta correcta

export default {
  data() {
    return {
      username: "",
      password: "",
      users: [],
      attempts: 0,
      locked: false,
      lockSeconds: 30,
      loading: false
    };
  },

  async created() {
    try {
      // Llamada a la API en lugar del JSON local
      this.users = await UserService.listUsers();
    } catch (e) {
      this.$root.showToast("No se pudo cargar usuarios", "danger");
    }
  },

  methods: {
    startLock() {
      this.locked = true;
      this.lockSeconds = 30;
      const iv = setInterval(() => {
        this.lockSeconds--;
        if (this.lockSeconds <= 0) {
          clearInterval(iv);
          this.locked = false;
          this.attempts = 0;
        }
      }, 1000);
    },

    login() {
      if (this.locked) return;
      this.loading = true;

      setTimeout(() => {
        const found = this.users.find(
          u => u.username === this.username && u.password === this.password
        );

        if (!found) {
          this.attempts++;
          this.$root.showToast("Usuario o contraseña incorrectos", "danger");

          if (this.attempts >= 3) {
            this.startLock();
            this.$root.showToast("Bloqueado temporalmente por demasiados intentos", "warning");
          }

          this.loading = false;
          return;
        }

        localStorage.setItem("currentUser", JSON.stringify(found));
        this.$root.showToast(`Bienvenido ${found.name || found.username}`, "success");
        this.$router.push("/dashboard/productos");
        this.loading = false;
      }, 600);
    }
  }
};
</script>


<style scoped>
.login-bg {
  height: 100vh;
  background: linear-gradient(135deg, #0f1724, #1f2937);
  background-size: cover;
}
.card {
  border-radius: 14px;
}
</style>
