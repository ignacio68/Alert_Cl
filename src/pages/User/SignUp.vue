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
      <p>PAGINA DE REGISTRO</p>
      <p>{{ $t('lang.pages.signup.toolbar.title') }}</p>
    </div>
  </v-ons-page>
</template>

<script>
    export default {
      name: 'sign-up',
      data () {
        return {
          isActive: false,
          // toolbarTitle: this.$t('lang.pages.signup.toolbar.title')
        }
      },
      computed: {
        toolbarTitle () {
          return this.$t('lang.pages.signup.toolbar.title')
        }
      }
    }
</script>

<style scoped>

</style>
