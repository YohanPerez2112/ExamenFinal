<template>
  <div 
    class="alert d-flex align-items-center shadow-lg fade show"
    :class="`alert-${type}`"
    role="alert"
    v-if="message"
  >
    <i class="bi" :class="icon"></i>
    <span class="ms-2">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "success": return "bi-check-circle-fill";
        case "danger": return "bi-exclamation-octagon-fill";
        case "warning": return "bi-exclamation-triangle-fill";
        default: return "bi-info-circle-fill";
      }
    }
  }
};
</script>

<style scoped>
.alert {
  font-size: 1rem;
  padding: 12px 18px;
  border-radius: 12px;
}
</style>
