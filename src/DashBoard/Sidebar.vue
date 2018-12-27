<template>
    <nav>
        <ul>
            <li><button :class="{DashActive: DashBoard['All']}" @click="navAll">View All</button></li>
            <li><button :class="{DashActive: DashBoard['AddPlot']}" @click="navAddPlot">Add Plot</button></li>
            <li><button :class="{DashActive: DashBoard['AddFlat']}" @click="navAddFlat">Add Flat</button></li>
            <li><button :class="{DashActive: DashBoard['AddHouse']}" @click="navAddHouse">Add House</button></li>
        </ul>
    </nav>
</template>

<script>
import router from '../router'
import {mapState} from 'vuex'
export default {
    router,
    methods: {
        navAll(){
            router.push('/user')
        },
        navAddPlot(){
            router.push('/plot')
        },
        navAddFlat(){
            router.push('/flat')
        },
        navAddHouse(){
            router.push('/house')
        }
    },
    computed: {
        ...mapState(['DashBoard'])
    }
    
}
</script>

<style lang="scss" scoped>

.DashActive{
    border-bottom: 2px solid lightseagreen;
}
    nav{
        height: 95vh;
        border-right: 2px solid black;
        padding: 1em;
        width: 100%;
        ul{
            li{
                padding: 1em;
                font-size: 1.3em;
                button{
                    border: none;
                    background: none;
                    font-size: 1em;
                    cursor: pointer;
                }
            }
        }
    }
</style>

