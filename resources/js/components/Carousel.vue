<template>
    <carousel
            :per-page="1"
            :autoplay="true"
            :loop="true"
            :adjustableHeight="true"
            :centerMode="true"
            paginationPosition="bottom-overlay">
        <slide>
            <img src="../../../public/images/1.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/2.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/3.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/4.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/5.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/6.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
        <slide>
            <img src="../../../public/images/7.jpg" width="100%" height="400" class="img-fluid"/>
        </slide>
    </carousel>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';

    export default {

        components: {
            Carousel,
            Slide
        },

        data() {
            return {}
        },

        methods: {}
    }
</script>
