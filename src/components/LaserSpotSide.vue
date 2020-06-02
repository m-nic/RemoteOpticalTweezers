<template>
    <div @mousedown="selectCircle" style="position: absolute;">
        <div class="line-h" :style="getCenterPos(circle, 45)"></div>
        <div class="line-v" :style="getCenterPos(circle, -45)"></div>

        <div class="draggable" ref="center" :style="getHandle(circle)"></div>

    </div>
</template>
<script>
    import {Events} from "@/misc/events";
    import {makeInteractable} from "@/misc/interactable";

    let handleSize = 25;

    export default {
        name: 'LaserSpotSide',
        props: ['circle'],

        data: () => ({}),

        methods: {
            selectCircle() {
                this.$emit(Events.CIRCLE_SELECT);
            },
            getCenterPos(circle, deg = 45) {
                return {
                    position: 'absolute',
                    width: `${circle.r * 2}px`,
                    height: '1px',
                    top: `${circle.cy}px`,
                    left: `${circle.z - circle.r}px`,
                    border: `1px ${circle.stroke} solid`,
                    'touch-action': `none`,
                    background: `${circle.fill}`,
                    transform: `rotate(${deg}deg)`,
                    'transform-origin': '50% 50%'
                };
            },
            getHandle(circle) {
                return {
                    position: 'absolute',
                    top: circle.cy + 'px',
                    left: circle.z + 'px',
                    transform: `translate(${-handleSize / 2}px, ${-handleSize / 2}px)`,
                    width: handleSize + 'px',
                    height: handleSize + 'px',
                    background: 'rgb(97,180,97)'
                };
            },
        },
        mounted() {
            makeInteractable(this.$refs.center, this.parent, (event) => {
                this.circle.z += parseInt(event.dx);
                this.circle.cy += parseInt(event.dy);
            });
        }
    };
</script>
<style>
    .draggable {
        box-sizing: border-box;

        touch-action: none;
        user-select: none;
    }
</style>