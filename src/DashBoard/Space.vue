<template>
    <div class="space">
        <div class="noplot" v-if="!plotsExist">
            <p>No Plots Added</p>
            <button @click="addNew">Add New Plot</button>
        </div>
        <div class="plots" v-else>
            <article v-for="(plot, idx) in plots" :key="idx">
            <div class="plot animated fadeInUp">
             <agile :arrows="false" :dots="false" :speed=250>
               <div v-for="image in plot.Image" class="slide">
                 <img :src="image" alt="">
               </div>
             </agile>
             <div class="det">
             <h3>{{plot.Heading}}</h3>
             <button class="details">Delete Plot</button>
             </div>
         </div>
        </article>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
import firebase from 'firebase'
import router from '../router.js'
export default {
    router,
    data(){
        return{
            plots: [],
            plotsExist: false,
        }
    },
    mounted(){
        this.getPlots();
    },
    methods:{
    //     getPlots(){
    //         firebase.auth().currentUser.then(function(e){
    //         db.collection("Users").doc(user.uid).collection("Plots").doc('plot1').set({
    //             name: 'ello'
    //         }).then(function(e){
    //             console.log('set');
    //         })
    //         });
    // }
    getPlots: function(){
        this.plotsExist = true;
        var user = firebase.auth().currentUser;
        console.log(user);
        db.collection("Users").doc(user.uid).collection("Plots").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                this.plots.push(doc);
            });
        });
        if(this.plots = []){
            this.plotsExist= false;
        }
        },
    
    addNew: function(){
        router.push('/dashboard/new');
    }
    }
}

</script>

<style lang="scss" scoped>

    .noplot{
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translateX(-50%);
        transform: translateY(-50%);

        p{
            font-style: italic;
        }
        button{
            width: 500px;
            background: #AD974f;
            border: none;
            border-radius: 8px;
            padding: 1em;
            margin: 1em;
            color: white;
            text-transform: uppercase;
            cursor: pointer;
        }
    }
    
</style>
