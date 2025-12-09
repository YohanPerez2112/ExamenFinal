<template>
  <div class="d-flex">
    <div class="d-none d-md-block">
      <SidebarComponent />
    </div>

    <div class="flex-grow-1 d-flex flex-column min-vh-100">
      <NavbarComponent :userName="userName" @logout="logout" />
      <main class="p-3 flex-grow-1">
        <router-view />
      </main>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "DashboardView",
  components: { SidebarComponent, NavbarComponent, FooterComponent },

  data() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return {
      user,
      userName: user ? (user.name || user.username) : "Invitado"
    };
  },

  created() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    }
  }
};
</script>
