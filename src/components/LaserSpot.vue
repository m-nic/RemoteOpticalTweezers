<template>
    <div @mousedown="selectCircle" style="position: absolute;">
        <div ref="circ" class="draggable" :style="circleStyle(circle)"></div>
        <div class="draggable" ref="radius" :style="getRadiusHandle(circle)"></div>
    </div>
</template>
<script>
    import {Events} from "@/misc/events";
    import {makeInteractable} from "@/misc/interactable";

    let handleSize = 25;

    export default {
        name: 'LaserSpot',
        props: ['circle'],

        data: () => ({}),

        methods: {
            selectCircle() {
                this.$emit(Events.CIRCLE_SELECT);
            },
            circleStyle(circle) {
                return `
                    width: ${circle.r * 2}px;
                    height: ${circle.r * 2}px;
                    top: 0;
                    left: 0;
                    transform: translate(${circle.cx - circle.r}px, ${circle.cy - circle.r}px);
                    border-radius: 50%;
                    border: 1px ${circle.stroke} solid;
                    touch-action: none;
                    background: ${circle.fill};`;
            },
            getRadiusHandle(circle) {
                return {
                    position: 'absolute',
                    top: circle.cy + 'px',
                    left: circle.cx + circle.r + 'px',
                    transform: `translate(${-handleSize / 2}px, ${-handleSize / 2}px)`,
                    width: handleSize + 'px',
                    height: handleSize + 'px',
                    background: 'rgb(97,180,97)'
                };
            },
        },
        mounted() {
            makeInteractable(this.$refs.circ, this.parent, (event) => {
                this.circle.cx += parseInt(event.dx);
                this.circle.cy += parseInt(event.dy);
            });

            makeInteractable(this.$refs.radius, this.parent, (event) => {
                this.circle.r += parseInt(event.dx);
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