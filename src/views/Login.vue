<template>
  <!-- <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-outline-info btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-info" role="alert"><center>Maaf, email atau password salah</center></div>
        </div>
      </form>
    </div>
  </div> -->
  <div class="container">
  <div class="form-style-10">
    <h1>Login <span>Sign up and tell us what you think of the site!</span></h1>
    <form name="form" @submit.prevent="handleLogin">
      <div class="section"><span>1</span>Username</div>
        <div class="inner-wrap">
          <label for="username"><input v-model="user.username" v-validate="'required'" type="text" class="form-control" name="username" placeholder="username"/></label>
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
          </div>
          <div class="section"><span>2</span>Passwords</div>
          <div class="inner-wrap">
            <label for="password"><input  v-model="user.password" v-validate="'required'" type="password" class="form-control" name="password"  placeholder="password" /></label>
            <div v-if="errors.has('password')" class="alert alert-danger" role="alert" >Password is required!</div>
          </div>
          <div class="button-section">
            <button class="btn btn-outline-info" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
            <span class="privacy-policy">
              You agree to our Terms and Policy. 
            </span>
          </div><br>
          <div class="form-group">
            <div v-if="message" class="alert alert-info" role="alert"><center>{{message}}</center></div>
          </div>
    </form>
  </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
/* label {
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
} */
.form-style-10{
width:100%;
padding:30px;
margin:40px auto;
background: #FFF;
border-radius: 10px;
-webkit-border-radius:10px;
-moz-border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
}
.form-style-10 .inner-wrap{
padding: 30px;
background: #F8F8F8;
border-radius: 6px;
margin-bottom: 15px;
}
.form-style-10 h1{
background: #2A88AD;
padding: 20px 30px 15px 30px;
margin: -30px -30px 30px -30px;
border-radius: 10px 10px 0 0;
-webkit-border-radius: 10px 10px 0 0;
-moz-border-radius: 10px 10px 0 0;
color: #fff;
text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
font: normal 30px 'Bitter', serif;
-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
border: 1px solid #257C9E;
}
.form-style-10 h1 > span{
display: block;
margin-top: 2px;
font: 13px Arial, Helvetica, sans-serif;
}
.form-style-10 label{
display: block;
font: 13px Arial, Helvetica, sans-serif;
color: #888;
margin-bottom: 15px;
}
.form-style-10 input[type="text"],
.form-style-10 input[type="date"],
.form-style-10 input[type="datetime"],
.form-style-10 input[type="email"],
.form-style-10 input[type="number"],
.form-style-10 input[type="search"],
.form-style-10 input[type="time"],
.form-style-10 input[type="url"],
.form-style-10 input[type="password"],
.form-style-10 textarea,
.form-style-10 select {
display: block;
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
width: 100%;
padding: 8px;
border-radius: 6px;
-webkit-border-radius:6px;
-moz-border-radius:6px;
border: 2px solid #fff;
box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
-moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
-webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
}

.form-style-10 .section{
font: normal 20px 'Bitter', serif;
color: #2A88AD;
margin-bottom: 5px;
}
.form-style-10 .section span {
background: #2A88AD;
padding: 5px 10px 5px 10px;
position: absolute;
border-radius: 50%;
-webkit-border-radius: 50%;
-moz-border-radius: 50%;
border: 4px solid #fff;
font-size: 14px;
margin-left: -45px;
color: #fff;
margin-top: -3px;
}
.form-style-10 input[type="button"], 
.form-style-10 input[type="submit"]{
background: #2A88AD;
padding: 8px 20px 8px 20px;
border-radius: 5px;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
color: #fff;
text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
font: normal 30px 'Bitter', serif;
-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
border: 1px solid #257C9E;
font-size: 15px;
}
.form-style-10 input[type="button"]:hover, 
.form-style-10 input[type="submit"]:hover{
background: #2A6881;
-moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
-webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.form-style-10 .privacy-policy{
float: right;
width: 250px;
font: 12px Arial, Helvetica, sans-serif;
color: #4D4D4D;
margin-top: 10px;
text-align: right;
}

</style>