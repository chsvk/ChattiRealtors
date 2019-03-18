<template>
  <div id="app">
    <nav>
      <div class="first">
      <div class="logo">
        <img @click="navHome" style="cursor: pointer" src="./assets/logo.png" alt="">
      </div>
      <i id="menubar" class="fa fa-bars menubar" aria-hidden="true"></i>
      <nav class="subMenufromMain">
        <ul>
          <li><button :class="{active: MainNavState['Home']}" @click="navHome">Home</button></li>
          <li><button :class="{active: MainNavState['Products']}" @click="navProducts">Products</button></li>
          <li v-if="!User"><button :class="{active: MainNavState['Authentication']}" @click="navAuth">Login/Register</button></li>
          <li v-else><button :class="{active: MainNavState['DashBoard']}" @click="navDash">DashBoard</button></li>
          <li><button :class="{active: MainNavState['Requirement']}" @click="navRequirement">Post Requirement</button></li>
          <li><button :class="{active: MainNavState['Recruitment']}" @click="navRecruitment">Recruitment</button></li>
          <li><button :class="{active: MainNavState['Contact']}" @click="navContact">Contact Us</button></li>
          <li v-if="User"><button @click="logout()">Logout</button></li>
        </ul>
      </nav>
      </div>
      <hr>
      <nav class="subMenu">
        <ul>
          <li><button @click="navSubHome">Home</button></li>
          <!-- <li><button @click="navSubProducts">Products</button></li> -->
          <li v-if="!User"><button @click="navSubAuth">Login/Register</button></li>
          <li v-else><button @click="navSubDash">DashBoard</button></li>
          <li><button @click="navSubRequirement">Post Requirement</button></li>
          <li><button @click="navSubRecruitment">Recruitment</button></li>
          <li><button @click="navSubContact">Contact Us</button></li>
          <li v-if="User"><button @click="logout()">Logout</button></li>
        </ul>
      </nav>
    </nav>
    <router-view class="roter"/>
    <footer>&copy;Chatti Realtors Developed By <a href="imvk.in">Chsvk</a></footer>
  </div>
</template>

<script>
import router from './router'
import firebase from 'firebase'
import {mapState} from 'vuex'
export default {
  router,
  data(){
    return{
      showMenu: false,
      User: false,
    }
  },
  computed:{
    ...mapState(['MainNavState'])
  },
  mounted(){
    var vm = this;
    document.getElementById('menubar').addEventListener('click', this.toggleMenuDisplay);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.User = true;
        localStorage.setItem('uid', user.uid);
        console.log('User exists');
      } else {
        vm.User = false;
        console.log('No user')
      }
    });
  },
  methods: {
    toggleMenuDisplay: function(){
      var style = getComputedStyle(document.querySelector('.subMenu'), null).display;
        if(style == "none"){
            document.querySelector('.subMenu').style.display = "block"
        }else{
            document.querySelector('.subMenu').style.display = 'none'
        }
    },
    logout: function(){var vm = this;
      firebase.auth().signOut().then(()=>{
        vm.$toast('Logged out Succesfully')
        localStorage.removeItem('uid');
        router.push('/');
      }).catch((e)=>{
        vm.$toast(e.message);
      })
    },
    // Navigation Methods
    navSubHome: function(){
      router.push('/');
      this.toggleMenuDisplay();
    },
    navProducts(){
      router.push('/products');
    },  
    navSubProducts(){
      router.push('/products');
      this.toggleMenuDisplay();
    },
    navSubAuth: function(){
      router.push('/auth')
      this.toggleMenuDisplay();
    },
    navSubDash: function(){
      router.push('/user')
      this.toggleMenuDisplay();
    },
    navSubRequirement: function(){
      router.push('/requirements')
      this.toggleMenuDisplay();
    },
    navSubRecruitment: function(){
      router.push('/recruitments')
      this.toggleMenuDisplay();
    },
    navSubContact: function(){
      router.push('/contact');
      this.toggleMenuDisplay();
    },
    navHome: function(){
      router.push('/');
    },
    navAuth: function(){
      router.push('/auth')
    },
    navDash: function(){
      router.push('/user')
    },
    navRequirement: function(){
      router.push('/requirements')
    },
    navRecruitment: function(){
      router.push('/recruitments')
    },
    navContact: function(){
      router.push('/contact');
    }
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700');
*{
  // font-family: 'Poppins', sans-serif;
  /* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: url('./Fonts/poppins-v6-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Poppins Regular'), local('Poppins-Regular'),
       url('./Fonts/poppins-v6-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./Fonts/poppins-v6-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('./Fonts/poppins-v6-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('./Fonts/poppins-v6-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./Fonts/poppins-v6-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
}
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
button:focus {outline:0;}
footer{
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.active{
            border-bottom: 2px solid black;
          }
#app{
  nav{
    .subMenufromMain{
      ul{
        li{
          .active{
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
@media screen and(min-width:300px) {
    nav{
      z-index: 999;
      display: flex;
      flex-direction: column;
      .first{
        display: flex;
        justify-content: space-between;
      }
      .logo{
        img{
          height: 30px;
          width: auto;
          padding-top: 0.7em;
        }
      }

      .menubar{
        font-size: 1.5em;
        margin-top: 0.4em;
        margin-right: 0.3em;
      }

      .subMenufromMain{
        display: none;
      }

      .subMenu{
        display: none;
      }

      nav{
        list-style: none;
        ul{
          list-style: none;
          li{
            text-align: center;
           button{
             font-size: 0.8em;
             padding-top: 0.7em;
             cursor: pointer;
             background: none;
             border: none;
             margin: 3% 0;
           }
          }
        }
      }
    }

    .roter{
      z-index: 12;
    }

    footer{
      padding: 1em;
      text-align: center;
      margin-top: 2em;
      a{
        text-decoration: none;
        font-weight: bolder;
      }
    }
}

@media screen and (min-width: 700px) {
    nav{
      .menubar{
        display: none;
      }

      .logo{
        img{
          height: 50px;
        }
      }

      .subMenu{
        display: none;
      }

      nav{
        display: none;
      }

      .subMenufromMain{
        display: block;
        ul{
          margin-left: -2%;
          li{
            display: inline;
            button{
              font-weight: bold;
              margin: 0 0.9em;
              margin-top: 3%;
              background: none;
              border: none;
              transition: 200ms;
            }

            button:hover{
              border-bottom: 2px solid lightblue;
            }
          }
        }
      }
    }
}

@media screen and (min-width: 1000px) {
  nav{
    .logo{
      img{
        height: 70px;
      }
    }

    .subMenufromMain{
      ul{
        li{
          button{
            font-size: 1em;
            margin-top: 4%;
          }
        }
      }
    }
  }
}


// Common CSS

.underbar{
  width: 0;
  height: 5px;
  background: rgba(100,100,200,0);
  //left: -50px;
  top: 20px;
  position: absolute;
  -webkit-transition: 0.5s ease;
}


</style>
