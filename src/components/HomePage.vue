<template>
  <v-ons-page>
    <div v-if="isActive">
  	<the-preloader
      loaderBackgroundColor ="red"
      loaderOpacity ="0.3" 
      loaderRippleWidth ="3em"
      loaderRipperHeigth ="3em">
    </the-preloader>
  </div>
    <the-custom-toolbar
      :backLabel="atras"
      :pageTitle="title">
    </the-custom-toolbar>
    <div class="container">
      <p>¡¡Hola muchachos!!</p>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'home',

  created () {
    setTimeout( this.isActive = !this.isActive, 5000)
  },

  data () {
    return {
      title: "INICIO",
      atras: "volver",
      isActive: false
    }
  }
  
}
</script>

<style scoped>
</style>
