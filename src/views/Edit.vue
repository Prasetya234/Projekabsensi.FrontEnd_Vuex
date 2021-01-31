<template>
<div class="jumbotron">
  <div v-if="currentUser" class="edit-form py-3">
    <p class="headline">Edit Pengguna</p>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentUser.username"
        :rules="[(v) => !!v || 'Username is required']"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        required disabled
      ></v-text-field>

      <v-text-field
        v-model="currentUser.nama"
        :rules="[(v) => !!v || 'Nama is required']"
        label="Nama"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.nisn"
        :rules="[(v) => !!v || 'Nisn is required']"
        label="Nisn"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.kelas"
        :rules="[(v) => !!v || 'Kelas is required']"
        label="Kelas"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.alamat"
        :rules="[(v) => !!v || 'Alamat is required']"
        label="Alamat"
        required
      ></v-text-field>
      <v-divider class="my-5"></v-divider>

      <!-- <v-btn v-if="currentUser.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Publish
      </v-btn> -->

      <v-btn color="error" small class="mr-2" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateUser">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
    <button class="glow-on-hover" >
        <router-link to="/admin" class="nav-link text-white"><b>Back to Home</b></router-link>
    </button>
  </div>

  <div v-else>
    <p class="text-center">Loading...Please wait</p>
  </div>
</div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "edit",
  data() {
    return {
      currentUser: null,
      message: "",
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentUser.id,
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: this.currentUser.password,
        nama: this.currentUser.nama,
        nisn: this.currentUser.nisn,
        kelas: this.currentUser.kelas,
        alamat: this.currentUser.alamat
      };

      UserDataService.update(this.currentUser.id, data)
        .then((response) => {
          this.currentUser.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = "The user was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "admin" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
};
</script>

<style scoped>
.jumbotron {  
      background-image: linear-gradient(to right, rgb(218, 102, 66), rgb(88, 214, 187), rgb(172, 121, 206), rgb(185, 107, 185));
    width: 100%;
    height: 750px;
    background-size: cover;
}
.glow-on-hover {
    width: 160px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: rgb(57, 185, 78)
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(115, 168, 46);
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
</style>
