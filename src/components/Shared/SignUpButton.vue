<template>
  <v-ons-button
    class="signUp__button"
    modifier="large"
    ripple="true"
    @click="parentMethod(index)"
    >
    <v-ons-icon
      class="signUp__button-icon"
      icon=""></v-ons-icon>
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
      parentMethod (index) {
        this.$emit('socialButtonEvent')
      }
    }
  }
</script>

<style scoped>
  .signUp__button {
    background-color: limegreen;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 100px;
    text-align: left;
  }
  signUp__button-icon {
  }
</style>
