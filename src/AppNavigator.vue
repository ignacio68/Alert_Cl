<template id="App">
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
  import HomePage from './pages/HomePage'
  import SignUp from './pages/User/SignUp'

  export default {
    name: 'appNavigator',
    beforeMount () {
      if (this.userIsAuthenticated) {
        this.$store.commit('navigator/push', HomePage)
        console.log('El usuario está autenticado')
      } else {
        this.$store.commit('navigator/push', SignUp)
        console.log('El usuario NO está autenticado')
      }
      // this.$store.commit('navigator/push', SignUp)
    },
    data () {
      return {
      }
    },
    computed: {
      pageStack () {
        return this.$store.getters['navigator/pageStack']
      },
      options () {
        return this.$store.getters['navigator/options']
      },
      userIsAuthenticated () {
        console.log('Comprobando si el usuario está autenticado')
        return this.$store.getters['user/user'] !== null && this.$store.getters['user/user'] !== undefined
      }
    },
    methods: {
      storePop () {
        this.$store.commit('navigator/pop')
      }
    }
  }
</script>

<style>

</style>
