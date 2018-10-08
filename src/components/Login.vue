<template>
<div class="setup">
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
                        </ul>
                  </div>
            </nav>
    <div class="login">
        <div class="info">
            <h1>Join A Community of Investors!</h1>
        </div>
        <div class="forms">
            <div v-if="formOne" class="formm">
            <h3>Login</h3>
            <input v-model="username" type="text" placeholder="Email Address">
            <input v-model="password" type="password" placeholder="Enter Password">
            <button v-on:click="login">Login</button>
            <button v-on:click="toggleForm">SignUp</button>
            </div>
            <div v-else class="formm">
            <h3>SignUp</h3>
            <input v-model="susername" type="text" placeholder="Email Address">
            <input v-model="spassword" type="password" placeholder="Enter Password">
            <input v-model="rpassword" type="password" placeholder="Re-Enter Password">
            <button v-on:click="register">SignUp</button>
            <button v-on:click="toggleForm">Login</button>
            </div>
            <p>{{error}}</p>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
import router from '../router.js'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

export default {
    router,
    data(){
        return{
            username: '',
            password: '',
            rpassword: '',
            susername: '',
            spassword: '',
            signup: false,
            error: '',
            formOne: true
        }
    },
    methods: {
        login: function(){
            var vm = this;
           firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(function(user){
                firebase.auth().onAuthStateChanged(function(user) {
                if (user && user.emailVerified) {
                    localStorage.setItem('uid', user.uid);
                    vm.$toast("Login Succesful.");
                    router.push('/dashboard');
                    console.log("user");
                } else {
                    // No user is signed in.
                    vm.$toast('Please Verify Email To Proceed')
                }
                });
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // vm.error = errorMessage;
            vm.$toast(errorMessage);
            // ...
            });
        },
        register: function(){
            var vm = this;
            if(this.spassword==this.rpassword){
            firebase.auth().createUserWithEmailAndPassword(this.susername, this.spassword).then(function(e){
                firebase.auth().onAuthStateChanged(function(user) {
                    var user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function() {
                    vm.$toast('Please Verify your Email To Continue')
                    }).catch(function(error) {
                    // An error happened.
                    });

                    db.collection("Users").doc(user.uid).set({
                        email: vm.susername,
                        name: '',
                        phone: '',
                    });
                    vm.toggleForm =!vm.toggleForm;
                if (user) {
                    localStorage.setItem('uid', user.uid);
                    // router.push('/dashboard');
                } else {
                    vm.$toast("Registration Succesful. Please Sign IN");
                    // vm.error = 'Succesfully Registered Please Sign In';
                }
                });
            })
            .catch(function(error) {
            // Handle Errors here.
            vm.error = error.message;
            var errorCode = error.code;
            var errorMessage = error.message;
            vm.$toast(errorMessage);
            // ...
            });

        }
    },
    toggleForm: function(){
        this.formOne = !this.formOne;
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
    }
    },
    toast: function(){
        this.$toast('hello');
    }
    }
</script>

<style lang="scss" scoped>

nav{
        background: #282828;
    }

    nav ul li:first-child {
      padding: 1em;
      // margin-left: 48px;
}
 nav ul li:last-child {
    //   margin-top: 1.5em;
      // margin-left: 48px;
}

.setup{
    display: grid;
    grid-template-columns: 50% auto;
}

// .login{
//     width: 80%;
//     margin: 3em;

//     .titleImage{
//         background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/images/login.jpg');
//         background-position: center;
//         background-size: cover;
//         height: 180px;
//         width: 100%;
//         border-radius: 10px;
//     }
//     .titleImage2{
//         background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/images/signup.jpg');
//         background-position: center;
//         background-size: cover;
//         height: 180px;
//         width: 100%;
//         border-radius: 10px;
//     }
//     h1{
//         // text-align: center;
//         top: 0;
//         position: relative;
//         color: white;
//         top:30%;
//         left: 40%;
//     }

//     .formm{
//         padding: 1em;
//         width: 40%;
//         margin: 0 auto;
//         input{
//             margin: 1em;
//             padding: 1em;
//             width: 100%;
//             text-decoration: none;
//             border-radius: 10px;
//             border: none;
//         } 
//         input:focus{
//             outline: none;
//         }
//         button{
//             margin: 0.8em;
//             width: 100%;
//             padding: 1em;
//             margin-left: 1em;
//             background: #231f20;
//             color: white;
//             border: none;
//             border-radius: 7px;
//         }
//     }
// }

// .bts{
//     width: 100%;
//     display: grid;
//     grid-template-columns: 50% auto;
// }

.login{
    margin-top: 15%;
    width: 100vw;
    height: 80vh;
    overflow: hidden;
    display: flex;

    .info{
        margin-top: 6%;
        margin-left: 5%;
        width: 55%;
        font-size: 3em;
        overflow-y: hidden;
    }

    .forms{
        overflow-y: hidden;
        width: 45%;
        margin-top: 4%;
        .formm{
            padding: 1em;
            width: 40%;
            margin: 0 auto;

            h3{
                text-align: center;
                font-size: 2em;
                margin-bottom: 1em;
            }

            input{
                margin: 1em;
                padding: 1em 0.8em;
                width: 100%;
                text-decoration: none;
                border-radius: 10px;
                border: none;
            } 
            input:focus{
                outline: none;
            }
            button{
                margin-top: 1em;
                margin: 0.8em;
                width: 100%;
                padding: 1.4em;
                margin-left: 1em;
                background: #231f20;
                color: white;
                border: none;
                border-radius: 7px;
                cursor: pointer;
            }
        }
    }
}

</style>
