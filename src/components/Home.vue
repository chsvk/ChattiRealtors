<template>
    <div class="homeContent">
        <div class="mainSection">
        <div class="images">
        <div class="image1"></div>
        <div class="image2"></div>
        <div class="image3"></div>
        <div class="image4"></div>
        <div class="image5"></div>
        <div class="image6"></div>
        <div class="image7"></div>
        </div>
        <div class="info">
            <div class="details">
            <h3>Sooner the investment</h3>
            <h3> Higher the Profit</h3>
            <p>Call Now</p>
            <a class="dis" href="">+91 9849008487</a>
            </div>
            <div class="map">
            </div>
        </div>
        </div>
        <div class="cta">
            <h2>Stop Searching. Start Investing</h2>
            <h3>Our Experts will get you the right deal!</h3>
            <div class="padded">
            <p>Contact us at:</p>
            <a href="">+91 9849008487</a>
            </div>
        </div>
        <footer>
            &copy; Chatti Realtors - Developed by Chsvk
        </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style <style lang="scss" scoped>

    .mainSection{
        width: 100%;
        height: 95vh;
        display: grid;
        grid-template-columns: 80% auto;
        grid-template-areas: 
        'images info';

        .images{
            grid-area: images;
            display: grid;
            grid-template-areas: 
            'image1 image2 image2'
            'image3 image3 image4'
            'image5 image6 image7';
        }

        .image1{
            grid-area: image1;
            background: url('../assets/images/one.jpg');
            background-position: center;
            background-size: cover;
        }
        .image2{
            grid-area: image2;
            background: url('../assets/images/two.jpg');
            background-position: center;
            background-size: cover;
        }
        .image3{
            grid-area: image3;
            background: url('../assets/images/three.jpg');
            background-position: center;
            // background-size: cover;
        }
        .image4{
            grid-area: image4;
            background: url('../assets/images/four.jpg');
            background-position: center;
            background-size: cover;
        }
        .image5{
            grid-area: image5;
            background: url('../assets/images/five.jpg');
            background-position: center;
            background-size: cover;
        }
        .image6{
            grid-area: image6;
            background: url('../assets/images/six.jpg');
            background-position: center;
            background-size: cover;
        }
        .image7{
            grid-area: image7;
            background: url('../assets/images/seven.jpg');
            background-position: center;
            background-size: cover;
        }
        .info{
            text-align: center;
            grid-area: info;
            background: #b3e5fc;
            display: grid;
            grid-template-rows: 60% auto;
            grid-template-areas: 
            'details'
            'map';

            .details{
                grid-area: details;
            }

            .map{
                margin-top: 1em;
                grid-area: map;
                background: url('../assets/images/land.jpg');
                background-position: center;
            }

            h3{
                font-size: 2em;
                padding: 0.7em;
            }
            p{
                font-size: 1.6em;
                margin-bottom: 2em;
            }

            a{
                font-size: 1.5em;
                color: black;
                text-decoration: none;
            }

            .dis{
                margin-top: 1em;
                padding: 1em;
                border: 3px solid black;
            }
        }
    }

    .cta{
        background: #b3e5fc;
        text-align: center;

        h2{
            padding: 1em 2em;
            padding-bottom: 0.2em;
            font-size: 3.5em;
        }

        h3{
            padding: 0.7em;
            font-size: 2em;
        }

        .padded{
            padding-top: 0.6em;
            padding-bottom: 3em;
            p{
            font-size: 1.3em;
            margin-bottom: 2em;
        }

        a{
            margin-left: 20px;
            border: 3px solid black;
            padding: 1.5em;
            margin-bottom: 1em;
            text-decoration: none;
            font-size: 1.2em;
            color: black;
        }
        }
    }

    footer{
            background: #03a9f4;
            text-align: center;
            padding: 2em;
        }

</style>


</style>
