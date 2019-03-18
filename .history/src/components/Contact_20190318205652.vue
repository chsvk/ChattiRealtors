<template>
    <div class="contact">
        <div @submit.prevent="submitForm()" class="card">
            <input type="text" placeholder="Enter Name">
            <input type="text" placeholder="Enter Mobile">
            <button type="submit">Submit</button>
        </div>
        <div class="contactSocials">
            <a href=""><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></a>
            <a href=""><img src="https://img.icons8.com/color/48/000000/gmail.png"></a>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['MainNavState'])
    },
    mounted(){
        this.MainNavState['Contact'] = true;
    },
    beforeDestroy(){
        this.MainNavState['Contact'] = false;
    }
}
</script>

<style lang="scss" scoped>

*{
    overflow-x: hidden;
}

.flex{
    margin: 1em;
    display: flex;
    img{
        margin: 0 5%;
    }
}

    @media screen and (min-width: 320px) {
        .contact{
            height: 100vh;
            width: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.8) ),url('../assets/contact.jpeg');
        }
    }

    @media screen and (min-width: 700px) {
        .contact{
           
        }
        
    }

    @media screen and (min-width: 1000px) {
        .contact{
        }
    }

</style>
