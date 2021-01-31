<template>
  <div>
    <div class="list row ">
      <div class="col-md-8">
      <div class="container"><br/>
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
      </div>
    </div>
    <v-card class="mx-auto" tile>
    <v-card-title>DATA ABSEN</v-card-title>
      <v-data-table 
       :headers="headers"
          item-key="absen"
         
          loading-text="Loading... Please wait"
            :items="absen"
            :items-per-page="5"
            class="elevation-1"
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
  name: "absen",
  data() {
    return {
      multiLine: true,
      snackbar: false,
      text: `Data Berhasil di Hapus`,
      absen: [],
      headers: [
        { text: "ID", align: "id", sortable: false, value: "id" },
        { text: "Username", value: "username", sortable: false },
        { text: "Jam Absen", value: "createdAt", sortable: false },
        { text: "Latitude", value: "lat", sortable: false },
        { text: "longitude", value: "lng", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ], 
      currentAbsen: null,
      currentIndex: -1,
      username: ""
    };
  },
  methods: {
    getColor (createdAt) {
        if (createdAt > 12) return 'red'
        else if (createdAt > 200) return 'orange'
        else return 'green'
      },
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

    setActiveAbsen(absen, index) {
      this.currentAbsen = absen;
      this.currentIndex = index;
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