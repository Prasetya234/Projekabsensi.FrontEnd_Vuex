
<template>
  <div v-if="currentUser" class="edit-form">
    <h4 class="text-center">Data Absen</h4>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="useername"
          v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentUser.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password"
          v-model="currentUser.password"
        />
      </div>
      <div class="form-group">
        <label for="nama">Nama</label>
        <input type="text" class="form-control" id="nama"
          v-model="currentUser.nama"
        />
      <div class="form-group">
        <label for="nisn">Nisn</label>
        <input type="text" class="form-control" id="nisn"
          v-model="currentUser.nisn"
        />
      </div>
      </div>
            <div class="form-group">
        <label for="kelas">Kelas</label>
        <input type="text" class="form-control" id="kelas"
          v-model="currentUser.kelas"
        />
      </div>
            <div class="form-group">
        <label for="alamat">Alamat</label>
        <input type="text" class="form-control" id="alamat"
          v-model="currentUser.alamat"
        />
      </div>

    </form>

    <button class="btn btn-danger mr-2"
      @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success"
      @click="updateUser"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
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
        .then(response => {
          this.currentUser.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'ANDA TELAH BERHASIL MENG-UPDATE DATA!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "user" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
