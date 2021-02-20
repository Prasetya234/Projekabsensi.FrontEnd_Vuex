<template>
  <div id="app">
    <v-app>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-nav-item @click="home" class="nav-link">
          <font color="white">
            <font-awesome-icon icon="home" /> Home
          </font>
        </b-nav-item>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <b-nav-item @click="admin" class="nav-link">
                <font-awesome-icon icon="address-card" /> Data Siswa
              </b-nav-item>
            </b-nav-item>

            <b-nav-item v-if="showAdminBoard">
              <b-nav-item @click="absen" class="nav-link">
                <font-awesome-icon icon="address-book" /> Data Absen
              </b-nav-item>
            </b-nav-item>
            <b-nav-item v-if="showUserBoard">
              <b-nav-item @click="check2" class="nav-link">
              <font-awesome-icon icon="portrait" /> Absen
              </b-nav-item>
            </b-nav-item>
            <b-nav-item v-if="showModeratorBoard">
              <b-nav-item @click="check2" class="nav-link">
              <font-awesome-icon icon="portrait" /> Absen
              </b-nav-item>
            </b-nav-item>
          </b-navbar-nav>
          
          <ul class="nav navbar-nav">
            <font color="white">
              <div id="MyClock" class="clock"></div>
            </font>
          </ul>

          <!-- Right aligned nav items -->

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!currentUser">
              <b-nav-item @click="login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Login
              </b-nav-item>
            </b-nav-item>
            
            <b-nav-item v-if="currentUser">
              <b-nav-item @click="profile" class="nav-link">
                <font-awesome-icon icon="user" /> {{ currentUser.username }}
              </b-nav-item>
            </b-nav-item>
            
              <b-nav-item v-if="showAdminBoard">
                <b-nav-item href @click.prevent="logOut" class="nav-link">
                    <font-awesome-icon icon="sign-out-alt" /> LogOut
                </b-nav-item>
              </b-nav-item>
    
              <b-nav-item v-if="showUserBoard">
                <b-nav-item href @click.prevent="logOut" class="nav-link">
                    <font-awesome-icon icon="sign-out-alt" /> LogOut
                </b-nav-item>
              </b-nav-item>
            
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      
      <div>
        <router-view />
      </div>

      <p class="text-center">&copy;Smk Bina Nusantara 2020-2021</p>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_USER');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    check2() {
      this.$router.push('/check2');
    },
    admin() {
      this.$router.push('/admin');
    },
    absen() {
      this.$router.push('/absen');
    },
    profile() {
      this.$router.push('/profile');
    },
    home() {
      this.$router.push('/home');
    },
    login() {
      this.$router.push('/login');
    }
  },
  mounted() {
    function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";

    if(h >= 12){
      h = h-12;
      session = "PM";
    }

    if(h == 0){
      h=12;
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClock").innerHTML = time;
    document.getElementById("MyClock").innerHTML = time;

    setTimeout(showTime, 1000);
  }

  showTime();
  }
};
</script>

<style scoped>
  
</style>
