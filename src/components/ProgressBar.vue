<template>
    <div class="loading" v-if="is_loading">
        <div class="loading-box text-center" v-if="!requestError">
            <div class="lds-dual-ring"></div>
            <p>Va rugam asteptati</p>
        </div>
        <div class="loading-box text-center" v-else>
            <p>Se pare ca a aparut o eroare.</p>
            <div class="text-center">
                <button class="btn btn-sm btn-warning" @click="closeLoading()">
                    Inchidere
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProgressBar',
        data: () => ({
            is_loading: false
        }),
        methods: {
            show() {
                this.is_loading = true;
            },
            hide() {
                this.is_loading = false;
            }
        }
    }
</script>
<style lang="scss">
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;

        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.7);
    }

    .loading .loading-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px #e8e8e8 solid;
        border-radius: 4px;
        width: 250px;
        height: 190px;
        background: rgb(255, 255, 255);
    }

    .lds-dual-ring {
        display: inline-block;
        width: 100px;
        height: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 100px;
        height: 100px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #e8e8e8;
        border-color: #e8e8e8 transparent #e8e8e8 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>