<template>
    <div class="products">
        <nav>
                  <input type="checkbox" id="nav" class="hidden">
                  <label for="nav" class="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                  </label>
                  <div class="logo">
                        <a>Chatti Realtors</a>
                  </div>
                  <div class="nav-wrapper">
                        <ul>
                              <li><a href="/">Home</a></li>
                              <li><button @click="productsNav"><a class="active">Products</a></button></li>
                              <li v-if="Nouser"><button @click="sendToLogin"><a>Login/Register</a></button></li>
                              <li v-else><button @click="dashboardNav"><a>DashBoard</a></button></li>
                              <li><button @click="contact"><a>Contact Us</a></button></li>
                              <li v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>

            <h3>Recommended Plots</h3><hr>

    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router.js'
import { functions } from 'firebase';
export default {
    router,
    data(){
        return{
            adminPlots: [],
            userPlots: []
        }
    },
    firestore(){

    },
    methods: {
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
    }
    }
}
</script>

<style lang="scss" scoped>
    nav{
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
</style>
