<template>
    <div class="add">

        
        <h1>Enter Plot Details</h1>
        <div class="dets">
        <div class="left">
        <input v-model="heading" type="text" placeholder="Heading *">
        <input v-model="location" type="text" placeholder="Location *">
        <input v-model="price" type="text" placeholder="Price *">
        <input v-model="negotiable" type="text" placeholder="Negotiable?">
        <input v-model="rate" type="text" placeholder="Rate Per Sq.Yard *">
        <input v-model="facing" type="text" placeholder="Facing *">
        <input v-model="length" type="text" placeholder="Length *">
        <input v-model="breadth" type="text" placeholder="Breadth *">
        <input v-model="route" type="text" placeholder="Bus Route">
        <input v-model="scope" type="text" placeholder="Scope For Hike">
        </div>
        <div class="right">
        <textarea v-model="devDetails" name="" id="" cols="60" rows="10" placeholder="Enter Development Details in and around the area *"></textarea>
        <textarea v-model="amenities" name="" id="" cols="60" rows="10" placeholder="Enter Amenities present for the plot"></textarea>
        <textarea v-model="note" name="" id="" cols="60" rows="10" placeholder="Enter Any Note"></textarea>
        </div>
        </div>
        <div class="picsUpload">
          <h3>Upload Display Images</h3> <span>{{disPercent}}</span>
           <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="displayImages"></vue-dropzone>
          <h3>Upload Development Images</h3> <span>{{devPercent}}</span>
           <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="developmentImages"></vue-dropzone>
        </div>
        <button :disabled='disabled' @click="submit">Submit Post</button>
        <h2>{{Result}}</h2>

    </div>
</template>

