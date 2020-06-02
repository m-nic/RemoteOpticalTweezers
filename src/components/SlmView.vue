<template>
    <canvas></canvas>
</template>
<script>
    import {makeFresnelCircle} from "@/fresnel/wasmfresnelwrapper";

    // import {makeFresnelCircle} from "@/fresnel/fresnel-worker";

    function canvasCoordsFor(imData, count) {
        return {
            set: (ind, {r, g, b, a = 255}) => {
                ind *= 4;
                imData[ind] = r;
                imData[ind + 1] = g;
                imData[ind + 2] = b;
                imData[ind + 3] = Math.ceil(a / count);
            }
        };
    }

    function initDrawFn(canvas, N = 512) {
        var ctx = canvas.getContext("2d");

        canvas.width = N;
        canvas.width = N;
        ctx.canvas.width = N;
        ctx.canvas.height = N;

        let imageData = ctx.getImageData(0, 0, N, N);

        return function (xc = N / 2, yc = N / 2, r = 50, z = 1e-9, count = 1) {
            let fn = canvasCoordsFor(imageData.data, count);

            let fresnelIntArray = makeFresnelCircle(xc, yc, r, z, N);

            fresnelIntArray.then((data) => {
                    data.forEach((col, j) => {
                        col = col * 255;
                        fn.set(j, {r: col, g: col, b: col})
                    });

                    ctx.putImageData(imageData, 0, 0);
                });
        }
    }

    export default {
        name: 'slmView',
        props: {
            N: {
                default: () => 512
            },
            circle: {
                default: () => ([]),
            },
            count: {
                default: () => 0,
            }
        },
        data: () => ({
            drawFn: (xc = N / 2, yc = N / 2, r = 50, z = 1e-9, count = 1) => {
            }
        }),
        watch: {
            circle: {
                handler(newVal, oldVal) {
                    setTimeout(() => {
                        this.drawFn(this.circle.cx, this.circle.cy, this.circle.r, this.circle.z, this.count);
                    });
                },
                deep: true
            },
            count: {
                handler(newVal, oldVal) {
                    setTimeout(() => {
                        this.drawFn(this.circle.cx, this.circle.cy, this.circle.r, this.circle.z, this.count);
                    });
                },
                deep: true
            }
        },
        mounted() {
            this.drawFn = _.throttle(initDrawFn(this.$el, this.N), 50);

            this.drawFn(this.circle.cx, this.circle.cy, this.circle.r, this.circle.z, this.count);
        }
    }
</script>