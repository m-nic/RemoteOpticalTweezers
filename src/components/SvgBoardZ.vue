<template>
    <!--    <svg id="canvasId2" :viewBox="`-${w/2} -${h/2} ${w} ${h}`" :style="`width: ${w}px; height: ${h}px`">-->
    <!--    <svg id="canvasId2" :viewBox="`-${w/2} 0 ${w} ${h}`" :style="`width: ${w}px; height: ${h}px`">-->
    <svg id="canvasId2">
        <axis :w="w" :h="h"/>

        <g>
            <line :x1="0"
                  :y1="-h"
                  :x2="0"
                  :y2="h" style="stroke:#929292;stroke-width:1px"/>

            <line :x1="-w"
                  :y1="0"
                  :x2="w"
                  :y2="0" style="stroke:#929292;stroke-width:1px"/>


            <template v-for="(circle, n) in allCircles">
                <g :key="'circ_' + n" :transform="'translate(' + circle.z + ',' + circle.cy + ')'">
                    <line :x1="-circle.r/2"
                          :y1="-circle.r/2"
                          :x2="circle.r/2"
                          :y2="circle.r/2" :stroke="circle.stroke" style="stroke-width:1px"/>

                    <line :x1="circle.r/2"
                          :y1="-circle.r/2"
                          :x2="-circle.r/2"
                          :y2="circle.r/2" :stroke="circle.stroke" style="stroke-width:1px"/>

                    <g @mousedown="$emit('selected-circle', circle)">
                        <rect v-bind="getCenterHandle(circle)" v-on="dragEvents(circle)"></rect>
                    </g>
                </g>
            </template>
        </g>
    </svg>
</template>
<script>

    import Axis from "@/components/axis";

    export default {
        name: "SvgBoardz",
        components: {
            Axis,
        },
        props: {
            w: {
                default: () => 512
            },
            h: {
                default: () => 512
            },
            allCircles: {
                default: () => ([])
            },
            show_no: {
                default: () => false,
            },
        },
        data: (self) => ({
            dragging: false,
            dragEvents: (circle, r) => ({
                'mousedown': (e) => self.startDrag(e, circle), 'touchstart': (e) => self.startDrag(e, circle),
                'mousemove': (e) => self.onDrag(e, circle, r), 'touchmove': (e) => self.onDrag(e, circle, r),
                'mouseup': (e) => self.stopDrag(e, circle), 'touchend': (e) => self.stopDrag(e, circle),
            })
        }),
        methods: {
            getCenterHandle(circle) {
                let handleSize = 20;

                return {
                    x: -handleSize / 2,
                    y: -handleSize / 2,
                    width: handleSize,
                    height: handleSize,
                    fill: circle.stroke
                };
            },
            setFill(n) {
                return parseInt(n) === parseInt(this.find) ? 'green' : '#fff';
            },
            selectCircle(circle, n) {
                console.log(n, circle)
            },

            startDrag: function (e, circle) {
                circle.dragging = true;
            },
            onDrag: function (e, circle) {
                e = e.changedTouches ? e.changedTouches[0] : e;

                if (circle.dragging) {
                    let mousePos = {
                        cy: e.offsetY,
                        z: e.offsetX,
                    };

                    circle.cy = mousePos.cy;
                    circle.z = mousePos.z;
                }
            },
            stopDrag: function (e, circle) {
                if (circle.dragging) {
                    circle.dragging = false;
                }
            }
        },
        mounted() {
            this.$el.style.width = this.w + 'px';
            this.$el.style.height = this.h + 'px';
        }
    }
</script>
<style>
    #canvasId2 {
        width: 100%;
        background: #eee;
    }
</style>