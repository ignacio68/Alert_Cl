<template>
  <v-ons-page>
    <the-preloader v-if="isActive"
                   loaderBackgroundColor ="red"
                   loaderOpacity ="0.3"
                   loaderRippleWidth ="3em"
                   loaderRipperHeigth ="3em">
    </the-preloader>
    <the-custom-toolbar
      :pageTitle="toolbarTitle" >
    </the-custom-toolbar>
    <div class="container">
      <form class="configurationForm">
        <v-ons-list class="configurationForm__list">
          <v-ons-list-item class="configurationForm__list-item">
            <label for="textInput" class="left configurationForm__list-item-label">nombre</label>
            <v-ons-input 
              class="center configurationForm__list-input"
              id="name"
              type="name"
              float
              modifier="transparent"
              v-model="name"
              required></v-ons-input>
          </v-ons-list-item>
        </v-ons-list>
      </form>
      <v-ons-button
        name="saveButton"
        class="save__button center"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSave"
      >
        {{ $t('lang.pages.configuration.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  import HomePage from '../HomePage'
  export default {
    name: 'configuration',
    data () {
      return {
        isActive: false,
        volver: '',
        name: ''
      }
    },
    computed: {
      toolbarTitle () {
        return this.$t('lang.pages.configuration.toolbar')
      }
    },
    methods: {
      onSave () {
        this.$store.dispatch('user/createUserDb', this.name)
        this.$store.commit('navigator/push', HomePage)
      }
    }
  }
</script>

<style scoped>

</style>