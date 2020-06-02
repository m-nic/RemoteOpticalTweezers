<template>
    <div class="col-xs-12">
        <ProgressBar/>

        <div class="row">
            <div class="col-xs-12 col-md-4">
                <SvgBoard :allCircles="allCircles" @circle-select="selected"/>
            </div>
            <div class="col-xs-12 col-md-4">
                <SvgBoard :allCircles="allCircles" @circle-select="selected" :side="1" topAxis="Z"/>
            </div>
            <div class="col-xs-12 col-md-4">
                <div class="col-xs-12">
                    <div class="form-horizontal text-left">
                        <div class="form-group">
                            <label>X:</label>
                            <input id="X" class="form-control" type="number" step="1" v-model="currentCircle.cx">
                        </div>
                        <div class="form-group">
                            <label>Y:</label>
                            <input id="Y" class="form-control" type="number" step="1" v-model="currentCircle.cy">
                        </div>
                        <div class="form-group">
                            <label>R:</label>
                            <input id="R" class="form-control" type="number" step="1" v-model="currentCircle.r">
                        </div>
                        <div class="form-group">
                            <label>z:</label>
                            <input id="z" class="form-control" type="number" step="0.00000001" v-model="currentCircle.z">
                        </div>
                        <div class="form-group">
                            <label>Color:</label>
                            <input id="Color" type="color" v-model="currentCircle.stroke">
                        </div>

                        <div class="form-group text-center">
                            <button class="btn btn-success" @click="addCircle()">
                                <i class="glyphicon glyphicon-plus-sign"></i>
                                Add spot
                            </button>
                            &nbsp;
                            <button class="btn btn-danger" @click="removeCircle(currentCircle)">
                                <i class="glyphicon glyphicon-remove"></i>
                                Remove spot
                            </button>
                            &nbsp;
                            <button class="btn btn-primary" @click="slmView()">
                                <i class="glyphicon glyphicon-th"></i>
                                Open SLM VIEW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 6px">
            <div class="col-xs-12 col-md-4">
                <SvgBoard :allCircles="allCircles" @circle-select="selected" :side="2" leftAxis="Z"/>
            </div>
        </div>

        <windowPortal v-model="open">
            <template v-for="([i, circle]) of Object.entries(allCircles)">
                <slmView :key="i" :circle="circle" :count="Object.entries(allCircles).length"/>
            </template>
        </windowPortal>

    </div>

</template>

<script>
    import ProgressBar from "@/components/ProgressBar";
    import SvgBoard from "@/components/SvgBoard";
    import {Circle, CircleConfig, DefaultCircle} from "@/misc/circle";
    import SvgBoardZ from "@/components/SvgBoardZ";
    import WindowPortal from "@/components/windowPortal";
    import SlmView from "@/components/SlmView";
    import {Helpers} from "@/misc/helpers";

    CircleConfig.canvasWidth = 1024;
    CircleConfig.canvasHeight = 1024;

    let remoteFn = () => {
    };

    export default {
        name: 'LaserPanel',
        components: {
            WindowPortal,
            ProgressBar,
            SvgBoard,
            SvgBoardZ,
            SlmView,
        },
        data: () => ({
            allCircles: [],
            defaultR: 50,
            currentCircle: {},
            open: false,
        }),
        methods: {
            addCircle(circle = null) {

                if (!circle) {
                    circle = new Circle(256, 256, this.defaultR);
                    circle.id = Helpers.generateUUID();
                }

                this.$set(this.allCircles, circle.id, circle);

                this.registerWatcher(circle);

                this.selected(circle);
            },
            registerWatcher(circle) {

                this.$watch(() => circle, (newVal) => {
                    if (newVal.noCall) {
                        delete newVal.noCall;
                    } else {
                        remoteFn(newVal);
                    }
                }, {deep: true, immediate: true});
            },
            removeCircle(circle) {
                circle.toRemove = true;

                if (!circle.noCall) {
                    remoteFn(circle);
                }

                this.$delete(this.allCircles, circle.id);
            },
            selected(circle) {
                this.currentCircle = circle;
            },
            getRemoteStatus() {
                return this.allCircles;
            },
            fromRemote(circle) {
                if (this.allCircles[circle.id]) {

                    circle.noCall = true;
                    if (circle.toRemove) {
                        this.removeCircle(circle);
                    } else {
                        if (Helpers.hasDifferentProps(this.allCircles[circle.id], circle)) {
                            Object.assign(this.allCircles[circle.id], circle);
                        }
                    }
                } else {
                    this.addCircle(circle);
                }
            },
            slmView() {
                this.open = !this.open;
            },
        },
        mounted() {
            let $rpc = this.$rpc('vue', this);

            remoteFn = _.throttle($rpc.fromRemote, 25);
        },
    }
</script>

<style scoped>
</style>
