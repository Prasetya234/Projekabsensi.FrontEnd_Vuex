<template>
<!-- <div>
  <v-card>
    <v-card-title>
      Data Absen
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
      :items="absen"
      :search="username"
      :loading="myloadingvariable" loading-text="Laden... even geduld aub"
    >
     <template v-slot:[`item.createdAt`]="{ item }">
      <v-chip
        :color="getColor(item.createdAt)"
        dark
      >
        {{ item.createdAt }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editAbsen(item.id)">mdi-google-maps</v-icon>
      <v-icon small @click="deleteAbsen(item.id), snackbar = true">mdi-delete</v-icon>
    </template>
    </v-data-table>
  </v-card> -->
  <div><br/> 
    <div class="container">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search Username" v-model="username"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchUsername"
          >
            Search
          </button>
        </div>
      </div>
      </div>
      <b-card>
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

      <!-- <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col> -->
      <br>

        <b-table responsive autoWidth hover :items="absen" :fields="fields" :per-page="perPage">
          <!-- <template slot="actions" slot-scope="item">
            <button class="btn btn-dark" @click="deleteAbsen" :ref="'btn' + item.index">Update</button>
          </template> -->
          <template v-slot:cell(actions)="id">
            <b-button size="sm" @click="editAbsen(id), snackbar = false" class="mr-1" variant="primary">
              Location
            </b-button>
            <b-button size="sm" @click="deleteAbsen(id), snackbar = true" class="mr-1" variant="danger">
              Delete
            </b-button>
          </template>
        </b-table>
      </b-card>
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
  </div><br>
</div>
</template>

<script>
import AbsenDataService from "../services/AbsenDataService";

export default {
  name: "absen",
  data() {
    return {
      // myloadingvariable: false,
      multiLine: true,
      snackbar: false,
      text: `Data Berhasil di Hapus`,
      absen: [],
      // headers: [
      //   { text: "No", align: "id", sortable: false, value: "id" },
      //   { text: "ID Siswa", align: "id", sortable: false, value: "id_absen" },
      //   { text: "Username", value: "username", sortable: false },
      //   { text: "Jam Absen", value: "createdAt", sortable: false },
      //   { text: "Latitude", value: "lat", sortable: false },
      //   { text: "Longitude", value: "lng", sortable: false },
      //   { text: "Actions", value: "actions", sortable: false }
      // ], 
      // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'id',
            label: 'No',
            sortable: false
          },
          {
            key: 'id_absen',
            label: 'ID',
            
            sortable: false
          },
          {
            key: 'username',
            sortable: false
          },
          {
            key: 'createdAt',
            label: 'Jam Absen',
            sortable: false ,
            // Variant applies to the whole column, including the header and footer
            variant: 'primary'
          },  
          {
            key: 'lat',
            label: 'Latitude',
            sortable: false
          },
          {
            key: 'lng',
            label: 'Longitude',
            sortable: false
          },
          {
            key: 'actions',
            label: 'Actions',
            sortable: false
          }
        ],
        totalRows: true,
        currentPage: true,
        perPage: 10,
        pageOptions: [5, 10, 15, { value: 100, text: "Tampilkan semua" }],
        // absen: [
        //   { isActive: true, text: "No", align: "id" },
        //   { isActive: false, text: "ID", align: "id_absen" },
        //   { isActive: false, text: "username", value: "username" },
        //   { isActive: false, text: "createdAt", value: "createdAt" },
        //   { isActive: false, text: "lat", value: "lat" },
        //   { isActive: false, text: "lng", value: "lng" },   
        //   { isActive: false, text: "Actions", value: "actions" }
        // ],
      currentAbsen: null,
      currentIndex: -1,
      username: ""
    };
  },
  methods: {
    // getColor (createdAt) {
    //     if (createdAt < 12) return 'red'
    //     else if (createdAt > 8) return 'orange'
    //     else return 'green'
    //   },
   retrieveAbsen() {
      AbsenDataService.getAll()
        .then(response => {
          this.absen = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAbsen();
      this.currentAbsen = null;
      this.currentIndex = -1;
    },

    editAbsen(id) {
      this.$router.push({ name: "check", params: { id: id } });
    },

    // setActiveAbsen(absen, index) {
    //   this.currentAbsen = absen;
    //   this.currentIndex = index;
    // },

    removeAllAbsen() {
      AbsenDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchUsername() {
      AbsenDataService.findByUsername(this.username)
        .then(response => {
          this.absen = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteAbsen(id) {
      AbsenDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
  this.retrieveAbsen();
  }
};
</script>

<style scoped>
.jumbotron {
  background-image: linear-gradient(#db6b67, #edb132);
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