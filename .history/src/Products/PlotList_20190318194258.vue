<template>
    <div class="plots">
        <h2 class="heading" v-if="adminPlots.length>0">Recommended Plots</h2>
        <div v-if="adminPlots.length>0" class="adminPlots plotList">
            <div @click="plotClicked(plot.id)" v-for="(plot, index) in adminPlots" :key="index" class="plot card">
                <agile v-if="!(plot.plot.DisplayImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in plot.plot.DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile>
                <img v-else src="../assets/noImage.png" alt="">
                <h3 class="PlotName">{{plot.plot.Name}}</h3>
            </div>
        </div>
        <!-- <hr v-if="adminPlots.length>0"> -->
        <!-- <h2>Recent Plots</h2>
        <div class="adminPlots plotList">
            <div  @click="plotClicked(plot.id)" v-for="(plot, index) in plots" :key="index" class="plot card">
                <agile v-if="!(plot.plot.DisplayImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in plot.plot.DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile>
                <img v-else src="../assets/noImage.png" alt="">
                <h3>{{plot.plot.Name}}</h3>
            </div>
        </div> -->
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router';
export default {
    data(){
        return{
            plots: [],
            adminPlots: []
        }
    },
    mounted(){
        this.fetchAdminPLots();
        // this.fetchPlots();
    },
    methods:{
        fetchPlots(){ var vm = this;
            firebase.firestore().collection("Public").doc('Posts').collection('Plots').get().then((doc)=>{
                doc.forEach((doc)=>{
                    var v = {
                        id: doc.id,
                        plot: doc.data() 
                    }
                    vm.plots.push(v);
                    console.log(vm.plots);
                })
            })
        },
        fetchAdminPLots(){var vm = this;
            firebase.firestore().collection("Admin").doc("Posts").collection("Plots").get().then((doc)=>{
                doc.forEach((doc)=>{
                    var v = {
                        id: doc.id,
                        plot: doc.data()
                    }
                    vm.adminPlots.push(v);
                })
            })
        },
        plotClicked(id){
            router.push('/viewplot/' + id);
        }
    }
}
</script>

<style lang="scss" scoped>

// Card CSS

.card {
  /* Add shadows to create the "card" effect */
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  cursor: pointer;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
   @media screen and (min-width: 320px) {
       .plots{
           h2{
               margin: 0 0 1em 1em;
           }
           .heading{
               text-align: center;
               margin: 1em;
           }
           .PlotName{
               text-align: center;
               padding: 0.7em;
           }
        .plotList{
            margin-top: 3%;
            display: flex;
            flex-direction: column;
            .plot{
                border-radius: 10px;
                width: auto;
                margin: 0.5em;
                img{
                    height: 40vh;
                    width: 100%;
                }
                h3{
                    margin-left: 0.7em;
                }
            }
        }
       }
   }

   @media screen and (min-width: 700px) {
       .plots{
           .plotList{
               display: grid;
               grid-template-columns: 1fr 1fr;
               .plot{
                   height: auto;
                   width: auto;
               }
           }
       }
       
   }
   @media screen and (min-width: 1000px) {
       .plots{
           .plotList{
               display: grid;
               grid-template-columns: 1fr 1fr 1fr 1fr;
               .plot{
                   margin: 0 auto;
                   width: 45vw;
                   img{
                       height: 20vh;
                       width: 20vw;
                   }
               }
           }
       }
       
   }
</style>
