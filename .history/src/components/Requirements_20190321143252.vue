<template>
    <div class="requirements">
        <div :style="{background: color}" class="textInfo">
            <h1>Have a specific requirement?</h1>
            <p>Post your requirement and one of our executives will reach out to you.</p>
            <hr>
        </div>
        <form @submit.prevent="sendRequirement()" action="">
            <h3>Name *</h3>
            <input type="text" placeholder="Enter Your Name" v-model="document.Name">
            <h3>Email *</h3>
            <input type="email" placeholder="Enter Email" v-model="document.Email">
            <h3>Enter Location *</h3>
            <input type="text" placeholder="Enter Location" v-model="document.Location">
            <h3>Enter Price Range</h3>
                <div class="price">
                    <div class="flex">
                        <div class="priceItem">
                            <input type="number" placeholder="Range" v-model="document.From">
                        </div>
                    </div>
                    <div class="flex second">
                        <div class="priceItem">
                            <input type="number" placeholder="Range" v-model="document.To">
                        </div>
                    </div>
                </div>
            <h3>Enter Phone Number *</h3>
            <input type="number" placeholder="Enter Phone Number" v-model="document.Phone">
            <h3>Enter Message</h3>
            <textarea name="" id="" rows="5" placeholder="Enter Message" v-model="document.Message"></textarea>
            <button class="" @click="sendRequirement()">Send</button>
        </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import firebase from 'firebase'
export default {
    data(){
        return{
            color: '',
            document: {
                Name: '',
                Email: '',
                Location: '',
                From: '',
                To: '',
                Phone: '',
                Message: ''
            }
        }
    },
    computed: {
        ...mapState(['MainNavState'])
    },
    mounted(){
        this.MainNavState['Requirement']= true;
    },
    beforeDestroy(){
        this.MainNavState['Requirement'] = false;
    },
    methods: {
        sendRequirement(){var vm = this;
            if((vm.document.Name=="")|| (vm.document.Email=="") || (vm.document.Location=="") || (vm.document.From=="") || (vm.document.To=="") || (vm.document.Phone=="")){
                alert('Please Fill All Required Fields')
            }else{
                firebase.firestore().collection('Requirements').add(vm.document).then(()=>{
                    vm.$toast("Requirement Sent!. Thank You!")
                }).catch((e)=>{
                    vm.$toast(e.message);
                })
            }
            
        }
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
            h1{
                text-align: center;
                font-size: 1.5em;
                margin: 1em;
            }
            h3{
                margin: 0.4em 0 0 8%;
            }
            p{
                text-align: center;
                margin: 1.5em;
                font-size: 0.9em;
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

            .price{
                display: flex;
                .priceItem{
                    margin: 1em;
                    input{
                        padding: 0.8em;
                    }
                }
            }
            form{
                margin-top: 5%;
            }
            button{
                font-size: 1em;
                border: 1px solid black;
                background: none;
                position: relative;
                margin: auto;
                width: 90%;
                margin: 1em;
                padding: 0.8em;
                color: white;
                background: #43abc9;
            }
        }
    }

    @media screen and (min-width: 700px) {
        .requirements{
            .textInfo{
                background: #43abc9;
                color: white;
                h1{
                    font-size: 1.8em;
                    // text-shadow: 10px 11px 14px rgba(160, 150, 150, 0.54);
                }
                p{
                    font-size: 1.2em;
                }
            }

            form{
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
                    width: 40%;
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
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            width: 100%;

            .textInfo{
                width: 60%;
                // margin-top: 7%;
                h1{
                    margin-top: 17%;
                    font-size: 4em;
                    // text-shadow: 10px 11px 14px rgba(160, 150, 150, 0.54);
                }
                p{
                    font-size: 1.6em;
                    width: 60%;
                    text-align: center;
                    margin-left: 19%;
                }
                hr{
                    display: none;
                }
            }

            form{
                margin-top: 2%;
                width: 40%;
                margin-left: 1%;
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
                    margin-top: 0.5em;
                    font-size: 1em;
                }
                h3{
                    font-size: 1.2em;
                }
                textarea{
                    width: 70%;
                    margin-left: 8%;
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
