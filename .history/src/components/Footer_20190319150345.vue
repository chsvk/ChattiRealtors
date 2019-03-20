<template>
    <div class="footer">
        <ul>
            <li><h3>About Us</h3></li>
            <li><router-link to="about">About</router-link></li>
            <!-- <li>Portfolio</li> -->
            <li><router-link to="contact">Contact</router-link></li>
        </ul>        
        <ul>
            <li><h3>Properties</h3></li>
            <li>Open Plots</li>
            <!-- <li>Flats</li> -->
            <!-- <li>Independent Houses</li> -->
        </ul>
        <ul>
            <li><h3>Socials</h3></li>
            <li>Follow Us On.</li>
            <li>
                <div class="flex">
                    
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
            padding: 1em;
            margin: 1em 0;
            color: white;

            ul{
                li{
                    font-size: 0.9em;
                    margin: 0.5em;
                    cursor: pointer;

                    a{
                        color: white;
                        text-decoration: none;
                    }

                    h3{
                        border-bottom: #C59F4C 2px solid;
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
