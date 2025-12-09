<template>
  <div id="app">
    <router-view />

 
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:9999">
      <div
        id="appToast"
        class="toast text-white bg-primary shadow-lg rounded-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-body fw-semibold" id="toastMessage">Notificación</div>
      </div>
    </div>

   
    <div class="modal fade" tabindex="-1" ref="confirmModalEl">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header bg-warning">
            <h5 class="modal-title text-dark">Confirmar acción</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <p ref="confirmText">¿Está seguro?</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="hideConfirm">Cancelar</button>
            <button class="btn btn-danger" @click="confirmOk">Aceptar</button>
          </div>

        </div>
      </div>
    </div>

    
    <div class="modal fade" tabindex="-1" ref="editModalEl">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">Editar producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">

            <label class="form-label">Nombre</label>
            <input v-model="editModel.title" class="form-control mb-2"/>

            <label class="form-label">Precio</label>
            <input v-model.number="editModel.price" type="number" class="form-control mb-2"/>

            <label class="form-label">Descripción</label>
            <textarea v-model="editModel.description" class="form-control mb-2"></textarea>

            <label class="form-label">Imagen URL</label>
            <input v-model="editModel.image" class="form-control mb-2"/>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="hideEdit">Cancelar</button>
            <button class="btn btn-primary" @click="saveEdit">Guardar cambios</button>
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
      currentUser: JSON.parse(sessionStorage.getItem("user")) || null,

      confirmResolve: null,
      editResolve: null,

      editModel: {
        id: null,
        title: "",
        price: 0,
        description: "",
        image: "",
        category: ""
      }
    };
  },

  methods: {
  
    showToast(msg, color = "primary") {
      const toastEl = document.getElementById("appToast");
      const body = document.getElementById("toastMessage");

      toastEl.className = `toast text-white bg-${color} shadow-lg rounded-3`;
      body.innerText = msg;

      new bootstrap.Toast(toastEl).show();
    },

    
    confirm(message = "¿Confirmar acción?") {
      return new Promise(resolve => {
        this.confirmResolve = resolve;
        this.$refs.confirmText.innerText = message;

        const modal = new bootstrap.Modal(this.$refs.confirmModalEl);
        this.$refs.confirmModalEl.__modal = modal;
        modal.show();
      });
    },

    hideConfirm() {
      const el = this.$refs.confirmModalEl;
      el.__modal.hide();
      this.confirmResolve(false);
      this.confirmResolve = null;
    },

    confirmOk() {
      const el = this.$refs.confirmModalEl;
      el.__modal.hide();
      this.confirmResolve(true);
      this.confirmResolve = null;
    },

   
    openEditModel(product = {}) {
      return new Promise(resolve => {
        this.editResolve = resolve;
        this.editModel = { ...product };

        const modal = new bootstrap.Modal(this.$refs.editModalEl);
        this.$refs.editModalEl.__modal = modal;
        modal.show();
      });
    },

    hideEdit() {
      const el = this.$refs.editModalEl;
      el.__modal.hide();
      this.editResolve(null);
      this.editResolve = null;
    },

    saveEdit() {
      const el = this.$refs.editModalEl;
      el.__modal.hide();
      this.editResolve({ ...this.editModel });
      this.editResolve = null;
    }
  }
};
</script>

<style>
.toast-container .toast {
  min-width: 240px;
}
</style>
