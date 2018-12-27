<template>
    <div class="edit">
        <h2 style="text-align: center">{{heading}}</h2>
            <div class="form">
                <h3>I am *</h3>
                <div class="flex mainRadio">
                    <div class="flex radio">
                        <input type="radio" name="" id="" value="Owner" v-model="doc.Status">
                        <p>Owner</p>
                    </div>
                    <div class="flex radio">
                        <input type="radio" name="" id="" value="Agent" v-model="doc.Status">
                        <p>Agent</p>
                    </div>
                </div>
                <h3>Construction Stauts *</h3>
                <div class="flex mainRadio">
                    <div class="flex radio">
                        <input type="radio" name="" id="" value="Ready To Move" v-model="doc.CStatus">
                        <p>Ready To Move</p>
                    </div>
                    <div class="flex radio">
                        <input type="radio" name="" id="" value="Under Construction" v-model="doc.CStatus">
                        <p>Under Construction</p>
                    </div>
                </div>
                <h3>Name *</h3>
                <input type="text" placeholder="Enter Name" v-model="doc.Name">
                <h3>Location *</h3>
                <input type="text" placeholder="Enter Location" v-model="doc.Location">
                <h3>Address *</h3>
                <input type="text" placeholder="Address Line 1" v-model="doc.AddLineOne">
                <input type="text" placeholder="Address Line 2" v-model="doc.AddLineTwo">
                <h3>Built Up Area *</h3>
                <input type="text" placeholder="Enter Area" v-model="doc.BuiltUpArea">
                <h3>Carpet Area</h3>
                <input type="text" placeholder="Enter Carpet Area" v-model="doc.Carpet">
                <h3>Bedrooms *</h3>
                <input type="text" placeholder="No of Bedrooms" v-model="doc.Bedrooms">
                <h3>Bathroom Count *</h3>
                <input type="text" placeholder="Enter bathroom count" v-model="doc.BathRooms">
                <h3>Floor Number *</h3>
                <input type="text" placeholder="Enter Floor Number" v-model="doc.Floor">
                <h3>Total Apartment Floors *</h3>
                <input type="text" placeholder="Enter Floor Count" v-model="doc.FloorCount">
                <h3>Age of Property</h3>
                <input type="text" placeholder="Enter Property Age" v-model="doc.PropertyAge">
                <h3>Bus Route</h3>
                <input type="text" placeholder="Enter Bus Route" v-model="doc.BusRoute">
            </div>
            <div class="otherform">
                <div class="section">
                    <div class="flex">
                        <h3>Amenities</h3>
                        <button @click="doc.Amenities.push({ames: ''})">Add</button>
                    </div>
                    <input style="width: 80%" v-for="(amenity,index) in doc.Amenities" type="text" placeholder="Enter Amenity" v-model="doc.Amenities[index].ames">
                </div>
            </div>
            <div class="flex">
                <h3>Display Images</h3>
                <button v-if="editing" @click="changeDisplayImagesInitiated()">Change Images</button>
            </div>
            <div v-if="!changeDisplay && editing" class="displayImages">
                <img v-for="(image,index) in doc.DisplayImages" :key="index" :src="image" alt="">
            </div>
            <div v-else class="uploading">
                <p>Upload Status: {{disUploading}}</p>
                <vue-dropzone class="dropzone" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="PrepareTouploadDisplayImages"></vue-dropzone>
            </div>
        <button v-if="uploading">Uploading Images..</button>    
        <button v-else @click="action()">{{buttonText}}</button>
        <button @click="cancel()">Cancel</button>

    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
