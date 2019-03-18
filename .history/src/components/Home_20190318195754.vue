<template>
    <div class="home">
        <div class="hero">
            <img src="../assets/mainHero.jpg" alt="">
            <h1>Better Investments Better Profits</h1>
        </div>
        <!-- <div class="minorMenu">
            <div @click="navPlots()" class="minorItem">
                <i class="fa fa-building-o" aria-hidden="true"></i>
                <h3>Open Plots</h3>
            </div>
            <div @click="navFlats()" class="minorItem">
                <i class="fa fa-building" aria-hidden="true"></i>
                <h3>Apartment-Flats</h3>
            </div>
            <div @click="navHouses()" class="minorItem">
                <i class="fa fa-home" aria-hidden="true"></i>
                <h3>Independent Houses</h3>
            </div>
        </div> -->
        <!-- <div @click="navPlots()" class="widerMenu">
            <div class="menuItem">
                <h3>Open Plots</h3>
                <img src="../assets/openLands.jpg" alt="" srcset="">
            </div>
            <div @click="navFlats()" class="menuItem">
                <h3>Apartment-Flats</h3>
                <img src="../assets/flats.jpg" alt="" srcset="">
            </div>
            <div @click="navHouses()" class="menuItem">
                <h3>Independent Houses</h3>
                <img src="../assets/houses.jpg" alt="" srcset="">
            </div>
        </div> -->
        <PlotList/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import router from '../router'
import PlotList from '@/Products/PlotList'
export default {
    router,
    components: {
        PlotList
    },
    data(){
        return{
            plots: []
        }
    },
    computed:{
        ...mapState(['MainNavState']),
    },
    mounted(){var vm = this;
        this.MainNavState['Home'] = true;
        // console.log(this.MainNavState);
    },
    beforeDestroy(){
        this.MainNavState['Home'] = false;
    },
    methods:{
        navPlots(){
            router.push('/products')
        },
        navFlats(){
            router.push({
                name: 'flatList'
            })
        },
        navHouses(){
            router.push({
                name: 'houseList'
            })
        }
    }
}
</script>
<style lang="scss" scoped>

@media screen and (min-width: 300px) {

    .home{
        .hero{
            background: rgba(0, 0, 0, 1);
            height: auto;
            position: relative;
            h1{
                text-align: center;
                top: 30%;
                left: 6.5%;
                position: absolute;
                color: white;
                font-size: 1.78em;
                -webkit-text-stroke: 0.4px black;
                left: 2%;
                right: 2%;
                margin: auto;
            }
            img{
                width: 200%;
                height: 500px;
                background: inear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7));
                background-repeat: none;
                background-size: cover;
                background-position: center;
                -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
                mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
      
            }
            
        }

        .minorMenu{
            top: 50%;
            left: 0;
            right: 0;
            margin: auto;
            position: absolute;
            display: block;
            display: flex;
            flex-direction: column;
            width: 80%;
            .minorItem{
                margin: 0.6em;
                display: flex;
                background: white;
                padding: 0.8em;
                width: 90%;
                i{
                    font-size: 2em;
                    margin: 0 0.4em;
                }
            }
        }

        .widerMenu {
            display: none;
            margin-top: -10%;
            .menuItem{
                padding: 1em 0;
                margin-top: 10%;
                margin-left: 5%;
                img{
                    height: 40%;
                    width: 90%;
                    margin-left: 2.5%;
                }

                h3{
                    padding: 0.6em;
                    text-align: center;
                    text-shadow: 10px 11px 14px rgba(160, 150, 150, 0.54);
                }
            }
        }
    }

}


@media screen and (min-width: 700px) {
    .home{

        .hero{
            height: 70vh;
            h1{
                font-size: 2em;
                top: 35%;
            }
            img{
                width: 100%;
                height: 98%;
            }
        }
        .minorMenu{
            display: none;
        }

        .widerMenu{
            display: block;
            margin-left: -1%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            margin-top: 0%;
            .menuItem{
                cursor: pointer;
                padding: 1em;
                margin: 1em;
                overflow: hidden;
                margin-top: 13%;
                
                img{
                    border-radius: 18px;
                    width: 100%;
                    height: 78%;
                    transition: 250ms;
                }

                h3{
                    font-size: 1.6em;
                    margin-bottom: 0.7em;
                }

                img:hover{
                    -webkit-box-shadow: 0 12px 18px -6px black;
                    -moz-box-shadow: 0 12px 18px -6px black;
                        box-shadow: 0 12px 18px -6px black;
                    width: 101%;
                    height: 80%;
                }
            }
        }
    }
}

@media screen and (min-width: 1000px) {
    .home{
        .hero{
            h1{
                font-size: 3em;
            }
        }
    }
}




//  Common CSS

        .card {
            width: auto;
            height: auto;
            /* Add shadows to create the "card" effect */
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
            transition: 0.3s;
            }

            /* On mouse-over, add a deeper shadow */
            .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
</style>

