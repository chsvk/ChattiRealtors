<template>
    <div class="contact">
        <div @submit.prevent="submitForm()" class="card">
            <h1>Happy To Help! 😁</h1>
            <input type="text" placeholder="Enter Name">
            <input type="text" placeholder="Enter Mobile">
            <button @click="submitForm()">Submit</button>
            <div class="contactSocials">
                <h4>Or Reach Us through: -</h4>
                <a href="https://wa.me/919849008487"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></a>
                <a href="mailto:bharathch.1994@gmail.com?Subject=Enquiry"><img src="https://img.icons8.com/color/48/000000/gmail.png"></a>
        </div>
        </div>
        
    </div>
</template>

<script>
import firebase from 'firebase'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            name: '',
            mobile: ''
        }
    },
    computed: {
        ...mapState(['MainNavState'])
    },
    mounted(){
        this.MainNavState['Contact'] = true;
    },
    beforeDestroy(){
        this.MainNavState['Contact'] = false;
    },
    methods: {
        submitForm(){
            if(this.mobile == ""){
                alert('Please Fill Required Fields')
            }else{
                firebase.firestore().collection("Contact").add({
                name: this.name,
                mobile: this.mobile
                }).then(()=>{
                    this.$swal("We will contact you shortly")
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

*{
    overflow-x: hidden;
}

.flex{
    margin: 1em;
    display: flex;
    img{
        margin: 0 5%;
    }
}

    @media screen and (min-width: 320px) {
        .contact{
            height: 100vh;
            width: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.8) ),url('../assets/contact.jpeg');
            
            .card{
                padding: 1em;
                background: white;
                width: 100%;
                margin-top: 15vh;
                h1{
                    text-align: center;
                    font-size: 1em;
                }
                input{
                    padding: 1em;
                    display: block;
                    margin: 0.5em;
                    width: 60%;
                }
                button{
                    background: #42b983;
                    color: white;
                    border: none;
                    font-weight: bold;
                    padding: 1em;
                    margin: 1em;
                    width: 20vw;
                    cursor: pointer;
                }   
                .contactSocials{
                    display: flex;
                    h4{
                        margin: 1em;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 700px) {
        .contact{
           .card{
               position: absolute;
               padding: 2em;
               width: 50vw;
               border-radius: 8px;
               top: 20%;
               left: 25%;
               h1{
                   font-size: 1.5em;
               }
               input{
                   margin: 1em;
                   width: 90%;
               }
           }
        }
        
    }

    @media screen and (min-width: 1000px) {
        .contact{
            .card{
                width: 30vw;
                left: 35%;
            }
        }
    }

</style>
