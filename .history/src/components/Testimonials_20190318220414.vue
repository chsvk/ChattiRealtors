<template>
    <div class="testy">
    <swiper>
        <swiper-slide>
            <div class="item">
                <h3>Mission</h3>
                <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id aliquam dolorum officia earum. Ad, nemo.</h4>
            </div>
        </swiper-slide>
        <swiper-slide>
            <h3>Vision</h3>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus quibusdam minus, at ipsum obcaecati?</h4>
        </swiper-slide>
    </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style>

</style>
