<template>
    <div class="contact">
        <div @submit.prevent="submitForm()" class="card">
            <h1>Happy To Help! 😁</h1>
            <input type="text" placeholder="Enter Name">
            <input type="text" placeholder="Enter Mobile">
            <button type="submit">Submit</button>
            <div class="contactSocials">
                <h4>Or Reach Us through: -</h4>
                <a href="https://wa.me/919849008487"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></a>
                <a href="mailto:bharathch.1994@gmail.com?Subject=Enquiry"><img src="https://img.icons8.com/color/48/000000/gmail.png"></a>
        </div>
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
            
            .card{
                padding: 1em;
                background: white;
                border-radius: 8px;
                width: 100%;
                margin-top: 15vh;
                margin-left: 30vw;
                h1{
                    text-align: center;
                    font-size: 1em;
                }
                input{
                    padding: 1em;
                    display: block;
                    margin: 1em;
                    width: 26vw;
                }
                button{
                    background: #42b983;
                    color: white;
                    border: none;
                    font-weight: bold;
                    padding: 1em;
                    margin: 1em;
                    width: 20vw;
                    cursor: pointer;
                }   
                .contactSocials{
                    display: flex;
                    h4{
                        margin: 1em;
                    }
                }
            }
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
