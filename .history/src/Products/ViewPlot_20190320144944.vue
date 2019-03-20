<template>
    <div class="plot">
        <a class="whatsapp" href="https://wa.me/919849008487"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></a>
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
                        <form @submit.prevent.once="SubmitRequest()">
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
            <input type="text" placeholder="Your Name" v-model="name">
            <input type="text" placeholder="Mobile Number" v-model="phone">
            <input type="text" placeholder="E-Mail ID" v-model="email">
            <button v-if="!buttonClicked" @click.once="SubmitRequest()">Submit</button>
            <p style="padding: 1em" v-if="buttonClicked">{{buttonMessage}}</p>
        </div>
        <h3 style="text-align:center" v-if="noPlot">Sorry This URL is Invalid. Or the Plot You are searching for could have been deleted</h3>
        <div v-else class="details">
            <h1 class="plotHeading">{{plot.Name}}</h1>
                <img class="mainFrame" v-if="!(DisplayImages[0]=='')" :src="DisplayImages[0]" alt="">
                <img class="mainFrame" v-else src="../assets/noImage.png" alt="">
                <h3 class="galleryHead">Gallery</h3>
                <div @click="show()" class="galleryMinimum">
                    <img :src="image" v-for="image in DisplayImages" alt="">
                </div>
                <!-- <slider style="width:100vh" class="sliderItem" ref="slider" :options="options">
                    <!-- 直接使用slideritem slot -->
                    <!-- <slideritem v-for="item in DisplayImages">
                        <img :src="item" alt="">
                    </slideritem> -->
                    <!-- 设置loading,可自定义 -->
                    <!-- <div slot="loading">loading...</div>
                </slider>  -->
                <VueEasyLightbox
                    :visible="visible"
                    :imgs="DisplayImages"
                    @hide="handleHide()"
                ></VueEasyLightbox>
            <div class="flex">
                <div class="details">
                    <div class="desc">
                        <h3>DESCRIPTION: <span>{{plot.Description}}</span></h3>
                    </div>
                    <div class="subOne flex">
                        <div>
                            <h3>Length x Breadth: <span>{{plot.Length}} x {{plot.Breadth}}</span></h3>
                            <h3>Location: <span>{{plot.Location}}</span></h3>
                            <h3>Facing: <span>{{plot.Facing}}</span></h3>
                             <h3>Price: <span>{{plot.Price}}</span></h3>
                            <h3>Negotiable?: <span>{{plot.Negotiable}}</span></h3>
                            <h3>Rate per Sq.Yard: <span>{{plot.Rate}}</span></h3>
                            <h3>Scope for Hike: <span>{{plot.Scope}}</span></h3>
                        </div>
                        <img v-if="DisplayImages[3]" class="imageDisplay" :src="DisplayImages[3]" alt="">
                        <img v-if="DisplayImages[4]" class="imageDisplay" :src="DisplayImages[4]" alt="">
                        </div>
                    <div class="sectionOne ">
                        
                    </div>
                    <div class="sectionTwo flex">
                        <div class="subOne">
                             <h3>Venture Features</h3>
                            <p v-for="(ames,index) in plot.Amenities" :key="index">{{index+1}}. {{ames.ames}}</p>
                        </div>
                        <div class="subTwo">
                            <h3>Govt. Institutes near Venture</h3>
                            <p v-for="(ames,index) in plot.DevelopmentDetails" :key="index">{{index+1}}. {{ames.value}}</p>
                        </div>
                        <div class="subTwo">
                            <h3>Upcoming Projects Near Venture</h3>
                            <p v-for="(ames,index) in plot.upcomingProjects" :key="index">{{index+1}}. {{ames.value}}</p>
                        </div>
                    </div>
                        <h3>Note: <span>{{plot.Note}}</span></h3>
                </div>
                <!-- <div class="new">
                    <h3 class="galleryText">Gallery</h3>
                    <div class="gallery">
                        <img v-for="(image, index) in DisplayImages" :src="image" :key="index" alt="Chatti Realtors Image">
                    </div>
                </div> -->
            </div>
            <div class="seperate">
                <button v-if="!buttonClicked" class="interestedButton" @click="interested =!interested">Interested</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import { Siema } from 'v-siema';
