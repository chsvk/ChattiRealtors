<template>
    <div class="footer">
        <ul>
            <li>About Us</li>
            <li>Portfolio</li>
            <li>Contact Us</li>
        </ul>        
        <ul>
            <li>Open Plots</li>
            <li>Flats</li>
            <li>Independent Houses</li>
        </ul>
        <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
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
            background: lightblue;
            display: flex;
            justify-content: space-between;
            padding: 2em;
            margin: 0 2em;

            ul{
                li{
                    margin: 1em;
                    cursor: pointer;
                }
            }
        }
    }
</style>
