<template>
  <v-ons-page>
    <the-preloader v-if="isActive"
                   loaderBackgroundColor ="red"
                   loaderOpacity ="0.3"
                   loaderRippleWidth ="3em"
                   loaderRipperHeigth ="3em">
    </the-preloader>
    <the-custom-toolbar
      :pageTitle="$t('lang.pages.signup.toolbar.title')" >
    </the-custom-toolbar>
    <div class="container">
      <p class="mainText">{{ $t('lang.pages.signup.main.text1') }}</p>
      <p class="logInText">{{ $t('lang.pages.signup.main.text2') }}</p>
      <!-- LOGUP WITH EMAIL & PASSWORD -->
      <form class="form">
        <v-ons-list>
          <!-- NAME INPUT -->
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-person, zmdi-account"
                size="30px"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="name"
                :placeholder="$t('lang.pages.signup.input.name')"
                float
                modifier="transparent"
                v-model="name"
                @click="onDismissed"
                required
              >
              </v-ons-input>
            </div>
          </v-ons-list-item>
          <!-- EMAIL INPUT -->
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-ios-email, material:zmdi-email"
                size="30px"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="email"
                :placeholder="$t('lang.pages.signup.input.email')"
                required
                float
                modifier="underbar"
                v-model="email"
              >
              </v-ons-input>
            </div>
          </v-ons-list-item>
          <!-- PASSWORD INPUT -->
          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <user-input-password
              minlength="8"
              :placeholder="$t('lang.pages.signup.input.password')"
              required
              modifier="float"
              v-model="password"
            >
            </user-input-password>
          </v-ons-list-item>
          
        </v-ons-list>
        <v-ons-button
          class="center"
          modifier="large"
          :disabled="loading"
          ripple="true"
          @click="onSignUp"
        >
          Registrar
        </v-ons-button>
      </form>
      <!-- LOGIN WITH SOCIAL BUTTONS -->
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
          path="lang.pages.signup.main.text3"          
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
  import SignIn from './SignIn'
  import HomePage from '../HomePage'
  import SignUpButton from '../../components/Shared/SignUpButton'
  import UserInputPassword from '../../components/Shared/UserInputPassword'
  export default {
    name: 'sign-up',
    components: {
      SignUpButton,
      UserInputPassword
    },
    data () {
      return {
        isActive: false,
        name: '',
        email: '',
        password: ''
      }
    },
    computed: {
      socialButtons () {
        return this.$store.getters['social/socialButtons']
      },
      user () {
        return this.$store.getters['user/user']
      },
      error () {
        return this.$store.getters['shared/error']
      },
      loading () {
        return this.$store.getters['shared/loading']
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
      },
      toSignIn () {
        this.$store.commit('navigator/push', SignIn)
      },
      onSignUp () {
        console.log('Estoy en onSignUp')
        this.$store.dispatch('user/signUserUp', {name: this.name, email: this.email, password: this.password})
        this.$store.commit('navigator/push', HomePage)
      },
      onDismissed () {
        console.log('estoy en onDismissed!!')
        this.$store.dispatch('shared/clearError')
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
  .form {
    border: 1px solid black;
  }
  .form__input {
    border: 1px solid pink;
  }
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
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .logInText {
    padding-top: 20px;
    text-align: center;
    color: red;
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
