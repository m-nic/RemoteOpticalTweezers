<template>
    <g>
        <line :x1="0"
              :y1="0"
              :x2="w"
              :y2="0" style="stroke:red;stroke-width:1px"/>

        <line :x1="0"
              :y1="0"
              :x2="0"
              :y2="h" style="stroke:red;stroke-width:1px"/>

        <text x="1ex" y="2ex">
            <tspan dx="-1">O</tspan>
        </text>

        <text :x="w - 10" y="2ex">
            <tspan dx="-1">X</tspan>
        </text>
        <text x="1ex" :y="h">
            <tspan dx="-1">Y</tspan>
        </text>
    </g>
</template>

<script>
    export default {
        name: "axis",
        props: ['w', 'h']
    }
</script>

<style scoped>

</style>