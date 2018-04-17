<template>
  <v-ons-page>
    <the-custom-toolbar
      modifier="white-content"
      :pageTitle="$t('lang.pages.homePage.toolbar.title')">
      <!--v-ons-toolbar-button slot="right" modifier="white-content"
                            @click="$store.commit('splitter/toggle'); showTip(null, 'Try dragging from right edge!')"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button-->
    </the-custom-toolbar>

    <v-ons-tabbar position="auto"
                  swipeable
                  :tabs="tabs"
                  :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  import Alerts from './Main/Alerts'
  import Profile from './Main/Profile'
  import Search from './Main/Search'
  import SignUp from './User/SignUp'

  export default {
    name: 'home',
    beforeMount () {
      console.log('HomePage beforeMount()')
      if (!this.userIsAuthenticated) {
        this.$store.commit('navigator/push', SignUp)
        console.log('El usuario NO está autenticado')
      }
    },
    data () {
      return {
        tabs: [
          {
            label: this.$tc('lang.pages.homePage.tabbar', 0),
            icon: 'ion-camera, material:md-camera',
            page: Profile
          },
          {
            label: this.$tc('lang.pages.homePage.tabbar', 1),
            icon: 'ion-ios-bell, material:md-notifications',
            page: Alerts,
            badge: 6
          },
          {
            label: this.$tc('lang.pages.homePage.tabbar', 2),
            icon: 'ion-search, material:md-search',
            page: Search
          }
        ],
        numAlerts: '8'
      }
    },
    computed: {
      index: {
        get () {
          return this.$store.getters['navigator/index']
        },
        set (newValue) {
          this.$store.commit('navigator/set', newValue)
        }
      },
      userIsAuthenticated () {
        console.log('Comprobando si el usuario está autenticado')
        console.log(this.$store.getters['user/user'])
        return this.$store.getters['user/user'] !== null && this.$store.getters['user/user'] !== undefined
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  /* Custom 'white-content' modifier */
  .page--material .toolbar--white-content__center,
  .page--material .toolbar-button--white-content,
  .page--material :checked + .tabbar--white-content__button {
    color: white;
  }
  .page--material .tabbar--white-content__button {
    color: rgba(255, 255, 255, 0.7);
  }
  .page--material .tabbar--white-content__border {
    background-color: white;
  }
</style>

