<template>
    <div class="postAdContent">
         <div class="container">
             <h3>Post Your AD </h3>
        <hr>
        <div class="detailsGrid">
        <div class="propertyType">
        <h4>Type of Property:</h4>
        <ul>
            <li><input type="radio" name="Houses" id="" v-model="House"> Houses</li>
            <li><input type="radio" name="Lands" id="" v-model="Lands"> Lands</li>
            <li><input type="radio" name="Plots" id="" v-model="Plots"> Plots</li>
        </ul>
        </div>
        <div class="details">
        <h4>Property Details</h4>
        <ul>
            <li><input class="textBox" type="text" name="" id="" placeholder="Enter City"></li>
            <li><input class="textBox" type="text" name="" id="" placeholder="Enter Area"></li>
        </ul>
        </div>
        <div class="pdetails">
            
        <h4>Price Details</h4>
        <ul>
            <li><input class="textBox" type="text" name="" id="" placeholder="Enter Price"></li>
            <li><input class="textBox" type="text" name="" id="" placeholder="Per sq.ft"></li>
        </ul>
        </div>
        <div class="transaction">
            <h4>Transaction Type</h4>
            <ul>
            <li><input type="radio" name="Houses" id="" v-model="House"> Resale</li>
            <li><input type="radio" name="Lands" id="" v-model="Lands"> New</li>
            </ul>
        </div>
        <div class="available">
            <h4>Available From</h4>
            <ul>
            <li><input class="textBox" type="text" name="" id="" placeholder="Month"></li>
            <li><input class="textBox" type="Number" name="" id="" placeholder="Year"></li>
        </ul>
        </div>
        </div>
        <hr>
        </div>
    </div>
</template>

<script>
export default {
    data: {
        return(){
            House,
            Lands,
            Plots
        }
    }
}
</script>

<style <style lang="scss" scoped>

    *{
        margin: 0;
        padding: 0;
    }

    .container{
        background-color: white;
        align-content: center;
        width: 90%;
        margin: 0 auto; 

        h3{
            font-size: 1.4em;
        }
    }

    .postAdContent{
        background-color: #B388FF;
        h3{
            // float: left;
            margin-left: 55px;
            padding: 1em;
        }

        h4{
            padding: 1em;
        }

        .propertyType{
            padding: 1em;
            display: grid;
        }
    }

    li{
        padding: 1em;
        list-style-type: none;
        display: inline-block;
    }

    li a{
        padding: 0.7em;
        font-weight: bold;
    }

    .textBox{
        margin-left: 10px;
        padding: 1em;
    }

    .property-details{
        padding: 1em;

    }


    .detailsGrid{
        display: grid;
        grid-template-areas: 
        'property property area cost'
        'transaction available area cost';

        .propertyType{
            grid-area: property;
            display: grid;
            grid-template-columns: 45% auto;

            ul{
               display: grid;
               grid-template-columns: 1fr 1fr 1fr;
            }
        }

        .details{
            margin-left: 50px;
            h4{ 
                padding: 2em;
            }
            input{
                width: 90px;
            }
            grid-area: area;
        }

        .pdetails{
            
            input{
                width: 80px;
            }
            grid-area: cost;
        }

        .transaction{
            grid-area: transaction;
        }

        .available{
            grid-area: available;
            ul{
                display: grid;
                grid-template-columns: 50% auto;
            }
            input{
                margin: 0;
                width: 60px;
            }
        }
    }


</style>


</style>
