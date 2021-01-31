<template>
<div><br/>
  <div class="container">
    <div class="list row ">
      <div class="col-sm-8"><br/>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search Username"
            v-model="username"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchUsername"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
      <v-card-actions>
        <button class="glow-on-hover" >
          <router-link to="/register" class="nav-link text-white"><b>Tambah siswa</b></router-link>
        </button>
      </v-card-actions>
      </div>
    </div>
  </div>
    <v-card-title>DATA SISWA</v-card-title>
      <v-data-table 
          :headers="headers"
          item-key="not"
          
          loading-text="Loading... Please wait"
            :items="user"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item.id), snackbar = true">mdi-delete</v-icon>
          </template>
      </v-data-table><br>
  <div class="text-center">
  <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div><br/>
</div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "admin",
  data() {
    return {
      multiLine: true,
      snackbar: false,
      text: `Data Berhasil di Hapus`,
      user: [],
      headers: [
        { text: "ID", align: "id", sortable: false, value: "id" },
        { text: "Username", value: "username", sortable: false },
        { text: "Email", value: "email", sortable: false },
        // { text: "Password", value: "password", sortable: false },
        { text: "Created At", value: "createdAt", sortable: false },
        { text: "Updated At", value: "updatedAt", sortable: false },
        { text: "Nama", value: "nama", sortable: false },
        { text: "NISN", value: "nisn", sortable: false },
        { text: "Kelas", value: "kelas", sortable: false },
        { text: "Alamat", value: "alamat", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ], 
      currentUser: null,
      currentIndex: -1,
      username: ""
    };
  },
  methods: {
    retrieveUser() {
      UserDataService.getAll()
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
     editUser(id) {
      this.$router.push({ name: "edit", params: { id: id } });
    },
    refreshList() {
      this.retrieveUser();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },

     removeAllUser() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    searchUsername() {
      UserDataService.findByUsername(this.username)
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
   deleteUser(id) {
      UserDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveUser();
  }
};
</script>

<style scoped>
.ka {
  background-image: linear-gradient(#db6b67, #edb132);
}

.glow-on-hover {
    width: 100%;
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