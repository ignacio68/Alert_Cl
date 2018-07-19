<template>
  <v-ons-page>
    <div class="container">
      <h1>{{ $t('lang.pages.profile.main.text')}}</h1>
       <v-ons-button
        name="onClick"
        class="center"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.pages.profile.main.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'profile',
    methods: {
    	onSave() {
        // this.$store.commit('navigator/push', HomePage)
        console.log('Guardo los cambios')
      }
    }
  }
</script>
<style scoped>

</style>
