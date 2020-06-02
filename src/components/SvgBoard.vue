<template>
    <div class="drawing-board" style="position: relative">
        <div class="axis origin">O</div>
        <div class="axis top-axis">{{ topAxis }}</div>
        <div class="axis left-axis">{{ leftAxis }}</div>

        <template v-for="([id, circle]) of Object.entries(allCircles)">
            <template v-if="side === 1">
                <LaserSpotSide :key="id" :circle="circle" @circle-select="selectCircle(circle)"/>
            </template>
            <template v-else-if="side === 2">
                <LaserSpotSide2 :key="id" :circle="circle" @circle-select="selectCircle(circle)"/>
            </template>
            <template v-else>
                <LaserSpot :key="id" :circle="circle" @circle-select="selectCircle(circle)"/>
            </template>
        </template>
    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */

    import LaserSpot from "@/components/LaserSpot";
    import Axis from "@/components/axis";
    import {Events} from "@/misc/events";
    import LaserSpotSide from "@/components/LaserSpotSide";
    import LaserSpotSide2 from "@/components/LaserSpotSide2";

    export default {
        name: "SvgBoard",
        components: {
            Axis,
            LaserSpot,
            LaserSpotSide,
            LaserSpotSide2,
        },
        props: {
            w: {
                default: () => 512
            },
            h: {
                default: () => 512
            },
            allCircles: {
                default: () => ({})
            },
            show_no: {
                default: () => false,
            },
            side: {
                default: () => false,
            },
            topAxis: {
                default: () => 'X'
            },
            leftAxis: {
                default: () => 'Y'
            }
        },
        data: (self) => ({}),
        methods: {
            setFill(n) {
                return parseInt(n) === parseInt(this.find) ? 'green' : '#fff';
            },
            selectCircle(circle) {
                this.$emit(Events.CIRCLE_SELECT, circle);
            },
        },
        mounted() {
            this.$el.style.width = this.w + 'px';
            this.$el.style.height = this.h + 'px';

            document.addEventListener('dragstart', (event) => {
                event.preventDefault()
            })
        }
    }
</script>
<style lang="scss">
    .drawing-board {
        width: 100%;
        background: #eee;
        overflow: hidden;

        border-top: 1px dashed green;
        border-left: 1px dashed green;

        .axis {
            position: absolute;
            top: 3px;
            left: 3px;

            z-index: 9999;

            &.top-axis {
                right: 5px;
                left: auto;
            }

            &.left-axis {
                bottom: 0;
                top: auto;
            }
        }
    }

</style>