import { slider, slideritem } from 'vue-concise-slider'// import slider components
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
    components: {
        Siema,
        slider,
        slideritem,
        VueEasyLightbox
    },
    data(){
        return{
            id: this.$route.params.id,
            plot: '',
            noPlot: false,
            DisplayImages: '',
            DevelopmentImages: '',
            imageReady: false,
            interested: false,
            name: '',
            email: '',
            phone: '',
            user: false,
            visible: false,
             options: {
                currentPage: 0,
                thresholdDistance:500,
                thresholdTime:100,
                autoplay:2000,
                loop:true,
                direction:'horizontal',
                loopedSlides:1,
                slidesToScroll:1,
                timingFunction: 'ease',
                speed: 500
                },
            buttonMessage: 'Thanks for Submitting!',
            buttonClicked: false,
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
                vm.DevelopmentImages = doc.data().DevelopmentImages;
                vm.DevelopmentImages.splice(0,1);
                console.log(vm.DevelopmentImages)
                vm.imageReady = true;
                console.log(doc.data())
            }else{
                vm.noPlot = true;
            }
        })
    },

    methods: {
        show() {
            this.visible = true
        },
        handleHide() {
            this.visible = false
        },
        SubmitRequest(){
            var vm = this;
            vm.buttonClicked = true;
            var mail;
            if(vm.user){
                mail = firebase.auth().currentUser.email;
            }else{
                mail = vm.email
            }
            if((vm.name == "") || (vm.phone == "")){
                vm.buttonClicked = false;
                alert("Please Fill Required Details")
            }else{
                firebase.firestore().collection("Interested").doc('Posts').collection('Plots').add({
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
                    vm.name = "";
                    vm.email = '';
                    vm.phone = "";
                    if(vm.interested){
                        vm.interested = !vm.interested;
                    }
                }).catch((e)=>{
                    vm.buttonClicked = false;
                    vm.$toast(e.message);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    @media screen and (min-width: 320px) {
        .plot{

            .imageDisplay{
                display: none;
            }
            .whatsapp{
                position: absolute;
                right: 0;
                background: white;
                border-radius: 8px;
                padding: 1em;
                top: 30%;
                position: fixed;
            }
            .interested{
                    display: none;
                }
            .details{
                .plotHeading{
                    font-size: 1em;
                }
                .galleryHead{
                    text-align: center;
                    margin: 1em;
                }
                .galleryMinimum{
                    display: grid;
                    grid-template-columns: repeat(4,1fr);
                    margin: 1em;
                    img{
                        height: 100px;
                        width: 100px;
                        margin: 1em;
                        
                    }
                }
                h1{
                    margin: 1em;
                    text-align: center;
                }
                img{
                    height: 40vh;
                    width: 100%;
                }
                .gallery{
                    display: grid;
                    grid-template-columns: repeat(2,1fr);
                    img{
                        height: 300px;
                        width: 300px;
                        padding: 1em;
                    }
                }
                .galleryText{
                    position:relative;
                    text-align: center;
                    margin: 1em;
                }
                .flex{
                    .data{
                        h4{
                            margin: 0.6em;
                            span{
                                font-weight: 300;
                                margin-left: 0.7em;
                            }
                        }
                        p{
                            margin: 0.6em;
                        }
                    }

                    .carousel{
                        padding: 1em;
                        height: 100%;
                        width: 50vw;
                    }
                }
                button{
                    border: none;
                    background: #42b983;
                    color:white;
                    width: 100%;
                    padding: 0.7em;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1.2em;
                }

                .details{
                    padding: 1em;
                    h3{
                        margin: 1em;
                        font-size: 1.2em;
                        span{
                            font-weight: 100;
                            font-size: 0.9em;
                            line-height: 40px;
                        }
                    }
                    h4{
                        margin: 1em;
                    }
                    p{
                        margin: 1.5em;
                    }
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
           .plotHeading{
               position: absolute;
               color: white;
               top: 40%;
               background: rgba(0, 0, 0, .5);
               width: 45vw;
               padding: 1em;
           }
           .interested{
               display: block;
           }

           .mainFrame{
                opacity: 1;
           }
            .details{
                .sectionOne{
                    width: 80vw;
                }
                .sectionTwo{
                    .subTwo{
                        width: 35%;
                    }
                }
                .plotHeading{
                    font-size: 1.5em;
                }
                .galleryMinimum{
                    display: flex;
                    margin: 1em;
                    margin-left: 10%;
                    img{
                        height: 100px;
                        width: 100px;
                        margin: 1em;

                    }
                }


                h2{
                    text-align: center;
                    margin: 1em;
                }

                .sliderItem{
                    height: 100%;
                    width: 100%;
                }

                .details{
                    padding: 2em;

                    .imageDisplay{
                        border: #42b983 2px solid;
                        display: block;
                        padding: 1em;
                        border-spacing: 1em;
                        width: 35%;
                        height: 400px;
                        margin-top: 2em;
                    }

                    h3{
                        margin: 1.5em;

                        span{
                            font-weight: 100;
                        }
                    }

                    p{
                        margin: 1.5em 2em; 
                        font-weight: 100;
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
                border: 1px solid lightgrey;
                top: 35%;
                padding: 2em;
                width: 16vw;
                background: white;
                border-radius: 8px;
                position: absolute;
                left: 70%;

                h3{
                    text-align: center;
                    padding-bottom: 0.4em;
                }
                input{
                    padding: 1.3em;
                    width: 12vw;
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

            .interestedButton{
                bottom: 1%;
                right: 1%;
                position: fixed;
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
