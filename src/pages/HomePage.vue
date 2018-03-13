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
      <p>{{ $t('lang.pages.global.text2') }}</p>
      <p>{{ $d(date, 'long')}}</p>
      <p>{{ $n(1000, 'currency')}}</p>
      <p>{{ $n(1000.2356, 'decimal')}}</p>
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
      isActive: false,
      date: new Date()
    }
  }
}
</script>

<style scoped>
</style>
