<template>
    <div class="fullDetails">
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
                              <li><button @click="contact"><a >Contact Us</a></button></li>
                              <li v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>
                    <button class="deleteButton" @click="deletePost" v-if="fromDashBoard">Delete Post</button>
            <div class="details">
                <div class="DisplayImages">
                <agile :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                <div v-for="image in plotDetails.DisplayImages" class="slide">
                    <img :src="image" alt='No Image Available'>
                </div>
                </agile>
                </div>
                <div class="details">
                <h3>{{plotDetails.Heading}}</h3><br>
                <p>Location: {{plotDetails.Location}}</p><br>
                <p>Facing: {{plotDetails.Facing}}</p><br>
                <p>Price: {{plotDetails.Price}}</p><br>
                <p>Rate per Sq.Yard: {{plotDetails.Rate}}</p><br>
                <p>Length x Breadth: {{plotDetails.Length}} x {{plotDetails.Breadth}} </p><br>
                </div>
                </div>
                <div class="note">
                    <h3>More Details</h3>
                    <p>Developments Around the area: {{plotDetails.DevelopmentDetails}}</p>
                </div>
                <button class="deleteButton" @click="interested(plot)" v-if="!fromDashBoard">Interested</button>
    </div>
</template>

<script>
import router from '../router'
import firebase from 'firebase'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import {db} from '../main'
export default {
    router,
    props: ['plotDetails', 'fromDashBoard'],
    data(){
        return{
            Nouser: true
        }
    },
    mounted(){
        if(localStorage.getItem('uid')!=null){
            this.Nouser = false;
        }
        if(this.plotDetails == null){
            router.push('/dashboard');
        }
        console.log(this.plotDetails);
    },
    methods: {
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
            router.push('/dashboard');
        },
        sendToLogin: function(){
            router.push('/login');
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
        deletePost: function(){
            var vm = this;
            db.collection('Users').doc(localStorage.getItem('uid')).collection("Posts").doc(this.plotDetails.id).delete().then(function(){
                vm.$toast('Post Deleted Succesfully');
                router.push('/dashboard');
            }).catch(function(error){
                vm.$toast(error.message);
            })
        },
        interested: function(plot){
            var vm = this;
            var x;
            if(plot.UserID==null){
                x = "From DashBoard"
            }
            else{
                x = plot.UserID;
            }
            db.collection('Interested').add({
                from: localStorage.getItem('uid'),
                to: plot.id,
                PlotUserID: x
            }).then(function(e){
                vm.$toast('A Executive shall contact you shortly');
            }).catch(function(e){
                vm.$toast(e.message);
            })
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

    .deleteButton{
        margin: 3em 3em 2em 3em;
        padding: 1.5em;
        background: #282828;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    .details{
        display: grid;
        grid-template-columns: 60% auto;
        margin: 3em;

        img{
            height: 450px;
            width: 100%;
        }

        p{
            margin: 0.8em;
        }

        h3{
            margin: 0.8em;
        }
    }

    .note{
        margin: 0 3em 2em 3em;
    }
</style>
