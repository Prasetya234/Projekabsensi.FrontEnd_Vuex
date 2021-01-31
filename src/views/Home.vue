<template>
  <div>
    <Header/>
    <div class="jumbotron">
      <div class="container">
      <div class="card ">  
        <img src="https://3.bp.blogspot.com/-eOnrtqzanFg/XLRcqNC3iGI/AAAAAAAAGh8/i3l2J9aP19gYkRs5s2eqOepsLRJ9RjdxgCLcBGAs/s1600/Pengertian+Teknologi+Informasi.jpg" height="400px" class="card-img-top" alt="...">

    <div class="card-body"  id="Home"><br>
      <!-- <div class="card-title"><h2>{{ content }}</h2></div>
      <p class="card-text"><b>{{ mk }}</b></p><br> -->
      <ul>
          <li><b>Leader :</b> Prasetya Dhnay Putra (front-end / back-end) &nbsp;<button @click="uji" class="btn btn-success" style="height: 35px;">Profile</button></li><br>
          <ul><b>Moderator :</b> Rafa Lailatul Zahra (front-end) &nbsp;<!--<button  class="btn btn-success" style="height: 35px;">Profile</button>--></ul><br>
          <ul><b>Member :</b> Ilham Santoso (front-end)</ul><br><hr>
          <ul><b>Sekolah:</b> Smk Bina Nusantara Semarang</ul>
          <ul><b>Waktu Pembuatan:</b> 15-12-2020 s.d 18-01-2021</ul>
          <ul><b>Deskripsi:</b> Untuk mempermudah absen harian tanpa harus tatap muka</ul>
        </ul>
      </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
export default {
  name: "home",
  components: {
    Header
  },
  // mounted() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.watchPosition(position => {
  //       const location = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       this.$socket.emit("ping", location);
  //     });
  //   }
  // },
  methods: {
    uji() {
      this.$router.push('/uji');
    // },
    // uji2() {
    //   this.$router.push('/home2');
    // }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>