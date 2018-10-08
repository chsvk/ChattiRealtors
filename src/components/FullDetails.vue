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
                              <li class="log" v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>
                    <button class="deleteButton" @click="deletePost" v-if="fromDashBoard">Delete Post</button>
            <div class="details">
                <h3>{{plotDetails.Heading}}</h3><br>
                <div>
                <agile :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                <div v-for="image in plotDetails.DisplayImages" class="slide">
                    <img :src="image" alt='No Image Available'>
                </div>
                </agile>
                </div>
                <div class="details">
                <p><span>Location: </span> {{plotDetails.Location}}</p><br>
                <p><span>Bus Route: </span> {{plotDetails.BusRoute}}</p><br>
                <p><span>Facing:</span> {{plotDetails.Facing}}</p><br>
                <p><span>Price: </span> {{plotDetails.Price}}</p><br>
                <p><span>Rate per Sq.Yard: </span> {{plotDetails.Rate}}</p><br>
                <p><span>Length x Breadth:</span> {{plotDetails.Length}} x {{plotDetails.Breadth}} </p><br>
                <p><span>Hike: </span> {{plotDetails.Hike}}</p><br>
                <p><span>Negotiable?: </span> {{plotDetails.Negotioable}}</p><br>
                </div>
                </div>
                <div class="note">
                    <div class="notInfo">
                         <h3>More Details</h3>
                        <p>Developments Around the area: {{plotDetails.Developments}}</p>
                        <h3>Amenities</h3>
                        <p>{{plotDetails.Amenities}}</p>
                        <h3>Note:</h3>
                        <p>{{plotDetails.Note}}</p>
                    </div>
                    <div class="devImages">
                        <agile :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                        <div v-for="image in plotDetails.DevelopmentImages" class="slide">
                        <img :src="image" alt='No Image Available'>
                    </div>
                    </agile>
                    </div>
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
        this.checkUser();
        if(this.plotDetails == null){
            router.push('/dashboard');
        }
        console.log(this.plotDetails);
    },
    methods: {
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
            var API_KEY = "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"
            var user = firebase.auth().currentUser;
             var sg = require('@sendgrid/mail');
                sg.setApiKey(process.env.API_KEY);
                const msg = {
                    to: "chsvk21@gmail.com",
                    from: "info@chattiRealtors.com",
                    Subject:  " Is Interested in a plot",
                    text: " This is interesging"
                }
                sg.send(msg);
                alert('Hell Yeal');
            if(user){
               
            }else{

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
        .log{
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

        span{
            font-weight: bold;
        }

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
       display: grid;
       grid-template-columns: 50% auto;
       padding: 2em;

       .notInfo{
           h3{
                margin-top: 0.6em;
           }
           p{
               line-height: 40px;
           }
       }

       .slide{
           height: 400px;
           width: auto;
       }
    }
</style>
