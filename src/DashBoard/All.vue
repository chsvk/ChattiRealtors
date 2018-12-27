<template>
    <div class="all">
        <div class="flex">
            <h3>Your Posts</h3>
            <select v-on:change="addNew" name="" id="">
                <option value="">Add New</option>
                <option @click="addNewPlot()" value="">Plots</option>
                <option @click="addNewFlat()" value="">Flats</option>
                <option @click="addNewHouse()" value="">Houses</option>
            </select>
        </div>
        <h2>Your Plots</h2>
        <div class="plots">
            <div v-for="(plot, index) in plots" :key="index" class="plot card">
                <agile v-if="!(plot.plot.DisplayImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in plot.plot.DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile>
                <img v-else src="../assets/noImage.png" alt="">
                <h3>{{plot.plot.Heading}}</h3>
                <div class="flex">
                    <button @click="editPlot(plot.id)">Edit</button>
                    <button @click="removePlot(plot.id)">Delete</button>
                </div>
            </div>
        </div>
        <h2>Your Flats</h2>
        <div class="plots">
            <div v-for="(plot, index) in flats" :key="index" class="plot card">
                <agile v-if="!(plot.plot.DisplayImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in plot.plot.DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile>
                <img v-else src="../assets/noImage.png" alt="">
                <h3>{{plot.plot.Name}}</h3>
                <div class="flex">
                    <button @click="editFlat(plot.id)">Edit</button>
                    <button @click="removeFlat(plot.id)">Delete</button>
                </div>
            </div>
        </div>
        <hr>
        <h2>Your Houses</h2>
        <div class="plots">
            <div v-for="(plot, index) in houses" :key="index" class="plot card">
                <agile v-if="!(plot.plot.DisplayImages[0]=='')" :autoplay="true" :arrows="false" :dots="false" :speed=1000>
                    <div v-for="(image, index) in plot.plot.DisplayImages" :key="index" class="slide">
                        <img v-if="!(image==undefined)" :src="image">
                    </div>
                </agile>
                <img v-else src="../assets/noImage.png" alt="">
                <h3>{{plot.plot.Name}}</h3>
                <div class="flex">
                    <button @click="editHouse(plot.id)">Edit</button>
                    <button @click="removeHouse(plot.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
import {mapState} from 'vuex'
export default {
    router,
    data(){
        return{
            plots: [],
            flats: [],
            houses: [],
            noImage: require('../assets/noImage.png')
        }
    },
    computed: {
        ...mapState(["DashBoard"])
    },
    mounted(){
        this.DashBoard['All'] = true;
        this.fetchAll();
    },
    beforeDestroy(){
        this.DashBoard['All'] = false;
    },
    methods: {
        fetchAll: function(){var vm = this;
            var db = firebase.firestore();
            db.collection('Users').doc(localStorage.getItem('uid')).collection("Plots").onSnapshot((snap)=>{
                vm.plots = [];
                snap.forEach((doc)=>{
                    var v = {
                        id: doc.id,
                        plot: doc.data()
                    }
                    vm.plots.push(v);
                    console.log(doc.data());
                })
            })
            db.collection('Users').doc(localStorage.getItem('uid')).collection("Flats").onSnapshot((snap)=>{
                vm.flats = [];
                snap.forEach((doc)=>{
                    var v = {
                        id: doc.id,
                        plot: doc.data()
                    }
                    vm.flats.push(v);
                    console.log(doc.data());
                })
            })
            db.collection('Users').doc(localStorage.getItem('uid')).collection("Houses").onSnapshot((snap)=>{
                vm.houses = [];
                snap.forEach((doc)=>{
                    var v = {
                        id: doc.id,
                        plot: doc.data()
                    }
                    vm.houses.push(v);
                    console.log(doc.data());
                })
            })
        },
        addNew(e){
            var vm = this;
            if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].text;
                if(id == "Plots"){
                    vm.addNewPlot()
                }else if(id =="Flats"){
                    vm.addNewFlat()
                }else if(id == "Houses"){
                    vm.addNewHouse();
                }
            }
        },
        addNewPlot(){
            router.push('/plot');
        },
        addNewFlat(){
            router.push('/flat');
        },
        addNewHouse(){
            router.push('/house');
        },
        editPlot: function(id){
            router.push({
                name: 'plot',
                params: {
                    'id': id
                }
            });
        },
        editFlat: function(id){
            router.push({
                name: 'flat',
                params: {
                    'id': id
                }
            })
        },
        editHouse: function(id){
            router.push({
                name: 'house',
                params: {
                    'id': id
                }
            })
        },
        removePlot: function(id){var vm = this;
            if(confirm('Are You Sure?')){
                firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection("Plots").doc(id).delete().then(()=>{
                    firebase.firestore().collection("Public").doc("Posts").collection("Plots").doc(id).delete().then(()=>{
                        vm.$toast("Plot Deleted Succesfully");
                    }).catch((e)=>{
                        vm.$toast(e.message)
                    })
                }).catch((e)=>{
                    vm.$toast(e.message);
                })
            }
        },
        removeFlat: function(id){var vm = this;
            if(confirm('Are You Sure?')){
                firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection("Flats").doc(id).delete().then(()=>{
                    firebase.firestore().collection("Public").doc("Posts").collection("Flats").doc(id).delete().then(()=>{
                        vm.$toast("Plot Deleted Succesfully");
                    }).catch((e)=>{
                        vm.$toast(e.message)
                    })
                }).catch((e)=>{
                    vm.$toast(e.message);
                })
            }
        },
        removeHouse: function(id){var vm = this;
            if(confirm('Are You Sure?')){
                firebase.firestore().collection('Users').doc(localStorage.getItem('uid')).collection("Houses").doc(id).delete().then(()=>{
                    firebase.firestore().collection("Public").doc("Posts").collection("Houses").doc(id).delete().then(()=>{
                        vm.$toast("Plot Deleted Succesfully");
                    }).catch((e)=>{
                        vm.$toast(e.message)
                    })
                }).catch((e)=>{
                    vm.$toast(e.message);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.all{
    .flex{
        display: flex;
        button{
            background: none;
            border: 1px solid black;
            padding: 0.7em;
            width: 30%;
        }
        button:hover{
            background: #B3E5FC;
            color: white;
        }
    }
}

.card {
  /* Add shadows to create the "card" effect */
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
@media screen and (min-width: 320px) {

    .all{
        h2{
            text-align: center;
            margin: 1em;
        }
        .flex{
            justify-content: space-between;
            padding: 1em;
        }
        .plots{
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


@media screen and (min-width: 800px){
    .all{
        height: 100vh;
        overflow: auto;
        .flex{
            select{
                display: none;
            }
        }
        h2{
            margin: 1em;
        }
        .plots{
            display: grid;
            grid-template-columns: 1fr 1fr;
            .plot{
                width: auto;
                img{
                width: 100%;
                height: 250px;
                font-size: 2em;
                }
                button{
                    display: block;
                }
                h3{
                    text-align: center;
                }
            }
        }
    }
}

@media screen and (min-width: 100px) {
    .all{
        .plots{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
}
</style>
