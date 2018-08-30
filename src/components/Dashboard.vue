<template>
    <div class="dash">
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
                              <li v-else><button @click="dashboardNav"><a class="active">DashBoard</a></button></li>
                              <li><button @click="contact"><a >Contact Us</a></button></li>
                              <li v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>
            <div class="secondSection">
            <section class="adminNav">
                <ul>
                    <li class="inactive">Hello {{UserName}}</li>
                    <li @click="view" v-if="detailsExist">View Plots</li>
                    <li @click="addNew" v-if="detailsExist">Add New Plot</li>
                    <li href="/dashboard/account">Account</li>
                </ul>
            </section>
            <router-view></router-view>
            </div>
    </div>
</template>

<script>
import {db} from '../main.js'
import firebase from 'firebase'
import router from '../router.js'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
export default {
    router,
    data(){
        return{
            userData: '',
            Nouser: true,
            UserName: '',
            detailsExist: false,
        }
    },
    mounted(){
        this.check();
    },
    methods: {
        check: function(){
            var vm = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    vm.Nouser = false;
                    console.log(user.uid);
                    db.collection("Users").doc(user.uid).get().then(function(doc) {
                        if (doc.exists) {
                            if((doc.data().name == undefined) || (doc.data().phone == undefined)){
                                router.push('/dashboard/details');
                            }else{
                                db.collection("Users").doc(user.uid).get().then(function(doc){
                                    if(doc.exists) {
                                        vm.detailsExist = true;
                                        vm.UserName = doc.data().name.split(" ")[0];
                                    }
                                })
                                // router.push('/dashboard/space');
                            }
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                } else {
                    vm.Nouser = true;
                    router.push('/');
                }
                });
        },
        logout: function(){
            var vm = this;
            firebase.auth().signOut().then(function() {
                vm.$toast("You Have Been Signed Out");
                console.log('Signed Out');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        },
        addNew: function(){
            router.push('/dashboard/new');
        },
        view: function(){
            router.push('/dashboard');
        },
        contact: function(){
            router.push('/contact');
        },
        productsNav: function(){
            router.push('/products');
        },
        dashboardNav: function(){
            router.push('/dashboard/space');
        }
    }
}
</script>

<style lang="scss" scoped>

    nav{
        position: relative;
        background: #282828;

        li:first-child{
            margin-top: 1.5em;
        }
        li:last-child{
            margin-top: 1.5em;
        }
    }

    .adminNav{
        background: #212121;
        width: 200px;
        height: 80vh;

        li{
            padding: 2em;
            color: white;
            cursor: pointer;
        }
    }

    .secondSection{
        width: 100%;
        display: grid;
        grid-template-columns: 200px auto;
    }
    .inactive{
        cursor: text;
    }

</style>
