<template>
    <div class="footer">
        <ul>
            <li><h3>About Us</h3></li>
            <li><p><router-link to="about">About</router-link></p></li>
            <!-- <li>Portfolio</li> -->
            <li><router-link to="contact">Contact</router-link></li>
        </ul>        
        <ul>
            <li><h3>Properties</h3></li>
            <li><a href="">Open Plots</a></li>
            <!-- <li>Flats</li> -->
            <!-- <li>Independent Houses</li> -->
        </ul>
        <ul>
            <li><h3>Socials</h3></li>
            <li><p>Follow Us On</p></li>
            <li>
                <div class="flex">
                    <a href="https://www.facebook.com/chattirealtors"><img src="https://img.icons8.com/color/48/000000/facebook.png"></a>
                    <a href="https://www.instagram.com/chattirealtors"><img src="https://img.icons8.com/color/48/000000/instagram-new.png"></a>
                    <a href="https://twitter.com/BharathChatti"><img src="https://img.icons8.com/color/48/000000/twitter.png"></a>
                    <a href="https://www.linkedin.com/in/bharath-chatti-b66378182/"><img src="https://img.icons8.com/color/48/000000/linkedin.png"></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @media screen and (min-width: 320px) {
        .footer{
            background: #263238;
            display: flex;
            justify-content: space-around;
            color: white;
            height: 100%;

            ul{
                padding: 3em 0;
                height: 100%;
                li{
                    font-size: 0.9em;
                    margin: 0.5em;
                    cursor: pointer;

                    a{
                        color: lightgray;
                        text-decoration: none;
                        font-weight: 100;
                    }

                    a:hover{
                        color: white;
                        border-bottom: #C59F4C 1px solid;
                    }

                    h3{
                        border-bottom: #C59F4C 2px solid;
                    }

                    .flex{
                        display: flex;
                        img{
                            height: 35px;
                            width: 35px;
                        }
                    }
                }

            }
        }
    }

    @media screen and (min-width: 700px) {
        .footer{
            padding: 2em;

            ul{
                li{
                    font-size: 1.2em;
                    margin: 1em;
                }
            }
        }
    }
</style>
