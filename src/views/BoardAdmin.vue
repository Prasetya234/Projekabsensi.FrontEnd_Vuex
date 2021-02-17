<template>
<!-- <div>
    <v-card>
    <v-card-title>
      Data Siswa
      <v-spacer></v-spacer>
      <v-text-field
        v-model="username"
        append-icon="mdi-magnify"
        label="Search Username"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="user"
      :search="username"
    >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
      <v-icon small @click="deleteUser(item.id), snackbar = true">mdi-delete</v-icon>
    </template>
    </v-data-table>
  </v-card><br>
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
</div> -->
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
        <button class="glow-on-hover" @click="$router.push('register')">Tambah siswa</button>
      </v-card-actions>
      </div>
    </div>
  </div><br>
      <b-card>
         <b-row>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
       </b-row><br><br>
        <b-table responsive autoWidth hover :items="user" :fields="fields" :per-page="perPage" :current-page="currentPage">
          <template v-slot:cell(actions)="id">
            <b-button size="sm" @click="editUser(id), snackbar = false" class="mr-1" variant="primary">
              Edit
            </b-button>
            <b-button size="sm" @click="deleteUser(id), snackbar = true" class="mr-1" variant="danger">
              Delete
            </b-button>
          </template>
        </b-table>
      </b-card>
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
      // headers: [
      //   { text: "ID", align: "id", sortable: false, value: "id" },
      //   { text: "Username", value: "username", sortable: false },
      //   { text: "Email", value: "email", sortable: false },
      //   // { text: "Password", value: "password", sortable: false },
      //   { text: "Created At", value: "createdAt", sortable: false },
      //   { text: "Updated At", value: "updatedAt", sortable: false },
      //   { text: "Nama", value: "nama", sortable: false },
      //   { text: "NISN", value: "nisn", sortable: false },
      //   { text: "Kelas", value: "kelas", sortable: false },
      //   { text: "Alamat", value: "alamat", sortable: false },
      //   { text: "Actions", value: "actions", sortable: false },
      // ], 
       fields: [
          {
            key: 'id',
            label: 'ID',
            sortable: false
          },
          {
            key: 'username',
            label: 'Username',
            
            sortable: false
          },
          {
            key: 'email',
            sortable: false
          },
          {
            key: 'password',
            sortable: false
          },
          {
            key: 'createdAt',
            sortable: false ,
            // Variant applies to the whole column, including the header and footer
            variant: 'primary'
          },
          {
            key: 'updatedAt',
            sortable: false ,
            // Variant applies to the whole column, including the header and footer
            variant: 'primary'
          },  
          {
            key: 'nama',
            sortable: false
          },
          {
            key: 'nisn',
            sortable: false
          },
          {
            key: 'kelas',
            sortable: false
          },
          {
            key: 'alamat',
            sortable: false
          },
          {
            key: 'actions',
            sortable: false
          }
        ],
        totalRows: 500,
        currentPage: 500,
        perPage: 10,
        pageOptions: [5, 10, 15, { value: 100, text: "Tapilkan semua" }],
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
    // Set the initial number of items
      this.totalRows = this.fields.length
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