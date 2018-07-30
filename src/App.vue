<template>
  <div id="app">
    <div class="content">
      <div class="nav">
        <nav>
          <h3>Chatti Realtors</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/">Browse</router-link></li>
            <li><router-link to="/">Login/Register</router-link></li>
          </ul>
        </nav>
      </div>
    </div>
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
    display: grid;
    grid-template-rows: 5% auto;
    grid-template-areas: 
    'nav'
    'router';
    .content{
    }
    .router{
      // height: 100%;
    }
  }
  
  .nav{
    nav{
      background-color: #000000;

      h3{
      float: left;
      font-weight: 900;
      font-style: italic;
      font-size: 2em;
      margin: 0.6em;
    }
    ul{
      
      margin-top: 1.7em;
      float: right;
    }

    li{
      padding: 1em;
      margin: 1.3em;
      display: inline;
    }
    li a{
      color: black;
      text-decoration: none;
    }
    }
    

  }

  

</style>
