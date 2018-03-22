<template>
  <v-ons-page>
  	<the-custom-toolbar
      :pageTitle="$t('lang.pages.signin.toolbar.title')" >
    </the-custom-toolbar>
    <div class="container">
      <h1>{{ $t('lang.pages.signin.main.text1')}}</h1>
      <v-ons-button
        class="center"
        modifier="large"
        :disabled="buttonActive"
        ripple="true"
        @click.prevent="onSignIn"
      >
        {{ $t('lang.pages.signin.button')}}
      </v-ons-button>
      <!-- AÑADIDO FAB SOLO PARA DESARROLLO, LUEGO BORRAR -->
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
  import HomePage from '../HomePage'
  export default {
    name: 'signin',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      buttonActive () {
        if (this.email.length >= 6 && this.password.length >= 8) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onSignIn () {
        console.log('Estoy en onSignIn')
        this.$store.dispatch('user/signUserUp',
          {
            name: this.name,
            email: this.email,
            password: this.password
          })
        this.$store.commit('navigator/push', HomePage)
      }
    }
  }
</script>

<style scoped>

</style>
