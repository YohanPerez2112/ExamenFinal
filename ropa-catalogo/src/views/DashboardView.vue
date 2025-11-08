<template>
  <div class="d-flex" style="min-height:100vh;">
    <div class="d-none d-md-block" style="width: 260px;">
      <SidebarComponent />
    </div>

    <div class="flex-grow-1 d-flex flex-column">
      <NavbarComponent :userName="userName" @logout="logout" />
      <main class="p-3">
        <router-view />
      </main>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: { SidebarComponent, NavbarComponent, FooterComponent },
  data(){
    return { userName: 'Invitado' }
  },
  created(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(!user){
      this.$router.push('/login')
    } else {
      this.userName = user.name || user.username
    }
  },
  methods:{
    logout(){
      sessionStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