import PictureInput from 'vue-picture-input'
import {mapMutations, mapState} from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    router,
    props: ['id'],
    data(){
        return{
            doc: {
                Status: 'Owner',
                CStatus: 'Ready To Move',
                Name: '',
                Location: '',
                AddLineOne: '',
                AddLineTwo: '',
                BuiltUpArea: '',
                Carpet: '',
                Bedrooms: '',
                BathRooms: '',
                Floor: '',
                FloorCount: '',
                PropertyAge: '',
                BusRoute: '',
                Amenities: [{ames: ''}],
                DisplayImages: [""],
                Email: '',
                noImage: 'https://firebasestorage.googleapis.com/v0/b/chattirealtors-4ca32.appspot.com/o/Users%2Fd3L1Uc8zYGcciFtI3fLrB5p4h983%2FnoImage.png14cfff43-f531-d085-7bf4-e4489ae752c5?alt=media&token=05a45903-23a9-4d3f-b74b-d68b24ab947f',
            },
            heading: "Add Plot",
            editing: false,
            buttonText: 'Add',
            changeDisplay: false,
            changeDevelopment: false,
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                Nouser: true,
                dropOptions: {
                    maxFilesize: 1, // MB
                    maxFiles: 4,
                    chunking: true,
                    chunkSize: 500, // Bytes
                    thumbnailWidth: 150, // px
                    thumbnailHeight: 150,
                    addRemoveLinks: true
                },
            },
            devUploading: "Not Uploading",
            disUploading: 'Not Uploading',
            displayStoreHouse: [],
            developmentStoreHouse: [],
            uploading: false,
        }
    },
    components:{
        PictureInput,
        vueDropzone: vue2Dropzone, 
    },
    computed: {
        ...mapState(['DashBoard'])
    },
    mounted(){
        this.Email = firebase.auth().currentUser.email;
        this.DashBoard['AddFlat'] = true;
        if(this.id == undefined){
            this.heading = "Add Flat"
        }else{
            this.heading = "Edit Flat"
            this.editing = true;
            this.buttonText = "Update"
            this.populate();
        }
    },
    beforeDestroy(){
        this.DashBoard['AddFlat']= false;
    },
    methods: {
        ...mapMutations(['uploadDevOne']),
        populate: function(){var vm =this;
            firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection('Flats').doc(this.id).get().then((doc)=>{
                vm.doc = doc.data();
                console.log(doc.data());
            })
        },
        changeDisplayImagesInitiated(){
            if(!this.changeDisplay){
                this.changeDisplay = true;
                this.doc.DisplayImages = [];
            }
        },  
        PrepareTouploadDisplayImages(file){
            if(this.doc.DisplayImages[0]==''){
                this.doc.DisplayImages = []
            }
            this.uploadDisplayImages(file);
        },
        uploadDisplayImages(file){var vm = this;
            vm.disUploading = "Uploading";
            vm.uploading = true;
            vm.changeDisplay = true;
            console.log(file);
            var storageref = firebase.storage().ref('Users/' + localStorage.getItem('uid') + '/' + file.name +  this.guid());
            var task = storageref.put(file);
            task.on('state_changed', 
                function progress(snapshot){
                        var percentage = snapshot.bytesTransferred/snapshot.totalBytes* 100;
                    },
                    function error(e){

                    },
                    function complete(){
                        task.snapshot.ref.getDownloadURL().then(function(url){
                            vm.doc.DisplayImages.push(url);
                            vm.disUploading = "Completed";
                            vm.uploading = false;
                            vm.changeDisplay = false;
                        })
                    }        
                )
        },
        action(){
            if(this.id == undefined){
                this.addPlot();
            }else{
                this.updatePlot()
            }
        },
        addPlot(){var vm = this;
        if((vm.doc.Name!="") && (vm.doc.Location!="") && (vm.doc.AddLineOne!="") && (vm.doc.BuiltUpArea!="") && (vm.doc.Bedrooms!="") && (vm.doc.BathRooms!="") && (vm.doc.Floor!="") && (vm.doc.FloorCount!="")){
            firebase.firestore().collection("Public").doc("Posts").collection("Flats").add(this.doc).then((doc)=>{
                firebase.firestore().collection("Users").doc(localStorage.getItem('uid')).collection("Flats").doc(doc.id).set(vm.doc).then(()=>{
                    vm.$toast("Succesfully Uploaded Flat");
                    router.push('/user');
                })
            })
        }else{
            alert('Please Fill Mandatory Fields');
        }
        },
        guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        cancel(){
            router.push('/user');
        },
        updatePlot(){var vm = this;
            firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection('Flats').doc(vm.id).set(vm.doc).then(()=>{
                firebase.firestore().collection("Public").doc("Posts").collection("Flats").doc(vm.id).set(vm.doc).then(()=>{
                    vm.$toast("Updated Succesfully");
                    router.push('/user');
                })
            }).catch((e)=>{
                vm.$toast(e.message);
            })
        },
    }

}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
}
button{
    cursor: pointer;
}
button:hover{
    background: rgb(38, 115, 151);
    color: black;
}
    @media screen and (min-width: 320px) {
        .edit{
            .radio{
                width: 60%;
                p{
                    width: 90%;
                    margin-top: -1%;
                }
            }
            h2{
                margin: 1em;
            }
            h3{
                margin: 0.7em;
            }
            input{
                margin: 0.7em;
                width: 85%;
                padding: 0.7em;
            }
            textarea{
                width: 85%;
                margin: 0.7em;
            }
            .displayImages{
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 0.7em;
                img{
                    width: 45vw;
                }
            }
            button{
                background: none;
                border: 1px solid black;
                padding: 0.7em;
                width: 30%;
                margin: 1em;
                margin-left: 1.5em;
            }
            .dropzone{
                width: 100%;
            }
            p{
                margin: 0.7em;
            }
        }
    }

    @media screen and (min-width: 700px) {
        .edit{
            height: 95vh;
            overflow: auto;
        }
    }

    @media screen and (min-width: 1000px) {
        .edit{
            .form{
                .mainRadio{
                    width: 50%;
                }
            }
        }
        .displayImages{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 0.7em;
                img{
                    width: auto;
                    height: 40vh;
                    margin: 0.7em;
                }
        }
    }
</style>
