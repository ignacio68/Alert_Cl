<template>
  <v-ons-page class="main">
    <div class="container">
      <v-ons-col class="col" width="90%">
        <h1 class="header">{{ $t('lang.pages.welcome.header')}}</h1>
        <p class="text">{{ $t('lang.pages.welcome.text')}}</p>
        <v-ons-row class="buttons">
          <v-ons-button
            class="button__signup"
            modifier=""
            ripple="true"
            @click.prevent="toSignUp">{{ $t('lang.pages.welcome.signup')}}
          </v-ons-button>
          <v-ons-button
            class="button_signin"
            modifier=""
            ripple="true"
            @click.prevent="toLogIn">{{ $t('lang.pages.welcome.lognin')}}
          </v-ons-button>
        </v-ons-row>
      </v-ons-col>
    </div>
  </v-ons-page>
</template>

<script>
  import SignUp from '../User/SignUp'
  import LogIn from '../User/LogIn'

  export default {
    name: 'welcome',
    methods: {
      toSignUp () {
        this.$store.commit('navigator/push', SignUp)
      },
      toLogIn () {
        this.$store.commit('navigator/push', LogIn)
      }
    }
  }
</script>

<style scoped>
  .container {
  }
  .button__signup {
    background-color: red;
  }
</style>
