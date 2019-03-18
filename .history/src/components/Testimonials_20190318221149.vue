<template>
    <div class="testy">
      
    <!-- <swiper :options="swiperOption">
            <swiper-slide>
            <div class="item">
                <h3>Vision</h3>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus quibusdam minus, at ipsum obcaecati?</h4>
            </div>
        </swiper-slide>
                <swiper-slide>
            <div class="item">
                <h3>Mission</h3>
                <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id aliquam dolorum officia earum. Ad, nemo.</h4>
            </div>
        </swiper-slide>
        
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper> -->
    <swiper v-ref:swiper
        direction="horizontal"
        :mousewheel-control="true"
        :performance-mode="false"
        :pagination-visible="true"
        :pagination-clickable="true"
        :loop="true"
        @slide-change-start="onSlideChangeStart"
        @slide-change-end="onSlideChangeEnd">
    <div>Page 1</div>
    <div>Page 2</div>
    <div>Page 3</div>
</swiper>
    </div>
</template>

<script>
import Swiper from 'vue-swiper'
export default {
    data(){
        return{
            swiperOption: {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }
        }
    },
    components: {
        swiper,
    }
}
</script>

<style lang="scss" scoped>
.testy{
    .item{
        padding: 2em;
        h3{
            text-align: center;
            margin: 1em;
        }
        h4{
            font-weight: 100;
            text-align: center;
        }
    }
}
</style>