<script>
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {db} from '../main'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
import router from '../router'
export default {
    router,
    data(){
        return{
            disabled : false, 
            dropzoneOptions: {
            url: 'https://httpbin.org/post',
            Nouser: true,
            dropOptions: {
            maxFilesize: 4, // MB
            maxFiles: 4,
            chunking: true,
            chunkSize: 500, // Bytes
            thumbnailWidth: 150, // px
            thumbnailHeight: 150,
            addRemoveLinks: true
          },
        },
        disPercent: '',
        devPercent: '',
        up1: false,
        up2: false,
        Result: '',
        uid: '',
        devImages: [],
        disImages: [],
        heading: '',
        location: '',
        price: '',
        negotiable: '',
        rate: '',
        facing: '',
        length: '',
        breadth: '',
        route: '',
        scope: '',
        devDetails: '',
        amenities: '',
        note: '',
    }
    },
    components: {
     vueDropzone: vue2Dropzone
    },
    methods: {
       displayImages(file) {
         this.disPercent = '';
         console.log(file);
         var vm = this;
       var storageref = firebase.storage().ref('Users/' + localStorage.getItem('uid') + '/' + file.name +  this.guid());
       var task = storageref.put(file);
       task.on('state_changed', 
          function progress(snapshot){
                var percentage = snapshot.bytesTransferred/snapshot.totalBytes* 100;
                vm.disPercent = percentage;
            },
            function error(e){
              console.log(e);
            },
            function complete(){  
                task.snapshot.ref.getDownloadURL().then(function(url){
                    console.log(url);
                  vm.disPercent = 'Uploaded';
                    vm.disImages.push(url);
                    vm.$toast('Image Uploaded');
                })
            }        
        )
       },
       developmentImages(file) {
         var vm = this;
         vm.devPercent = '';
       var storageref = firebase.storage().ref('Users/' + localStorage.getItem('uid') + '/' + file.name +  this.guid());
       var task = storageref.put(file);
       task.on('state_changed', 
        function progress(snapshot){
                var percentage = snapshot.bytesTransferred/snapshot.totalBytes* 100;
                vm.devPercent = percentage;
            },
            function error(e){

            },
            function complete(){
                task.snapshot.ref.getDownloadURL().then(function(url){
                  vm.devPercent = 'Uploaded';
                    vm.devImages.push(url);
                    vm.$toast('Image Uploaded');
                })
            }        
        )
       },
       submit: function(){
           this.disabled = true;
            var vm= this;
         if(this.devImages == ""){
             var temp = 'https://firebasestorage.googleapis.com/v0/b/chattirealtors-4ca32.appspot.com/o/Users%2Fd3L1Uc8zYGcciFtI3fLrB5p4h983%2FnoImage.png14cfff43-f531-d085-7bf4-e4489ae752c5?alt=media&token=05a45903-23a9-4d3f-b74b-d68b24ab947f';
             vm.devImages.push(temp);
         }
         if(this.disImages == ""){
             var temp = 'https://firebasestorage.googleapis.com/v0/b/chattirealtors-4ca32.appspot.com/o/Users%2Fd3L1Uc8zYGcciFtI3fLrB5p4h983%2FnoImage.png14cfff43-f531-d085-7bf4-e4489ae752c5?alt=media&token=05a45903-23a9-4d3f-b74b-d68b24ab947f';
             vm.disImages.push(temp);
            }
         if((this.heading || this.location || this.price || this.rate || this.facing || this.length || this.breadth || this.devDetails || this.disImages) != ""){
         db.collection("Users").doc(localStorage.getItem('uid')).collection("Posts").add({
           Heading: this.heading,
           Location: this.location,
           Price: this.price,
           Negotiable: this.negotiable,
           Rate: this.rate,
           Facing: this.facing,
           Length: this.length,
           Breadth: this.breadth,
           Route: this.route,
           Scope: this.scope,
           DevelopmentDetails: this.devDetails,
           Amenities: this.amenities,
           Note: this.note,
           DevelopmentImages: this.devImages,
           DisplayImages: this.disImages
         }).then(function(docRef) {
             db.collection("UserPosts").add({
            Heading: vm.heading,
           Location: vm.location,
           Price: vm.price,
           Negotiable: vm.negotiable,
           Rate: vm.rate,
           Facing: vm.facing,
           Length: vm.length,
           Breadth: vm.breadth,
           Route: vm.route,
           Scope: vm.scope,
           DevelopmentDetails: vm.devDetails,
           Amenities: vm.amenities,
           Note: vm.note,
           DevelopmentImages: vm.devImages,
           DisplayImages: vm.disImages,
           UserID: localStorage.getItem('uid'),
           DocumentID: docRef.id
        }).then(function(docRef){
            vm.$toast("Post Succesful");
            vm.heading = '';
            vm.location = '';
            vm.price = '';
            vm.facing = '';
            vm.length = '';
            vm.breadth = '';
            vm.route = '';
            vm.scope = '';
            vm.devDetails = '';
            vm.amenities = '';
            vm.note = '';
            vm.devImages = '';
            vm.disImages = '';
            vm.disabled = false;
            router.push('/dashboard');
        }).catch(function(error){
            vm.$toast(error.message);
        })
        })
        .catch(function(error) {
            vm.$toast(error.message);
        });
       }else{
           vm.$toast('Please Fill In All Required Details');
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
      },
}
</script>


<style lang="scss" scoped>

    .add{
        margin: 1em;
        h3{
          margin: 0.7em;
        }
        span{
          color: green;
        }
        input{
            display: block;
            width: 500px;
            padding: 1em;
            font-size: 1em;
            margin: 0.7em;
        }
        textarea{
            display: block;
            margin: 1em;
            font-size: 1em;
        }

        .dets{
            display: grid;
            grid-template-columns: 50% auto;
        }

        .UploadImages{
            width: 300px;
            margin: 3em;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border-radius: 15px;
            
            button{
                border: none;
                background: #AD974f;
                border-radius: 8px;
                width: 100%;
                padding: 1em;
                color: white;
            }

            progress{
                margin: 0.7em;
            }
        }
        button{
          background: #AD974f;
          width: 50%;
          margin: 1em auto;
          padding: 1.2em;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }
    }

    .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }


</style>
