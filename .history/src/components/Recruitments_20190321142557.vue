<template>
    <div class="requirements">
        <div class="textInfo">
            <h1>Interested in joining us?</h1>
            <h4>Job Description: </h4>
            <p>Chatti Realtors Purpose is to deliver the best investments for our clients.
            Joining <span>CR</span> is about joining a culture of Openness, teamwork and trust.
            We are confident that together we can drive the industry with a purpose.
            Join Us and Do your Best Work Ever!
            </p>
            <h4>Job Role:</h4>
            <p>Attract and manage Like minded customers who are willing to invest</p>
            <p>Come up with creative concepts to increase business</p>
            <h4>Preferred Education:</h4>
            <p>SSC - Any Degree</p>
            <hr>
        </div>
        <form @submit.prevent="sendRequirement()" action="">
            <div style="margin-bottom: 5%" class="flex">
                <h3>Role</h3>
                <select style="margin-left: 5%; padding: 0.6em; border: 2px solid black" name="" id="">
                    <option @click="applyingRole = 'Marketing Manager'" value="">Marketing Manager</option>
                    <option @click="applyingRole = 'Tele Caller'" value="">Tele-Caller</option>
                </select>
            </div>
            <h3>First Name *</h3>
            <input type="text" placeholder="Enter Your First Name" v-model="first_name">
            <h3>Last Name *</h3>
            <input type="text" placeholder="Enter Your Last Name" v-model="last_name">
            <h3>Email *</h3>
            <input type="email" placeholder="Enter Your Email Address" v-model="email">
            <h3>Enter Phone Number *</h3>
            <input type="number" placeholder="Enter Phone Number" v-model="phone">
            <h3>Upload Your Resume *</h3>
            <p v-if="uploading">Uploading Status: {{uploadPercentage}} %</p>
            <input type="file" name="" id="" @change="fileUploaded">
            <button @click="sendRequirement()">Send</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            color: '',
            applyingRole: 'Marketing Manager',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            file: '',
            uploading: false,
            uploadPercentage: 0,
            resumeUrl: ''
        }
    },
    computed: {
        ...mapState(['MainNavState'])
    },
    mounted(){
        this.MainNavState['Recruitment']= true;
    },
    beforeDestroy(){
        this.MainNavState['Recruitment'] = false;
    },
    methods: {
        sendRequirement(){var vm = this;
            if(uploading){
                alert('Please wait while the file is uploading');
            }else{
                if((vm.first_name=="")||(vm.last_name=="")||(vm.email=="")||(vm.phone=="")||(vm.resumeUrl=="")){
                    alert("Please fill All required Fields")
                }else[
                    firebase.firestore().collection('Recruitments').add({
                        FirstName: vm.first_name,
                        LastName: vm.last_name,
                        Email: vm.email,
                        Phone: vm.phone,
                        URL: vm.resumeUrl
                    }).then(()=>{
                        vm.$toast("Application sent succesfully!")
                    }).catch((e)=>{
                        vm.$toast(e.message);
                    })
                ]
            }
        },
        fileUploaded(e){var vm = this;
            this.uploading = true;
            var file = e.target.files || e.dataTransfer.files;
            var storageref = firebase.storage().ref('Resumes' + '/' + file[0].name + this.guid());
            var task = storageref.put(file);
            task.on('state_changed', 
                function progress(snapshot){
                        vm.uploadPercentage = snapshot.bytesTransferred/snapshot.totalBytes* 100;
                        if(percentage==100){
                            vm.uploading = false;
                        }
                    },
                    function error(e){

                    },
                    function complete(){
                        task.snapshot.ref.getDownloadURL().then(function(url){
                            vm.resumeUrl = url;
                        })
                    } 
            )       
        },
        guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
    }
}
</script>

<style lang="scss" scoped>

    .flex{
        display: flex;
        width: 100%;
    }

    @media screen and (min-width: 320px) {
        .requirements{
            .textInfo{
                padding: 1em 0;
                h4{
                    margin: 2em 2em 1em 2em;
                }
                p{
                    margin-left: 2em;
                }
                h1{
                    text-align: center;
                }
            }
            
            .flex{
                justify-content: left;
                p{
                    width: 50%;
                }
            }
            .second{
                margin-left: -2%;
            }
            input{
                width: 90%;
                padding: 0.7em;
                font-size: 0.8em;
                margin-left: 9%;
            }
            textarea{
                width: 90%;
                font-size: 0.8em;
                margin: 4%;
                margin-left: 10%;

            }
            form{
                margin-top: 5%;
                h3{
                    margin-left: 1.2em;
                }
                input{
                    margin: 0.6em;
                    font-size: 1em;
                }
            }
            button{
                width: 90%;
                font-size: 1em;
                border: 1px solid black;
                background: none;
                position: relative;
                margin: 1em;
                padding: 0.8em;
                background: #43abc9;
                color: white;
            }
        }
    }

    @media screen and (min-width: 700px) {
        .requirements{
            .textInfo{
                background: #43abc9;
                h1{
                    font-size: 1.8em;
                }
                p{
                    font-size: 1em;
                    text-align: left;
                    margin-left: 2.2em;
                }
                h4{
                    margin: 2em;
                    font-size: 1.2em;
                }
            }

            form{
                display: grid;
                grid-template-columns: 1fr 1fr;
                h3{
                    font-size: 1.5em;
                }
                input{
                    font-size: 1.2em;
                }
                p{
                    font-size: 1em;
                }
                .price{
                    display: flex;
                    width: 70%;
                    margin-left: 8%;
                }
                button{
                    animation: float 6s ease-in-out infinite;
                    font-size: 1.2em;
                    width: 100%;
                    padding: 0.8em;
                }
                button:hover{
                    background: #43abc9;
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }

    @media screen  and (min-width: 1000px){
        .requirements{
            justify-content: space-between;
            width: 100%;
            display: flex;

            .textInfo{
                // background: #BDBDBD;
                color: white;
                width: 60%;
                h1{
                    font-size: 2.2em;
                }
                h4{
                    margin: 2em 2em 1em 2em;
                    font-size: 1.8em;
                }
                p{
                    font-size: 1.1em;
                    width: 75%;
                    margin-left: 8%;
                    text-align: left;
                }
                hr{
                    display: none;
                }
            }

            form{
                margin-top: 2%;
                width: 40%;
                margin-left: 1%;
                display: flex;
                flex-direction: column;
                .price{
                    input{
                        font-size: 0.8em;
                        height: 40%;
                    }
                }
                button{
                    width: 80%;
                    padding: none;
                    font-size: 1em;
                    height: 7%;
                }
                input{
                    width: 50%;
                    margin-top: 1em;
                    font-size: 1em;
                }
                h3{
                    margin-top: 0.8em;
                    font-size: 1.2em;
                }
                textarea{
                    width: 70%;
                    margin-left: 3%;
                }
                button{
                    margin-top: 2%;
                    margin-left: -2%;
                }
            }
        }
    }

    @keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

</style>
