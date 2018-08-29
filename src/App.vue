<template>
  <div id="app">
    <div class="router">
      <!-- <hr> -->
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase'
import router from './router.js'
export default {
      router,
      mounted(){
            this.check();
      },
      methods: {
            check: function(){
                  firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  //   router.push('/dashboard');
                } else {
                  //     router.push('/');
                    // No user is signed in.
                }
                });
            }
      }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900,900i');

  *{
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }


  

  #app{
    position: absolute;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
  }

  .active{
        border-bottom: 2px solid #AD974f;
  }

nav {
      overflow:hidden; 
      width: 100%;
      z-index: 10;
      position: absolute;
      padding: 8px;

      button{
            background: none;
            border: none;
            cursor: pointer;
            padding: 2em 0;
      }
}
 
.logo {
      margin-top: 15px;
      float: left;
      padding: 8px;
      margin-left: 16px;
}
 
.logo a {
      color: #AD974f;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 28px;
      letter-spacing: 0px;
      text-decoration: none;
      font-style: italic;
}
 
nav ul {
      margin-top: 12px;
      float: right;
}
 
nav ul li {
      display: inline-block;
      float: left;
}
 
nav ul li:not(:first-child) {
      margin-left: 48px;
}
 
nav ul li:last-child {
      margin-right: 60px;
}
 
nav ul li a {
      display: inline-block;
      outline: none;
      color: #fff;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 14px;
      letter-spacing: 1.2px;
      font-weight: 600;
      padding: 1em 0;
}


 

// FOR SMALLER SCREENS

@media screen and (max-width: 864px) {

  *{
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  .logo a{
        position: absolute fixed;
            display: block;
        font-size: 22px;
  }
      .logo {
            display: block;
            padding: 0;
      }
 
      .nav-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: #fff;
            opacity: 0;
            transition: all 0.2s ease;
      }
 
      .nav-wrapper ul {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
      }
 
      .nav-wrapper ul li {
            display: block;
            float: none;
            width: 100%;
            text-align: right;
            margin-bottom: 10px;
      }
 
      .nav-wrapper ul li:nth-child(1) a {
            transition-delay: 0.2s;
      }
 
      .nav-wrapper ul li:nth-child(2) a {
            transition-delay: 0.3s;
      }
 
      .nav-wrapper ul li:nth-child(3) a {
            transition-delay: 0.4s;
      }
 
      .nav-wrapper ul li:nth-child(4) a {
            transition-delay: 0.5s;
      }
 
      .nav-wrapper ul li:not(:first-child) {
            margin-left: 0;
      }
 
      .nav-wrapper ul li a {
            padding: 10px 24px;
            opacity: 0;
            color: #000;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1.2px;
            transform: translateX(-20px);
            transition: all 0.2s ease;
      }
 
      .nav-btn {
            position: fixed;
            right: 10px;
            top: 10px;
            display: block;
            width: 48px;
            height: 48px;
            cursor: pointer;
            z-index: 9999;
            border-radius: 50%;
      }
 
      .nav-btn i {
            display: block;
            width: 20px;
            height: 2px;
            background: #000;
            border-radius: 2px;
      }
 
      .nav-btn i:nth-child(1) {
            margin-top: 16px;
      }
 
      .nav-btn i:nth-child(2) {
            margin-top: 4px;
            opacity: 1;
      }
 
      .nav-btn i:nth-child(3) {
            margin-top: 4px;
      }

}
 

// NAV STYLING

#nav:checked + .nav-btn {
      transform: rotate(45deg);
}
 
#nav:checked + .nav-btn i {
      background: #000;
      transition: transform 0.2s ease;
}
 
#nav:checked + .nav-btn i:nth-child(1) {
      transform: translateY(6px) rotate(180deg);
}
 
#nav:checked + .nav-btn i:nth-child(2) {
      opacity: 0;
}
 
#nav:checked + .nav-btn i:nth-child(3) {
      transform: translateY(-6px) rotate(90deg);
}
 
#nav:checked ~ .nav-wrapper {
      z-index: 9990;
      opacity: 1;
}
 
#nav:checked ~ .nav-wrapper ul li a {
      opacity: 1;
      transform: translateX(0);
}
 
.hidden {
      display: none;
}

</style>
