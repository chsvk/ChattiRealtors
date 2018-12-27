<template>
    <div class="auth">
        <div class="absolute">
            <div class="infomatic">
                <h2>Chatti Realtors</h2>
                <h5>The Right Place to Invest</h5>
            </div>
            <div class="rest">
            <div class="nav">
                <button v-bind:class="{active: toggleForms}" @click="toggleForms = true">Login</button>
                <button v-bind:class="{active: !toggleForms}" @click="toggleForms = false">Register</button>
            </div>
            <form v-if="toggleForms" @submit.prevent="login()">
                <input type="email" placeholder="Enter Email ID" v-model="loginUserName">
                <input type="password" placeholder="Enter password" v-model="loginPassword">
                <button>Login</button>
                <p @click="forgotPassword()">Forgot Password?</p>
            </form>
            <form v-else @submit.prevent="register()">
                <input type="email" placeholder="Enter Email ID" v-model="regUserName">
                <input type="password" placeholder="Enter Password" v-model="regPassword">
                <input type="password" placeholder="Re-Enter Password" v-model="regRePassword">
                <button>Register</button>
            </form>
            </div>
        </div>
        <h4>Our Support Team is just a call away:</h4>
        <p>+91 - 9849008487</p>
        <p>+91 - 9246558487</p>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
import {mapState} from 'vuex'
export default {
    router,
    data(){
        return{
            loginUserName: '',
            loginPassword: '',
            regUserName: '',
            regPassword: '',
            regRePassword: '',
            backgroundColor: '#B3E5FC',
            toggleForms: true,
        }
    },
    mounted(){
        this.MainNavState['Authentication'] = true;
    },
    beforeDestroy(){
        this.MainNavState['Authentication'] = false;
    },
    computed:{
        ...mapState(['MainNavState'])
    },
    methods: {
        login: function(){var vm = this;
            firebase.auth().signInWithEmailAndPassword(this.loginUserName, this.loginPassword).then((user)=>{
                router.push('/user')
            }).catch((e)=>{
                console.log(e.message);
            })
        },
        register:function(){
            var vm = this;
            if(this.regPassword.length <8){
                alert("Password Length Should be minumum 8 Characters");
            }else{
                if(this.regPassword == this.regRePassword){
                    firebase.auth().createUserWithEmailAndPassword(vm.regUserName, vm.regPassword).then((user)=>{
                        
                    }).catch((e)=>{
                        vm.$toast(e.message);
                    })
                }
            }
        },
        forgotPassword: function(){var vm = this;
            router.push({
                name: 'forgot'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .auth{
        width: 100%;
        height: 100%;
        button{
            cursor: pointer;
        }
    }

    @media screen and (min-width: 320px ) {
        .auth{
            height: 100vh;
            text-align: center;
            .infomatic{
                display: none;
            }
            .nav{
                margin-top: 3%;
                display: flex;
                .active{
                    border-bottom: 2px solid black;
                }
                button{
                    background: none;
                    width: 100%;
                    text-align: center;
                    border: none;
                    padding: 1em;
                    font-size: 0.8em;
                }
            }
            form{
                background: #00BCD4;
                padding-top: 10%;
                input{
                    display: block;
                    width: 90%;
                    padding: 0.7em;
                    margin: 0.6em;
                }
                button{
                    width: 50%;
                    text-align: center;
                    font-size: 0.8em;
                    margin-top: 5%;
                    margin-bottom: 2%;
                    background: white;
                    border: 2px solid white;
                    padding: 0.7em;
                    transition: 350ms;
                }
                p{
                    text-decoration: underline;
                    margin-bottom: 4%;
                }
            }

            h4{
                margin-top: 8%;
            }
            p{
                margin-top: 6%;
            }
        }
    }

    @media screen and (min-width: 700px) {
        .auth{
            background: #B3E5FC;
            .absolute{
                background: white;
                height: 70vh;
                margin-left: 4.5%;
                margin-top: 5%;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                display: flex;
                justify-content: space-between;
                border-radius: 8px;
                width: 90vw;
                .infomatic{
                    display: block;
                    width: 70%;
                    margin: none;
                    background: url('../assets/loginBack.jpeg');
                    background-repeat: no-repeat;
                    background-size: cover;
                    h2{
                        font-size: 2em;
                        margin-top: 25%;
                    }
                    h5{
                        font-size: 1.3em;
                    }
                }
                .rest{
                    width: 80%;
                    .nav{

                    }
                    form{
                        margin-left: 20%;
                        width: 60%;
                        background: white;
                        button:hover{
                            background: #00BCD4;
                            color: white;
                        }

                        input{
                            border: 1px solid black;
                            background: none;
                            padding: 1.4em;
                            margin-top: 3em;
                            width: 85%;
                            font-size: 0.8em;
                        }

                        button{
                            border: 1px solid black;
                            padding: 1.3em 0;
                        }
                        p{
                            display: block;
                            cursor: pointer;
                        }
                    }
                }
            }
            .absolute:hover{
                  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
            }
            h4{
                display: none;
            }
            p{
                display: none;
            }
        }
    }

   

</style>

