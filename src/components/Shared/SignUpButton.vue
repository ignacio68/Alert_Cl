<template>
  <v-ons-button
    class="signUp__button"
    modifier="large"
    ripple="true"
    @click="parentMethod()"
    >
    <v-ons-icon
      class="signUp__button-icon"
      size="20px"
      ></v-ons-icon>
    {{ name }}
  </v-ons-button>
</template>

<script>
  export default {
    name: 'social-button',
    props: {
      name: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: ''
      }
    },
    methods: {
      parentMethod () {
        this.$emit('socialButtonEvent')
      }
    }
  }
</script>

<style scoped>
  .signUp__button {
    background-color: limegreen;
    color: white;
    margin-left: 20px;
    margin-right: 20px;
    text-align: left;
  }
  .signUp__button-icon {
    padding-right: 14px;
    margin-right: 10px;
    border-right: 1px solid white;
  }
</style>
