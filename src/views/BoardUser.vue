<template>
  <div class="template">
    <div class="container"><br/><br/><br/>
      <header class="jumbotron text-center">
        <h2><b>Data Berhasil Dihapus!</b></h2>
      </header><br/><br/>
      <button class="glow-on-hover">
        <router-link to="/admin" class="nav-link text-black"> Back to Home</router-link>
      </button><br/><br/><br/><br/><br/>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style scoped>
.jumbotron {
    position: relative;
    background-image: linear-gradient(to right, red, orange, yellow, green, violet);
    width: 100%;
    height: 100%;
}

.template {
  background-color: orange;
}

.glow-on-hover {
    width: 1100px;
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
    color: rgb(0, 0, 0)
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
    background: rgb(6, 8, 8);
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