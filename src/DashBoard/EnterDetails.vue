<template>
    <div class="enter">
        <h3>Please Enter Details To Continue</h3><hr>
        <input v-model="name" type="text" placeholder="Full Name"><br>
        <input v-model="phone" type="text" placeholder="Phone Number"><br>
        <button @click="submit">Submit</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router.js'
import {db} from '../main.js'
import axios from 'axios'
export default {
    data(){
        return{
            name: '',
            phone: '',
        }
    },
    methods: {
        submit: function(){
            if((this.name != (''||undefined)) && (this.phone != (''||undefined))){
            var user = firebase.auth().currentUser;
            db.collection("Users").doc(user.uid).set({
                name: this.name,
                phone: this.phone
            },{
                merge: true
            }).then(function(e){
                router.push('/dashboard/space');
            })
        }
    }
    }
}
</script>

<style lang="scss" scoped>

    .enter{
        padding: 2em;
        position: absolute;
        width: 350px;
        top: 50%;
        left: 30%;
        transform: translateX(-50%);
        transform: translateY(-50%);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 15px;

        h3{
            text-align: center;
            margin: 0.6em;
        }

        input{
            width: 88%;
            border: none;
            background: lightyellow;
            padding: 1em;
            margin: 0.7em;
            border-radius: 15px;
        }

        button{
            width: 100%;
            padding: 1em;
            background: #AD974f;
            border: none;
            border-radius: 15px;
            color: white;
        }
    }

</style>
