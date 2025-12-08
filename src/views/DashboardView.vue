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
  components: { SidebarComponent, NavbarComponent, FooterComponent },
  data() {
    return { userName: "Invitado" };
  },
  created() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) return this.$router.push("/login");
    this.userName = user.name || user.username;
  },
  methods: {
    logout() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.min-vh-100 { min-height: 100vh; }
</style>
