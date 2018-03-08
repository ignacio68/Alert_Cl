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
      :pageTitle="title">
    </the-custom-toolbar>
    <div class="container">
      <p>{{ $t('lang.pages.global.text1') }}</p>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'home',

  // created () {
  //  setTimeout(this.isActive = !this.isActive, 5000)
  // },

  data () {
    return {
      title: 'INICIO',
      atras: 'volver',
      isActive: false
    }
  }
}
</script>

<style scoped>
</style>
