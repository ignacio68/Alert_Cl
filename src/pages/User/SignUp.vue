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
      <p class="mainText">{{ $t('lang.pages.signup.main.text1') }}</p>
      <v-ons-list class="socialButtonsList">
        <v-ons-list-item
          :modifier="md ? 'nodivider' : ''"
          class="socialButtonsList__item"
          v-for="(socialButton, $index) in socialButtons" :key="socialButton.name" tappable>
          <sign-up-button
            class="socialButtonsList__item-button"
            :name="socialButton.name"
            :index="$index"
            :icon="socialButton.icons"
            :style="{ backgroundColor: socialButton.color }"
            @socialButtonEvent="socialLogIn($index)"
          />
        </v-ons-list-item>
      </v-ons-list>
      <div class="privacy">
        <i18n
          class="privacy__text"
          path="lang.pages.signup.main.text2"          
          >
          <span
            class="privacy__text-link"
            @click="toTerms"
            place="terms">{{ terms }}</span>
          <span
            class="privacy__text-link"
            @click="toPrivacy"
            place="privacy">{{ privacy }}</span>
        </i18n>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
  import TermsOfService from '../Shared/TermsOfService'
  import PrivacyPolicy from '../Shared/PrivacyPolicy'
  import SignUpButton from '../../components/Shared/SignUpButton'
  export default {
    name: 'sign-up',
    components: {
      SignUpButton
    },
    data () {
      return {
        isActive: false
        // toolbarTitle: this.$t('lang.pages.signup.toolbar.title')
      }
    },
    computed: {
      toolbarTitle () {
        return this.$t('lang.pages.signup.toolbar.title')
      },
      socialButtons () {
        return this.$store.getters['social/socialButtons']
      },
      terms () {
        return this.$t('lang.pages.signup.main.terms')
      },
      privacy () {
        return this.$t('lang.pages.signup.main.privacy')
      }
    },
    methods: {
      socialLogIn (index) {
        this.$store.dispatch('social/dispatchLogUp', index)
        // let socialProvider = this.socialButtons[index].socialLogIn
        // this.$store.dispatch('social/dispatchLogUp', socialProvider)
      },
      toTerms () {
        this.$store.commit('navigator/push', TermsOfService)
      },
      toPrivacy () {
        this.$store.commit('navigator/push', PrivacyPolicy)
      }
    }
  }
</script>

<style scoped>
  .socialButtonsList {
    border: 1px solid blue;
  }
  .socialButtonsList__item {
    border: 1px solid red;
    padding-top: 1px;
    padding-bottom: 1px;
  }
  .socialButtonsList__item-button{
    border: 1px solid green;
  }
  .mainText {
    padding-left: 20px;
    padding-right: 20px;
  }
  .privacy {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .privacy__text {
  }
  .privacy__text-link {
    color: rebeccapurple;
  }
</style>
