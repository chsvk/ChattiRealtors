<template>
<div class="setup">
    <div class="login">
        <div class="titleImage">
            <h1>Login</h1>
        </div>
        <div class="formm">
            <input v-model="username" type="text" placeholder="Username">
            <input v-model="password" type="password" placeholder="Password">
            <button v-on:click="login">Login</button>
            </div>
            <p>Login Failed</p>
        </div>
    <div class="login">
    <div class="titleImage2">
        <h1>SignUp</h1>
    </div>
        <div class="formm">
            <input v-model="susername" type="text" placeholder="Username">
            <input v-model="spassword" type="password" placeholder="Password">
            <input v-model="rpassword" type="password" placeholder="Repeat Password">
            <div class="bts">
            <button>SignUp</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
    data(){
        return{
            username: '',
            password: '',
            rpassword: '',
            susername: '',
            spassword: '',
            signup: false,
        }
    },
    methods: {
        login: function(){
           firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(function(user){
                firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // router.push('/home');
                } else {
                    // No user is signed in.
                }
                });
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error');
            // ...
            });
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
