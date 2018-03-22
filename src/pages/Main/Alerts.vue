<template>
  <v-ons-page>
    <div class="container">
      <h1>{{ $t('lang.pages.alerts.main.text')}}</h1>
      <v-ons-fab
      	position="bottom right"
      	ripple="true"
      >
      <v-ons-icon icon="ion-edit, material:zmdi-email-open"></v-ons-icon>
    </v-ons-fab>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'alerts'
  }
</script>

<style scoped>

</style>
