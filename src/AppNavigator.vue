<template id="App">
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="storePop"
    :options="options"
  ></v-ons-navigator>
</template>

<script>
  import HomePage from './pages/HomePage'

  export default {
    name: 'appNavigator',
    beforeMount () {
      console.log('AppNavigator beforeMount()')
      this.$store.commit('navigator/push', HomePage)
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
