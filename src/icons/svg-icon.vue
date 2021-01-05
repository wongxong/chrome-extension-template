<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      icon: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.icon}`;
      }
    }
  }
</script>

<style lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
