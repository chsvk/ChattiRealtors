<template>
    <div class="products">
        <!-- <div class="menu">
            <div class="mobile">
                <select name="" id="">
                    <option value="">Select Product</option>
                    <option @click="loadPlots()" value="">Plots</option>
                    <option @click="loadFlats()" value="">Flats</option>
                    <option @click="loadHouses()" value="">Houses</option>
                </select>
            </div>
            <div class="desktop">
                <ul>
                    <li><button @click="loadPlots()">Plots</button></li>
                    <li><button @click="loadFlats()">Flats</button></li>
                    <li><button @click="loadHouses()">Houses</button></li>
                </ul>
            </div>
        </div> -->
        <router-view class="roter"/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import firebase from 'firebase'
import router from '../router'
export default {
    router,
    data(){
        return{
            products: []
        }
    },
    computed: {
        ...mapState(['MainNavState'])
    },
    methods: {
        loadPlots(){
            router.push('/products')
        },
        loadFlats(){
            router.push({
                name: 'flatList'
            })
        },
        loadHouses(){
            router.push({
                name: 'houseList'
            })
        }
    },
    mounted(){
        this.MainNavState['Products'] = true;
    },
    beforeDestroy(){
        this.MainNavState['Products']= false;
    }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width: 320px){
        .products{
            .menu{
                .mobile{
                    display: none;
                    select{
                        margin: 1em;
                        width: 80%;
                        padding: 1em;
                        option{
                            width: 80%;
                            margin: 1em;
                        }
                    }
                }
                .desktop{
                    display: none;
                }
            }
             .roter{
                    // margin-top: 2em;
                }
        }
    }
    @media screen and (min-width: 700px){
        .products{
            .menu{
                .mobile{
                    display: none;
                }
                .desktop{
                    display: block;
                    ul{
                        margin-left: 50%;   
                        li{
                            display: inline;
                            button{
                                background: none;
                                border: none;
                                padding: 0.7em;
                                font-weight: bold;
                                margin: 0.6em 0.7em;
                                cursor: pointer;
                                font-size: 1em;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 900px) {
        .products{
            .menu{
                .desktop{
                    ul{
                        margin-left: 70%;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1000px) {
        .products{
            .menu{
                .desktop{
                    ul{
                        margin-left: 70%;
                    }
                }
            }
        }
    }

    
</style>
