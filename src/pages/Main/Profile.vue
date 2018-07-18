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
        @click.prevent="toHomePage"
      >
        {{ $t('lang.pages.profile.main.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
	import HomePage from '../HomePage'
  export default {
    name: 'profile',
    methods: {
    	toHomePage() {
        this.$store.commit('navigator/push', HomePage)
      }
    }
  }
</script>
<style scoped>

</style>
