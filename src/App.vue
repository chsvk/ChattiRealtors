<template>
  <div id="app">
    <nav>
                  <input type="checkbox" id="nav" class="hidden">
                  <label for="nav" class="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                  </label>
                  <div class="logo">
                        <a href="#">Chatti Realtors</a>
                  </div>
                  <div class="nav-wrapper">
                        <ul>
                              <li><a href="#">Home</a></li>
                              <li><a href="#">Overview</a></li>
                              <li><a href="#">Prices</a></li>
                              <li><a href="#">Purchase</a></li>
                        </ul>
                  </div>
            </nav>
      <section class="hero">
        <h1>Chatti Realtors</h1>
        <h3>Better Investments. Better Profits</h3>
      </section>
      <section class="plots">
        plots will appear here
      </section>
      <section class="message">
        <h2>Sooner The Investment</h2>
        <h1>Higher The Profits</h1>
        <a href=""><router-link to="/">Invest Now</router-link></a>
      </section>
      <section class="investors">
        <h1>Looking For Investors?</h1>
        <h3>Post Your Property</h3>
        <a href=""><router-link to="/">Post Property</router-link></a>
      </section>
      <footer>
        &copy 2018 Chatti Realtors. Developed By Vamshi Krishna. 
      </footer>
    <div class="router">
      <!-- <hr> -->
      <router-view/>
    </div>
  </div>
</template>

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
  }

nav {
      overflow:hidden; 
      width: 100%;
      z-index: 10;
      position: absolute;
      padding: 8px;
}
 
.logo {
      margin-top: 15px;
      float: left;
      padding: 8px;
      margin-left: 16px;
}
 
.logo a {
      color: #fff;
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



  .hero{
    overflow-x: hidden;
    background:linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('./assets/images/HeroImage.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    height: 100vh;
    width: 100vw;
    h1{
      position: relative;
      top: 5em;
      font-weight: bold;
      color: white;
      font-size: 3.5em;
      text-align: center;
    }
    h3{
      color: white;
      position: relative;
      top: 8.3em;
      font-size: 2.1em;
      text-align: center;
    }

  }
 

// FOR SMALLER SCREENS

@media screen and (max-width: 864px) {

  *{
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  .hero{
    width: 105%;
  }
      .logo {
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
