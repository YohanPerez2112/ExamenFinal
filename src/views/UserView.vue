<template>
  <div>
    <h3 class="mb-3">Gestión de Usuarios</h3>

    <button class="btn btn-primary mb-3" @click="openCreate">Añadir Usuario</button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(u, i) in users" :key="i">
          <td>{{ u.username }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.role }}</td>
          <td>
            <button class="btn btn-sm btn-outline-secondary me-2" @click="edit(u, i)">Editar</button>
            <button class="btn btn-sm btn-outline-danger" @click="remove(i)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <h5 class="mb-3">{{ editIndex !== null ? 'Editar Usuario' : 'Crear Usuario' }}</h5>

          <form @submit.prevent="save">
            <div class="mb-2">
              <label>Usuario</label>
              <input class="form-control" v-model="form.username" required>
            </div>

            <div class="mb-2">
              <label>Nombre</label>
              <input class="form-control" v-model="form.name" required>
            </div>

            <div class="mb-2">
              <label>Contraseña</label>
              <input class="form-control" v-model="form.password" required>
            </div>

            <div class="mb-2">
              <label>Rol</label>
              <select class="form-select" v-model="form.role" required>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
              </select>
            </div>

            <button class="btn btn-success w-100 mt-3">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      form: { username: "", name: "", password: "", role: "user" },
      editIndex: null
    };
  },

  created() {
    const stored = JSON.parse(localStorage.getItem("usersList"));
    if (stored) this.users = stored;
  },

  methods: {
    openCreate() {
      this.editIndex = null;
      this.form = { username: "", name: "", password: "", role: "user" };
      new bootstrap.Modal(this.$refs.modal).show();
    },

    edit(user, i) {
      this.editIndex = i;
      this.form = { ...user };
      new bootstrap.Modal(this.$refs.modal).show();
    },

    remove(i) {
      this.users.splice(i, 1);
      this.saveToStorage();
      this.$root.showToast("Usuario eliminado", "danger");
    },

    save() {
      if (this.editIndex === null) {
        this.users.push({ ...this.form });
      } else {
        this.users[this.editIndex] = { ...this.form };
      }
      this.saveToStorage();
      this.$root.showToast("Usuario guardado", "success");
      bootstrap.Modal.getInstance(this.$refs.modal).hide();
    },

    saveToStorage() {
      localStorage.setItem("usersList", JSON.stringify(this.users));
    }
  }
};
</script>
