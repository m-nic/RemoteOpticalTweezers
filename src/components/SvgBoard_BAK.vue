<template>
    <div id="canvasId" style="position: relative">
        <template v-for="(circle, n) in allCircles">
            <div :key="'circ_' + n"
                 :style="`
                    position: absolute;
                    left: ${circle.cx}px;
                    top: ${circle.cy}px;
                    width: ${circle.r * 2 + 10};
                    height: ${circle.r * 2 + 10};
                    `"
            >

                <LaserSpot
                        v-bind="circle"
                        :circle="circle"
                        :n="n"
                        :fill="setFill(n)"
                        :show_no="show_no"
                        :stroke="circle.stroke"
                />
            </div>
        </template>
    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */

    import LaserSpot from "@/components/LaserSpot";
    import Axis from "@/components/axis";

    function distance(p1, p2) {
        let dx = p1.cx - p2.cx;
        let dy = p1.cy - p2.cy;

        return Math.sqrt(dx * dx + dy * dy);
    }

    export default {
        name: "SvgBoard",
        components: {
            Axis,
            LaserSpot
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
                // 'mousedown': (e) => self.startDrag(e, circle),
                // 'mousemove': (e) => self.onDrag(e, circle, r),
                // 'mouseup': (e) => self.stopDrag(e, circle),
                // 'touchstart': (e) => self.startDrag(e, circle),
                // 'touchmove': (e) => self.onDrag(e, circle, r),
                // 'touchend': (e) => self.stopDrag(e, circle),
            })
        }),
        methods: {
            getCenterHandle() {
                let handleSize = 20;

                return {
                    x: -handleSize / 2,
                    y: -handleSize / 2,
                    width: handleSize,
                    height: handleSize,
                    fill: 'rgb(97,180,97)'
                };
            },
            getRadiusHandle(circle) {
                let handleSize = 20;

                return {
                    x: circle.r - handleSize / 2,
                    y: -handleSize / 2,
                    width: handleSize,
                    height: handleSize,
                    fill: 'rgb(97,180,97)'
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
            onDrag: function (e, circle, r = false) {
                e = e.changedTouches ? e.changedTouches[0] : e;

                if (circle.dragging) {
                    let mousePos = {
                        cx: e.offsetX,
                        cy: e.offsetY,
                    };

                    if (r) {
                        circle.r = distance(circle, mousePos);
                    } else {
                        circle.cx = mousePos.cx;
                        circle.cy = mousePos.cy;
                    }
                }
            },
            stopDrag: function (e, circle) {
                if (circle.dragging) {
                    circle.dragging = false;
                }
            }
        },
        mounted() {
            let box = this.$el.getBoundingClientRect().toJSON();
            this.$el.style.width = this.w + 'px';
            this.$el.style.height = this.h + 'px';
        }
    }
</script>
<style>
    #canvasId {
        width: 100%;
        background: #eee;
    }
</style>