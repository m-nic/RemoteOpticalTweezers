<template>
    <div v-if="open">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'windowPortal',
        model: {
            prop: 'open',
            event: 'close'
        },
        props: {
            open: {
                type: Boolean,
                default: false,
            },
            width: {
                default: 512,
            },
            height: {
                default: 512,
            }
        },
        data() {
            return {
                windowRef: null,
            }
        },
        watch: {
            open(newOpen) {
                if (newOpen) {
                    this.openPortal();
                } else {
                    this.closePortal();
                }
            }
        },
        methods: {
            openPortal() {
                this.windowRef = window.open("", "", `width=${this.width},height=${this.height},left=1000,top=0`);
                this.windowRef.document.title = 'SLM View';
                let style = document.createElement('style');
                style.innerHTML = `
                    body {margin: 0; padding: 0; overflow: hidden}
                    canvas {position:absolute; top:0; left:0}
                `;
                this.windowRef.document.head.appendChild(style);
                this.windowRef.document.body.appendChild(this.$el);
                this.windowRef.addEventListener('beforeunload', this.closePortal);
            },
            closePortal() {
                if (this.windowRef) {
                    this.windowRef.close();
                    this.windowRef = null;
                    this.$emit('close');
                }
            }
        },
        mounted() {
            if (this.open) {
                this.openPortal();
            }
        },
        beforeDestroy() {
            if (this.windowRef) {
                this.closePortal();
            }
        }
    }
</script>