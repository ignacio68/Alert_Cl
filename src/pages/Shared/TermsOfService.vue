<template>
  <v-ons-page>
    <the-preloader v-if="isActive"
                   loaderBackgroundColor ="red"
                   loaderOpacity ="0.3"
                   loaderRippleWidth ="3em"
                   loaderRipperHeigth ="3em">
    </the-preloader>
    <the-custom-toolbar
      :backLabel="atras"
      :pageTitle="toolbarTitle" >
    </the-custom-toolbar>
    <div class="container">
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'terms-service',
    data () {
      return {
        isActive: false,
        atras: 'VOLVER'
      }
    },
    computed: {
      toolbarTitle () {
        return this.$t('lang.pages.service.toolbar.title')
      }
    }
  }
</script>

<style scoped>

</style>
