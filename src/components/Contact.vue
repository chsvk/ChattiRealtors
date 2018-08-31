<template>
    <div class="contact">
        <nav>
                  <input type="checkbox" id="nav" class="hidden">
                  <label for="nav" class="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                  </label>
                  <div class="logo">
                        <a href="/">Chatti Realtors</a>
                  </div>
                  <div class="nav-wrapper">
                        <ul>
                              <li><a href="/">Home</a></li>
                              <li><button @click="productsNav"><a>Products</a></button></li>
                              <li v-if="Nouser"><button @click="sendToLogin"><a>Login/Register</a></button></li>
                              <li v-else><button @click="dashboardNav"><a>DashBoard</a></button></li>
                              <li><button @click="contact"><a class="active">Contact Us</a></button></li>
                              <li v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>
            <div class="contac">
              <h4>Call us At:</h4>
              <p>+91 9849008487</p>
            </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router.js'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    data(){
        return{
          dropzoneOptions: {
            url: 'https://httpbin.org/post',
            Nouser: true,
            dropOptions: {
            maxFilesize: 4, // MB
            maxFiles: 4,
            chunking: true,
            chunkSize: 500, // Bytes
            thumbnailWidth: 150, // px
            thumbnailHeight: 150,
            addRemoveLinks: true
          }
          },
          Nouser: true

        }
    },
    components: {
     vueDropzone: vue2Dropzone
    },
    mounted(){
    this.checkUser();
  },
  methods:{
    checkUser: function(){
      var vm = this;
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user exist');
        vm.Nouser = false; 
          } else {
            vm.Nouser = true;
        console.log('No user');
      }
    });
    },
    logout: function(){
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    },
    sendToLogin: function(){
    router.push('/login');
  },
  contact: function(){
    router.push('/contact');
  },
  productsNav: function(){
    router.push('/products');
  },
  dashboardNav: function(){
    router.push('/dashboard');
  },
  }
}
</script>

<style lang="scss" scoped>

    nav{
      position: relative;
        background: #282828;
    }

    nav ul li:first-child {
      margin-top: 1.5em;
      // margin-left: 48px;
}

nav ul li:last-child {
      margin-top: 1.5em;
      // margin-left: 48px;
}

.contac{
  position: absolute;
  left: 30%;
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
    transition: 0.3s;
    border-radius: 15px;
    padding: 2em;
    width: 300px;
    height: 300px;

    h4{
      margin: 3em;
    }

    p{
      margin: 2em;
    }
}
</style>
