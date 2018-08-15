<template>
    <div class="content">
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
      
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>



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

  @media screen and (max-width: 864px) {

       .hero{
        position: relative;
    width: 105%;

      h1{
            font-size: 2.6em;
      }

      h3{
            font-size: 2em;
      }

      .particles{
        display: none;
  }

  }


  }
    

</style>

