<template>
    <div class="forgot">
        <h3>Please Enter Your Email associated with your account</h3>
        <form @submit.prevent="forgotPassword()">
            <input type="text" placeholder="Email Address" v-model="Email">
            <button>Send Email</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
export default {
    router,
    data(){
        return{
            Email: ''
        }
    },
    methods: {
        forgotPassword: function(){var vm = this;
            firebase.auth().sendPasswordResetEmail(this.Email).then(function() {
                vm.$toast("Email Sent!");
                router.push('/login');
            }).catch(function(error) {
                vm.$toast(error.message);
            });
        }
    }
}
</script>

<style lang="scss" scoped>

    .forgot{
        h3{
            margin: 1em;
        }
        input{
            padding: 0.7em;
            width: 30%;
            margin: 1em;
        }
        button{
            border: none;
            background: none;
            padding: 0.7em;
            text-align: center;
            font-weight: bold;
            background: white;
            border: 1px solid black;
            transition: 350ms;
        }
        button:hover{
            background: #00BCD4;
            color: white;    
        }
    }
</style>
