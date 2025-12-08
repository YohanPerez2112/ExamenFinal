<template>
  <aside class="sidebar p-3 bg-white h-100 shadow-sm">
    <h6 class="mb-3">Menú</h6>
    <ul class="nav flex-column">
      <li class="nav-item mb-1">
        <router-link class="nav-link d-flex align-items-center" to="/dashboard/productos">
          <i class="bi bi-box-seam me-2"></i> Productos
        </router-link>
      </li>
    </ul>
    <hr />
    <small class="text-muted">Ropa-Catalogo © 2025</small>
  </aside>
</template>

<script>
export default { name: "SidebarComponent" };
</script>

<style scoped>
.sidebar { min-height: 100vh; border-right: 1px solid #e9ecef; width: 240px; }
.nav-link { color: #333; padding: 8px 6px; border-radius: 8px; transition: background .12s; }
.nav-link:hover { background: #f8f9fa; text-decoration: none; }
</style>
