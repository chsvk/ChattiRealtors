<template>
    <div class="dashboard">
        <sidebar class="sidebar"></sidebar>
        <router-view class="roter"/>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import {mapState} from 'vuex'
import firebase from 'firebase'
import router from '../router'
export default {
    router,
    components: {
        Sidebar
    },
    computed: {
        ...mapState(['MainNavState'])
    },
    mounted(){var vm = this;
        if(firebase.auth().currentUser){

        }else{
            vm.$toast('Please Login To Continue');
            router.push('/auth');
        }
        this.MainNavState['DashBoard'] = true;
    },
    beforeDestroy(){
        this.MainNavState['DashBoard'] = false;
    }
}
</script>

<style lang="scss" scoped>

.dashboard{
    display: flex;
    .roter{
        width: 100%;
    }
}



@media screen and (min-width: 320px) {
    .dashboard{
        .sidebar{
            display: none;
        }
    }
}

@media screen and (min-width: 700px) {
    .dashboard{
        .sidebar{
            display: block;
            width: 25%;
        }
    }
}

@media screen and (min-width: 1000px) {
    .dashboard{
        .sidebar{
            width: 15%;
        }
    }
}
</style>
