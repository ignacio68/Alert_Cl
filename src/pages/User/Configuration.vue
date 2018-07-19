<template>
  <v-ons-page>
    <the-preloader v-if="isActive"
                   loaderBackgroundColor ="red"
                   loaderOpacity ="0.3"
                   loaderRippleWidth ="3em"
                   loaderRipperHeigth ="3em">
    </the-preloader>
    <the-custom-toolbar
      :pageTitle="toolbarTitle" >
    </the-custom-toolbar>
    <div class="container">
      <p>Esta es la página de configuración</p>
      <v-ons-button
        name="saveButton"
        class="save__button center"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.pages.configuration.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  import HomePage from '../HomePage'
  export default {
    name: 'configuration',
    data () {
      return {
        isActive: false,
        volver: ''
      }
    },
    computed: {
      toolbarTitle () {
        return this.$t('lang.pages.configuration.toolbar')
      }
    },
    methods: {
      onSave () {
        this.$store.commit('navigator/push', HomePage)
      }
    }
  }
</script>

<style scoped>

</style>