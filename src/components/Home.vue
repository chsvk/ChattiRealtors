<template>
    <div class="content">
      <div id="appp">
        <nav>
                  <input type="checkbox" id="nav" class="hidden">
                  <label for="nav" class="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                  </label>
                  <div class="logo">
                        <a>Chatti Realtors</a>
                  </div>
                  <div class="nav-wrapper">
                        <ul>
                              <li><a class="active" href="#">Home</a></li>
                              <li><a href="#">Products</a></li>
                              <li v-if="Nouser"><button @click="sendToLogin"><a>Login/Register</a></button></li>
                              <li v-else><a href="/dashboard">DashBoard</a></li>
                              <li><a href="#">Contact Us</a></li>
                              <li v-if="!Nouser"><a @click="logout" href="#">Logout</a></li>
                        </ul>
                  </div>
            </nav>
      </div>
      
        <section class="hero">
                  <h1>Chatti Realtors</h1>
        <h3>Better Investments. Better Profits</h3>
      </section>
      <vue-particles color="#AD974f"
        :particleOpacity="0.7"
        :particlesNumber="30"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push" class="particles" ></vue-particles>
        <div class="plotSection">
        <h1 class="plots_head">HMDA Open Plots</h1>
      <section class="plots">
        <article v-for="(plot, idx) in plots" :key="idx">
         <div class="plot animated fadeInUp">
             <agile :arrows="false" :dots="false" :speed=250>
               <div v-for="image in plot.Image" class="slide">
                 <img :src="image" alt="">
               </div>
             </agile>
             <div class="det">
             <h3>{{plot.Heading}}</h3>
             <button class="details">Full Details</button>
             </div>
         </div>
        </article>
      </section>
      </div>
      <section class="message">
        <h2>Sooner The Investment</h2>
        <h1>Higher The Profits</h1>
        <button><router-link to="/"><a>Invest Now</a></router-link></button>
      </section>
      <footer>
        <p>&copy; 2018 Chatti Realtors. Developed By <a href="imvk.in">Vamshi Krishna.</a> </p>
      </footer>
    </div>
</template>

<script>
import { db } from '../main'
import { functions } from 'firebase';
import firebase from 'firebase'
import router from '../router.js'
export default {
    router,
    name: 'home',
    components: {
       
  },
    data(){
        return{
            plots: [],
            Nouser: true,
        }
    },
    firestore () {
    return {
      plots: db.collection('Posts')
    }
  },
  mounted(){
    this.checkUser();
  },
  methods:{
    checkUser: function(){
      var vm = this;
      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user exist');
        vm.Nouser = false; 
          } else {
            vm.Nouser = true;
        console.log('No user');
      }
    });
    },
    logout: function(){
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    },
    sendToLogin: function(){
    router.push('/login');
  }
  },
  

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700,800,900,900i');
.content{
    height: 100vh;
    width: 100%;
}

#app{
  .logo{
    margin: 2em;
  }

  ul{
    margin: 2em;
  }
}

*{
  padding: 0;
  margin: 0;
  line-height: 1.5em;
}


.particles{
        display: block;
        position: relative;
        z-index: 1;
        height: 100vh;
  }

  .plotParticles{
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  }

  .plotSection{
    background: white;
  }

  .hero{
       
      position: absolute;
    overflow-x: hidden;
    background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/images/HeroImage.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    height: 100vh;
    width: 100vw;
    h1{
        z-index: 2;
      position: relative;
      top: 45%;
      font-weight: bold;
      color: white;
      font-size: 3.5em;
      text-align: center;
    }
    h3{
      z-index: 2;
      color: white;
      position: relative;
      top: 45%;
      font-size: 2.1em;
      text-align: center;
    }

  }

  .plots_head{
          font-family: 'Roboto';
          font-weight: bold;
          text-transform: uppercase;
          padding: 3em 2em 2em 2em;
          text-align: center;
          font-size: 2em;
          letter-spacing: 1.2px;
          color: #231f20;
  }

  .plots{
    width: 95%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 3em;
  }

  .plot{
    height: 380px;
    width: 300px;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 15px;

    img{
      width: 300px;
      height: 250px;
    }

    h3{
      text-align: center;
    }

    .details{
      position: absolute;
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
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    height: 390px;
    width: 305px;
  }

  .message{
    margin-top: 6em;
    background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(../assets/images/messageback.jpg);
    background-attachment: fixed;
    text-align: center;
    color: white;
    padding: 7em;

    h2{
      font-size: 3em;
    }

    h1{
      font-size: 2.7em;
    }

    button{
      margin-top: 2em;
      width: 20em;
      padding: 0.9em;
      background: #AD974f;
      transition: 0.3s;
      border: none;
      border-radius: 5px;
    }

    button:hover{
      width: 22em;
    }

    a{
      text-decoration: none;
      color: #231f20;
      font-size: 1.3em;
    }
  }

  .investors{
    margin-top: 6em; 
    display: grid;
    grid-template-columns: 50% auto;
    height: 70%;

    .detai{
      height: 40%;
      margin: auto;
      text-align: center;
      font-size: 2em;

      a{
        margin: 3em;
        text-decoration: none;
        color: #231f20;
        font-style: italic;
        transition: 0.3s;
      }
      a:hover{
        color: black;
        text-decoration: underline;
      }
    }

    .back{
      background: url('../assets/images/investor.jpg');
      background-size: cover;
      background-position: center;
      box-shadow: 0 0 8px 8px white inset;
    }
  }

  footer{
      text-align: center;
      padding: 1em;
    }

  @media screen and (max-width: 864px) {

  .particles{
        display: none;
  }

       .hero{
        position: relative;
    width: 105%;

      h1{
            font-size: 2.6em;
      }

      h3{
            font-size: 2em;
      }
  }

  .plots{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .plot{
    margin: 2em;
  }
     


  }
    

</style>

