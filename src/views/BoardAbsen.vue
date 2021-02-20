<template>
  <div><br>
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
    <v-card-title>
    <!-- <v-select
      v-model="enabled"
      :items="slots"
      label="Slot"
      clearable
    ></v-select> -->
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="absen"
      :search="username"
      :hide-default-header="hideHeaders"
      :show-select="showSelect"
      :loading="isLoading"
      item-key="name"
      class="elevation-1" disa
    >
      <template
        v-if="isEnabled('body')"
        v-slot:body="{ items }"
      >
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Username</th>
            <th>Jam Absen</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.id_absen }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.lat }}</td>
            <td>{{ item.lng }}</td>
            <td>
              <v-icon small class="mr-2" @click="editAbsen(item.id)">mdi-google-maps</v-icon>
              <v-icon small @click="deleteAbsen(item.id), snackbar = true">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    </v-card>
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
    data () {
      return {
        multiLine: true,
        snackbar: false,
        text: `Data Berhasil di Hapus`,
        absen: [],
        currentAbsen: null,
        currentIndex: -1,
        username: "",
        enabled: 'body',
        search: null,
        slots: [
          'body'
        ],
        headers: [
          { text: "No", align: "No", sortable: false, value: "id" },
          { text: "ID Siswa", align: "id", sortable: false, value: "id_absen" },
          { text: "Username", value: "username", sortable: false },
          { text: "Jam Absen", value: "createdAt", sortable: false },
          { text: "Latitude", value: "lat", sortable: false },
          { text: "Longitude", value: "lng", sortable: false }
        ],
      }
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
    },
    isEnabled (slot) {
        return this.enabled === slot
    }
  },
  computed: {
    showSelect () {
      return this.isEnabled('header.data-table-select') || this.isEnabled('item.data-table-select')
    },
    hideHeaders () {
      return !this.showSelect
    },
    isLoading () {
      return this.isEnabled('progress')
    }
  },

  watch: {
    enabled (slot) {
      if (slot === 'body') {
        this.items = []
      } else if (slot === 'body') {
        this.search = '...'
      } else {
        this.search = null
        this.items = [] 
      }
    }
  },
  mounted() {
  this.retrieveAbsen();
  }
}
</script>
