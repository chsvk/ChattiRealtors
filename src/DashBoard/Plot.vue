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
                <h3>Heading *</h3>
                <input type="text" placeholder="Enter Name" v-model="doc.Name">
                <h3>Location *</h3>
                <input type="text" placeholder="Enter Location" v-model="doc.Location">
                <h3>Length *</h3>
                <input type="text" placeholder="Enter Length" v-model="doc.Length">
                <h3>Breadth *</h3>
                <input type="text" placeholder="Enter Breadth" v-model="doc.Breadth">
                <h3>Facing *</h3>
                <input type="text" placeholder="Enter Facing" v-model="doc.Facing">
                <h3>Plot Size *</h3>
                <input type="text" placeholder="Enter Plot Size" v-model="doc.PlotSize">
                <h3>Negotioable?</h3>
                <input type="text" placeholder="Enter Yes/NO" v-model="doc.Negotiable">
                <h3>Price *</h3>
                <input type="text" placeholder="Enter Price" v-model="doc.Price">
                <h3>Bus Route</h3>
                <input type="text" placeholder="Enter Route" v-model="doc.Route">
                <h3>Scope of Hike</h3>
                <input type="text" placeholder="Enter Scope" v-model="doc.Scope">
                <h3>Rate</h3>
                <input type="text" placeholder="Enter Rate per Sq.Yard" v-model="doc.Rate">
                <h3>Note</h3>
                <input type="text" placeholder="Enter Note" v-model="doc.Note">
            </div>
            <div class="otherform">
                <div class="section">
                    <div class="flex">
                        <h3>Amenities</h3>
                        <button @click="doc.Amenities.push({ames: ''})">Add</button>
                    </div>
                    <input style="width: 80%" v-for="(amenity,index) in doc.Amenities" type="text" placeholder="Enter Amenity" v-model="doc.Amenities[index].ames">
                </div>
                <div class="section">
                    <div class="flex">
                        <h3>Development Details</h3>
                        <button @click="doc.DevelopmentDetails.push({value: ''})">Add</button>
                    </div>
                    <input style="width: 80%" v-for="(amenity,index) in doc.DevelopmentDetails" type="text" placeholder="Enter Development Detail" v-model="doc.DevelopmentDetails[index].value">
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
            <div class="flex">
                <h3>Development Images</h3>
                <button v-if="editing" @click="changeDevelopmentImagesInitiated()">Change Images</button>
            </div>
            <div v-if="!changeDevelopment && editing" class="displayImages">
                <img v-for="(image,index) in doc.DevelopmentImages" :key="index" :src="image" alt="">
            </div>
            <div v-else class="uploading">
                <p>Upload Status: {{devUploading}}</p>
                <vue-dropzone class="dropzone" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="uploadDevelopmentImages"></vue-dropzone>
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
                Name: '',
                Location: '',
                Length: '',
                Breadth: '',
                Facing: '',
                Negotiable: '',
                Price: '',
                Route: '',
                Scope: '',
                Rate: '',
                Note: '',
                PlotSize: '',
                Amenities: [{ames: ''}],
                DevelopmentDetails: [{value: ''}],
                DisplayImages: [""],
                DevelopmentImages: [""],
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
    computed: {
        ...mapState(['DashBoard'])
    },
    beforeDestroy(){
        this.DashBoard['AddPlot'] = false;
    },
    components:{
        PictureInput,
        vueDropzone: vue2Dropzone, 
    },
    mounted(){
        this.Email = firebase.auth().currentUser.email;
        this.DashBoard['AddPlot'] = true;
        if(this.id == undefined){
            this.heading = "Add Plot"
        }else{
            this.heading = "Edit Plot"
            this.editing = true;
            this.buttonText = "Update"
            this.populate();
        }
    },
    methods: {
        ...mapMutations(['uploadDevOne']),
        populate: function(){var vm =this;
            firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection('Posts').doc(this.id).get().then((doc)=>{
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
        changeDevelopmentImagesInitiated(){
            if(!this.changeDevelopment){
                this.changeDevelopment = true;
                this.doc.DevelopmentImages = []
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
        PrepareTouploadDevelopmentImages(file){
            if(this.doc.DevelopmentImages[0]==''){
                this.doc.DevelopmentImages = []
            }
            this.uploadDevelopmentImages(file);
        },
        uploadDevelopmentImages(file){var vm = this;
            vm.devUploading = "Uploading";
            vm.uploading = true;
            vm.changeDevelopment = true;
            var storageref = firebase.storage().ref('Users/' + localStorage.getItem('uid') + '/' + file.name +  this.guid());
            var task = storageref.put(file);
            task.on('state_changed', 
                function progress(snapshot){
                        var percentage = snapshot.bytesTransferred/snapshot.totalBytes* 100;
                        if(percentage==100){
                            vm.uploading = false;
                        }
                    },
                    function error(e){

                    },
                    function complete(){
                        task.snapshot.ref.getDownloadURL().then(function(url){
                            vm.doc.DevelopmentImages.push(url);
                            vm.devUploading = "Completed"
                            vm.changeDevelopment = false;
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
        if((vm.doc.Name!="") && (vm.doc.Location!="") && (vm.doc.Price!="") && (vm.doc.Rate!="") && (vm.doc.Facing!="") && (vm.doc.Length!="") && (vm.doc.Breadth!="") && (vm.doc.PlotSize!="")){
            firebase.firestore().collection("Public").doc("Posts").collection("Plots").add(this.doc).then((doc)=>{
                firebase.firestore().collection("Users").doc(localStorage.getItem('uid')).collection("Plots").doc(doc.id).set(vm.doc).then(()=>{
                    vm.$toast("Succesfully Uploaded Post");
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
            firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection('Plots').doc(vm.id).set(vm.doc).then(()=>{
                firebase.firestore().collection("Public").doc("Posts").collection("Plots").doc(vm.id).set(vm.doc).then(()=>{
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
                width: 100%;
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
            .form{
                display: grid;
                grid-template-columns: 1fr 1fr;
                .mainRadio{
                    .radio{
                        width: 100%;
                        input{
                            width: 90%;
                        }
                    }
                }
            }
            .dropzone{
                width: 90%;
                margin-left: 4%;
            }
            .displayImages{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 0.7em;
                img{
                    width: auto;
                    height: 20vh;
                    margin: 0.7em;
                }
            }
        }
    }

    @media screen and (min-width: 800px) {
        .edit{
            margin-left: 2%;
            .form{
                input{
                    padding: 1em;
                    // margin-left: -60%;   
                }
            }
            .otherform{
                display: flex;
                .section{
                    margin: 1em;
                    width: 100%;
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
