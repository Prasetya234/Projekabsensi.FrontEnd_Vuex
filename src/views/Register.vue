<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>

          <div class="form-group">
            <label for="nisn">Nisn</label>
            <input
              v-model="user.nisn"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="nisn"
            />
            <div
              v-if="submitted && errors.has('nisn')"
              class="alert-danger"
            >{{errors.first('nisn')}}</div>
          </div>

          <div class="form-group">
            <label for="nama">Nama</label>
            <input
              v-model="user.nama"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="nama"
            />
            <div
              v-if="submitted && errors.has('nama')"
              class="alert-danger"
            >{{errors.first('nama')}}</div>
          </div>

          <div class="form-group">
            <label for="kelas">Kelas</label>
            <input
              v-model="user.kelas"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="kelas"
            />
            <div
              v-if="submitted && errors.has('kelas')"
              class="alert-danger"
            >{{errors.first('kelas')}}</div>
          </div>

          <div class="form-group">
            <label for="alamat">Alamat</label>
            <input
              v-model="user.alamat"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="alamat"
            />
            <div
              v-if="submitted && errors.has('alamat')"
              class="alert-danger"
            >{{errors.first('alamat')}}</div>
          </div>

          <div class="form-group">
            <button class="btn btn-outline-info btn-block">Add</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}
      <button class="glow-on-hover" >
          <router-link to="/admin" class="nav-link text-white"><b>Kembali</b></router-link>
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '','','',''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/register');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-image: linear-gradient(#80b7e4, #78cee4);
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 0px 5px 5px rgba(223, 128, 128, 0.3);
  -webkit-box-shadow: 0px 5px 5px rgba(223, 128, 128, 0.3);
  box-shadow: 0px 5px 5px rgba(223, 128, 128, 0.3);
}


.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
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