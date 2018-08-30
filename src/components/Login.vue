<template>
<div class="setup">
    <div class="login">
        <div class="titleImage">
            <h1>Login</h1>
        </div>
        <div class="formm">
            <input v-model="username" type="text" placeholder="Email Address">
            <input v-model="password" type="password" placeholder="Password">
            <button v-on:click="login">Login</button>
            </div>
            <p>{{error}}</p>
        </div>
    <div class="login">
    <div class="titleImage2">
        <h1>SignUp</h1>
    </div>
        <div class="formm">
            <input v-model="susername" type="text" placeholder="Email Address">
            <input v-model="spassword" type="password" placeholder="Password">
            <input v-model="rpassword" type="password" placeholder="Repeat Password">
            <div class="bts">
            <button @click="register">SignUp</button>
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
        }
    },
    methods: {
        login: function(){
            var vm = this;
           firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(function(user){
                firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    localStorage.setItem('uid', user.uid);
                    vm.$toast("Login Succesful.");
                    router.push('/dashboard');
                    console.log("user");
                } else {
                    // No user is signed in.
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
                    db.collection("Users").doc(user.uid).set({
                        email: vm.susername,
                        name: '',
                        phone: '',
                    });
                if (user) {
                    localStorage.setItem('uid', user.uid);
                    router.push('/dashboard');
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
    toast: function(){
        this.$toast('hello');
    }
    }
}
</script>

<style lang="scss" scoped>

.setup{
    display: grid;
    grid-template-columns: 50% auto;
}

.login{
    width: 80%;
    margin: 3em;

    .titleImage{
        background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/images/login.jpg');
        background-position: center;
        background-size: cover;
        height: 180px;
        width: 100%;
        border-radius: 10px;
    }
    .titleImage2{
        background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/images/signup.jpg');
        background-position: center;
        background-size: cover;
        height: 180px;
        width: 100%;
        border-radius: 10px;
    }
    h1{
        // text-align: center;
        top: 0;
        position: relative;
        color: white;
        top:30%;
        left: 40%;
    }

    .formm{
        padding: 1em;
        width: 40%;
        margin: 0 auto;
        input{
            margin: 1em;
            padding: 1em;
            width: 100%;
            text-decoration: none;
            border-radius: 10px;
            border: none;
        } 
        input:focus{
            outline: none;
        }
        button{
            margin: 0.8em;
            width: 100%;
            padding: 1em;
            margin-left: 1em;
            background: #231f20;
            color: white;
            border: none;
            border-radius: 7px;
        }
    }
}

.bts{
    width: 100%;
    display: grid;
    grid-template-columns: 50% auto;
}

</style>
