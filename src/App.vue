<template>
    <div id="app" class="container-fluid">
        <LaserPanel/>
    </div>
</template>

<script>
    import LaserPanel from './components/LaserPanel.vue'

    export default {
        name: 'App',
        components: {
            LaserPanel
        },
        methods: {

        },
        mounted() {
            document.addEventListener('dragstart', (event) => {
                event.preventDefault()
            })
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
