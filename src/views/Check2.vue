<template>
<div>
  <div class="jumbotron">
    <div v-if="!submitted">
      <div style="max-width: 100%; margin: 0 auto; height: 100%; display: flex; align-items: center; justify-content: space-between" >
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.currentUser.username"
          name="username" disabled
        />
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.coordinates.lat"
          name="lat" disabled
        />
        <input
          type="text"
          class="form-control"
          id="input"
          required
          v-model="this.coordinates.lng"
          name="lng" disabled
        />

      </div> 

      <button v-on:click="greet" @click="saveAbsen" class="btn btn-success btn-block" style="width: 100%; height: 400px; cursor: pointer; background: transparent; border: 1px solid #91C9FF; outline: none; transition: 1s ease-in-out; responsive">Click to Absens</button>
    </div>

    <div v-else>
      <button class="btn btn-success btn-block" href @click.prevent="logOut"  style="width: 100%; height: 400px; cursor: pointer; background: transparent; border: 1px solid #91C9FF; outline: none; transition: 1s ease-in-out; ">
        <font color="black">
          <font-awesome-icon icon="sign-out-alt" /> Keluar
        </font>
      </button><br/>
    </div><br/>
  </div>
</div>
</template>

<script>
import AbsenDataService from "../services/AbsenDataService";

export default {
  name: "check2",
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
        absen: {
          id: null,
          username: "",
          lat: "",
          lng: ""
        },
      submitted: false
    };
  },
  created() {
      // get user's coordinates from browser request
      this.$getLocation({})
      .then(coordinates => {
        this.coordinates = coordinates;
      })
      .catch(error => alert(error));
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    saveAbsen() {
      var data = {
        username: this.currentUser.username,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng

      };

      AbsenDataService.create(data)
        .then(response => {
          this.absen.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    greet: function (event) {
      // `this` di dalam metode merujuk ke Vue instance
      alert('kamu telah berhasil absen ' + this.currentUser.username + ' !')
    // `event` adalah bawaan DOM event
      if (event) {
        alert('Smk Bina Nusantara Semarang')
      }
    },
    newAbsen() {
      this.submitted = false;
      this.absen = {};
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* .submit-form {
  max-width: 300px;
  margin: auto;
} */

.jumbotron {
   
    background-image: linear-gradient(#c5e6e3, #53b4ec);
    width: 100%;
    height: 550px;
    background-size: cover;
}

.ka {
  height: 300px;  
}

#input{
 background: rgba(23, 20, 20, 0.52);
 font-size:12pt;
 font-family:arial;
 color:rgb(105, 209, 212);
 width:100%;
 height:40px;
 padding:5px 5px 5px 10px;
 margin:3px;
 border-radius:3px;
 border:none;
}
#input[type="submit"]{
 background:rgba(31, 15, 2, 0.78);
 color:#fff;
 cursor:pointer;
 
}
#input:hover, #input:focus{
 background:rgba(97, 52, 13, 0.55);
 outline-style:none;
}
#input[type="submit"]:hover, #input[type="submit"]:focus{
 background:rgba(31, 15, 2, 0.78);
}

</style>