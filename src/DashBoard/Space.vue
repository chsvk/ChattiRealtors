<template>
    <div class="space">
        <div class="plots">
            <section class="plots">
        <article v-for="(plot, idx) in plots" :key="idx">
         <div class="plot animated fadeInUp">
             <agile :autoplay="true" :arrows="false" :dots="false" :speed=1000>
               <div v-for="image in plot.DisplayImages" class="slide">
                 <img :src="image" alt='No Image Available'>
               </div>
             </agile>
             <div class="det">
             <h3>{{plot.Heading}}</h3>
             <button @click="details(plot)" class="details">Full Details</button>
             </div>
         </div>
        </article>
      </section>
        </div>
    </div>
</template>

<script>
import {db} from '../main'
import firebase from 'firebase'
import { functions } from 'firebase';
import router from '../router.js'
export default {
    router,
    data(){
        return{
            plots: [],
        }
    },
    firestore(){
        return{
            plots: db.collection("Users").doc(localStorage.getItem('uid')).collection("Posts")
        }
    },
    mounted(){
        
    },
    methods:{
        details: function(plot){
            router.push({
                name: 'fulldetails',
                params: {
                    plotDetails: plot 
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
    
 .plots{
    width: 95%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 3em;
    padding: 2em;
    grid-gap: 1em;
  }

  .plot{
      position: relative;
    height: 350px;
    width: 300px;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 15px;

    img{
      width: 300px;
      height: 250px;
      font-size: 2em;
    }

    h3{
      text-align: center;
      padding: 1em 0;
    }

    .details{
      position: relative;
      bottom: 0;
      background: #AD974f;
      padding: 10px;
      width: 100%;
      font-weight: bold;  
      border: none;
      color: white;
    }

  }

  .plot:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
  }

</style>
