
<template>
  <div id="app">
    <router-view />

    
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999">
      <div id="appToast" class="toast text-white bg-primary shadow-lg rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body fw-semibold" id="toastMessage">Notificación</div>
      </div>
    </div>

    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true" ref="confirmModalEl">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-body">
            <p class="mb-3 fs-5" ref="confirmText">¿Confirmar?</p>
            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-outline-secondary" @click="hideConfirm()">Cancelar</button>
              <button class="btn btn-danger" @click="confirmOk()">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true" ref="editModalEl">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-header">
            <h5 class="modal-title">Editar producto</h5>
            <button type="button" class="btn-close" @click="hideEdit()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label class="form-label">Nombre</label>
              <input v-model="editModel.title" class="form-control" />
            </div>
            <div class="mb-2">
              <label class="form-label">Precio</label>
              <input v-model.number="editModel.price" type="number" class="form-control" />
            </div>
            <div class="mb-2">
              <label class="form-label">Descripción</label>
              <textarea v-model="editModel.description" class="form-control"></textarea>
            </div>
            <div class="mb-2">
              <label class="form-label">Categoría</label>
              <input v-model="editModel.category" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="hideEdit()">Cancelar</button>
            <button class="btn btn-primary" @click="saveEdit()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";

export default {
  name: "App",

  data() {
    return {
      confirmResolve: null,
      editResolve: null,
      editModel: { id: null, title: "", price: 0, description: "", category: "" }
    };
  },

  methods: {
    showToast(msg, color = "primary") {
      const toastEl = document.getElementById("appToast");
      const body = document.getElementById("toastMessage");

      toastEl.className = `toast text-white bg-${color} shadow-lg rounded-3`;
      body.innerText = msg;

      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    },

    confirm(message = "¿Confirmar acción?") {
      return new Promise(resolve => {
        this.confirmResolve = resolve;
        this.$refs.confirmText.innerText = message;

        const el = this.$refs.confirmModalEl;
        const modal = new bootstrap.Modal(el);
        el.__modal = modal;
        modal.show();
      });
    },

    hideConfirm() {
      const el = this.$refs.confirmModalEl;
      if (el.__modal) el.__modal.hide();
      if (this.confirmResolve) this.confirmResolve(false);
      this.confirmResolve = null;
    },

    confirmOk() {
      const el = this.$refs.confirmModalEl;
      if (el.__modal) el.__modal.hide();
      if (this.confirmResolve) this.confirmResolve(true);
      this.confirmResolve = null;
    },

    openEditModel(model = {}) {
      return new Promise(resolve => {
        this.editResolve = resolve;
        this.editModel = { ...model };

        const el = this.$refs.editModalEl;
        const modal = new bootstrap.Modal(el);
        el.__modal = modal;
        modal.show();
      });
    },

    hideEdit() {
      const el = this.$refs.editModalEl;
      if (el.__modal) el.__modal.hide();
      if (this.editResolve) this.editResolve(null);
      this.editResolve = null;
    },

    saveEdit() {
      const el = this.$refs.editModalEl;
      if (el.__modal) el.__modal.hide();
      if (this.editResolve) this.editResolve({ ...this.editModel });
      this.editResolve = null;
    }
  }
};
</script>

<style>
.toast-container .toast {
  min-width: 240px;
  font-size: 0.95rem;
}
</style>
