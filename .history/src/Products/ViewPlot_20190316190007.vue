<template>
    <div class="plot">
        <transition v-if="interested" name="modal">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        <h3>Please Enter Your Details</h3>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <form @submit.prevent="SubmitRequest()">
                            <input type="text" v-model="name" placeholder="Name">
                            <input v-if="!user" type="text" v-model="email" placeholder="Email">
                            <input type="text" v-model="phone" placeholder="Phone Number">
                            <button @click="SubmitRequest()">Submit</button>
                        </form>
                        <button @click="interested=!interested">Cancel</button>
                    </slot>
                </div>
                </div>
            </div>
            </div>
        </transition>
        <div class="interested">
            <h3>Interested? </h3>
            <input type="text" placeholder="Your Name">
            <input type="text" placeholder="Mobile Number">
            <input type="text" placeholder="E-Mail ID">
            <button>Submit</button>
        </div>
        <h1 v-if="noPlot">Sorry This URL is Invalid. Or the Plot You are searching for could have been deleted</h1>
        <div v-else class="details">
            <h1>{{plot.Name}}</h1>
                <img v-if="!(DisplayImages[0]=='')" :src="DisplayImages[0]" alt="">
                <!-- <agile v-if="!(DisplayImages[0]=='') && imageReady" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile> -->
                <img v-else src="../assets/noImage.png" alt="">
                <h2>Gallery</h2>
                <div class="flex">
                    <agile v-if="!(DisplayImages[0]=='') && imageReady" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                        <div v-for="(image, index) in DisplayImages" :key="index" class="slide">
                            <img v-if="!(image==undefined)" :src="image">
                        </div>
                    </agile>
                    <agile v-if="!(plot.DevelopmentImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                        <div v-for="(image, index) in plot.DevelopmentImages" :key="index" class="slide">
                            <img v-if="!(image==undefined)" :src="image">
                        </div>
                    </agile>
                </div>
            <div class="details">
                    <h3>Length x Breadth: <span>{{plot.Length}} x {{plot.Breadth}}</span></h3>
                    <h3>Location: <span>{{plot.Location}}</span></h3>
                    <h3>Facing: <span>{{plot.Facing}}</span></h3>
                    <h3>Price: <span>{{plot.Price}}</span></h3>
                    <h3>Negotiable?: <span>{{plot.Negotiable}}</span></h3>
                    <h3>Rate per Sq.Yard: <span>{{plot.Rate}}</span></h3>
                    <h3>Scope for Hike: <span>{{plot.Scope}}</span></h3>
                    <h3>Amenities</h3>
                    <p v-for="(ames,index) in plot.Amenities" :key="index">{{index+1}}. {{ames.ames}}</p>
                    <h4>Development Details</h4>
                    <p v-for="(ames,index) in plot.DevelopmentDetails" :key="index">{{index+1}}. {{ames.value}}</p>
            </div>
            <button class="interestedButton" @click="interested =!interested">Interested</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            id: this.$route.params.id,
            plot: '',
            noPlot: false,
            DisplayImages: '',
            imageReady: false,
            interested: false,
            name: '',
            email: '',
            phone: '',
            user: false,
        }
    },
    mounted(){var vm = this;
        if(firebase.auth().currentUser){
            vm.user = true;
        }else{
            vm.user = false;
        }
        firebase.firestore().collection('Admin').doc("Posts").collection('Plots').doc(this.id).get().then((doc)=>{
            if(doc.exists){
                vm.plot = doc.data();
                vm.DisplayImages = doc.data().DisplayImages;
                vm.imageReady = true;
                console.log(doc.data())
            }else{
                vm.noPlot = true;
            }
        })
    },
    methods: {
        SubmitRequest(){
            var vm = this;
            var mail;
            if(vm.user){
                mail = firebase.auth().currentUser.email;
            }else{
                mail = vm.email
            }
            firebase.firestore().collection("Interested").doc('UserPosts').collection('Plots').add({
                from: {
                    name: vm.name,
                    email: mail,
                    phone: vm.phone
                },
                to: {
                    plot: vm.plot
                }
            }).then(()=>{
                vm.$toast("Request Submitted. You Will Hear from us shortly!")
                vm.interested = !vm.interested;
            }).catch((e)=>{
                vm.$toast(e.message);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    @media screen and (min-width: 320px) {
        .plot{
            .details{
                h1{
                    margin: 1em;
                    text-align: center;
                }
                img{
                    height: 40vh;
                    width: 100%;
                }
                .flex{
                    .data{
                        h4{
                            margin: 0.6em;
                            span{
                                font-weight: 100;
                                margin-left: 0.7em;
                            }
                        }
                        p{
                            margin: 0.6em;
                        }
                    }
                }
                button{
                    border: none;
                    background: #42b983;
                    color:white;
                    width: 100%;
                    padding: 0.7em;
                    cursor: pointer;
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        .plot{
            .details{
                img{
                    height: 60vh;
                }
                .flex{
                    padding: 1em;
                    display: flex;
                    justify-content: space-between;
                }
                button{
                    width: 30%;
                    margin: 1em;
                    padding: 1em;
                }
            }
        }
    }

    @media screen and (min-width: 1000px) {
       .plot{
            .details{

                h2{
                    text-align: center;
                    margin: 1em;
                }

                .details{
                    padding: 2em;

                    h3{
                        margin: 1.5em;

                        span{
                            font-weight: 100;
                        }
                    }

                    p{
                        margin: 1.5em;
                        font-weight: 100
                    }
                    h4{
                        margin: 1.5em;
                    }
                }
                img{
                    height: 80vh;
                }
                .flex{
                    .data{
                        h4{
                            font-size: 1.4em;
                        }
                    }
                }
                button{
                    padding: 1em;
                    width: 20%;
                    margin: 1em;
                }
            }
            .interested{
                top: 35%;
                padding: 2em;
                width: 13vw;
                background: white;
                border-radius: 8px;
                position: absolute;
                left: 80%;
                input{
                    padding: 1.3em;
                    width: 10vw;
                    margin: 0.7em;
                    border: none;
                    border-bottom: 2px solid lightblue;
                }
                button{
                    width: 12vw;
                    margin: 0.7em;
                    background: #42b983;
                    color: white;
                    padding: 1em;
                }
            }
       }
    }


    //  Modal CSS

    .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  input{
      padding: 0.7em;
      display: block;
      width: 80%;
      margin: 0.6em;
  }
  button{
      border: none;
      background: #42b983;
      color: white;
      padding: 0.7em;
      width: 80%;
      cursor: pointer;
      margin: 0.6em;
  }
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
