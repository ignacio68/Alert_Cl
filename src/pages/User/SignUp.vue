<template>
  <v-ons-page class="main">
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
      <p class="mainText">{{ $t('lang.pages.lognup.main.text1') }}</p>
      <p class="logInText"
        @click.prevent="toLogIn">
        {{ $t('lang.pages.signup.main.text2') }}
      </p>

<!-------SIGNUP WITH EMAIL & PASSWORD ------>

      <form class="form" autocomplete="off">
        <v-ons-list>

          <!-- NAME INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-person, material:zmdi-account"
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
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="email"
                minlength="6"
                :placeholder="$t('lang.pages.signup.input.email')"
                required
                float
                modifier="transparent"
                v-model="email"
              >
              </v-ons-input>
            </div>
          </v-ons-list-item>

           <!-- PASSWORD INPUT -->

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <v-ons-icon
                icon="ion-locked, material:zmdi-lock"
                class="list-item__icon">
              </v-ons-icon>
            </div>
            <div class="center">
              <v-ons-input
                type="password"
                input-id="password"
                minlength="8"
                :placeholder="$t('lang.pages.signup.input.password')"
                required
                float
                modifier="transparent"
                v-model="password"
                v-bind="$attrs"
                ref="passwordInput"
              >
              </v-ons-input>
              <div class="right">
              <v-ons-icon v-if="!passwordVisible"
                icon="ion-eye-disabled, material:zmdi-eye-off"
                class="list-item__icon"
                @click.prevent="togglePassword">
              </v-ons-icon>
              <v-ons-icon v-if="passwordVisible"
                icon="ion-eye, material:zmdi-eye"
                class="list-item__icon"
                @click.prevent="togglePassword">
              </v-ons-icon>
            </div>
            </div>
          </v-ons-list-item>

          <!-- PASSWORD INPUT >

          <v-ons-list-item :modifier="md ? 'nodivider' : ''" class="form__input">
            <div class="left">
              <user-input-password
              minlength="8"
              :disableStrength="true"
              :placeholder="$t('lang.pages.signup.input.password')"
              required
              v-model="password">
              </user-input-password>
            </div>
          </v-ons-list-item -->

        </v-ons-list>

        <!-- ERROR -->

        <v-ons-list-item>
          <p v-if="error" class="error">{{ $t('lang.errors.auth.invalidDisplayName') }}</p>
        </v-ons-list-item>
      </form>

      <!-- BUTTON SIGNUP -->

      <v-ons-button
        name="signUp"
        class="center"
        modifier="large"
        :disabled="false"
        ripple="true"
        @click.prevent="onSignUp"
      >
        {{ $t('lang.pages.signup.button')}}
      </v-ons-button>

<!------ LOGIN WITH SOCIAL BUTTONS ------>

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

<!------ TERMS OF USE & POLICY PRIVACITY ------>

      <div class="privacy">
        <i18n
          class="privacy__text"
          path="lang.pages.signup.main.text3"
          >
          <span
            class="privacy__text-link"
            @click.prevent="toTerms"
            place="terms">{{ terms }}</span>
          <span
            class="privacy__text-link"
            @click.prevent="toPrivacy"
            place="privacy">{{ privacy }}</span>
        </i18n>
      </div>

<!------ CONFIRM PASSWORD ALERT ------>
			
				<!--alert-confirm-password
					:alertText="$t('lang.components.alertConfirmPassword.alertText')"
					:alertButtonText="$t('lang.components.alertConfirmPassword.buttonText')"
					@onClick="onClickAlertButton()"
					:isVisible="true">
				</alert-confirm-password-->
			<v-ons-alert-dialog
					class="AlertDialog_text" 
					modifier="rowfooter"
					:title="$t('lang.components.alertConfirmPassword.alertText')"
					:visible.sync="actionPass"
			>
				<template slot="footer">
					<v-ons-alert-dialog-button
					class="alertDialog_button"
					ripple="true"
					@click.prevent="onClickAlertButton()"
					>
					{{ $t('lang.components.alertConfirmPassword.buttonText') }}
					</v-ons-alert-dialog-button>
				</template>
			</v-ons-alert-dialog>

    </div>
  </v-ons-page>
</template>

<script>
  import HomePage from '../HomePage'
  import TermsOfService from '../Shared/TermsOfService'
  import PrivacyPolicy from '../Shared/PrivacyPolicy'
  import LogIn from './LogIn'
  import SignUpButton from '../../components/Shared/SignUpButton'
	// import TheAlert from '../../components/Shared/TheAlert'
  // import UserInputPassword from '../../components/Shared/UserInputPassword'
  export default {
    name: 'sign-up',
    components: {
      SignUpButton,
      // alertConfirmPassword: TheAlert
      // UserInputPassword
    },
    data () {
      return {
        isActive: false, // Activa el PreLoader
        name: '',
        email: '',
        password: '',
        type: 'password',
        passwordVisible: false
      }
    },
    computed: {
      socialButtons () {
        return this.$store.getters['social/socialButtons']
      },/*
      user () {
        return this.$store.getters['user/user']
      },*/
      error () {
        return this.$store.getters['shared/error']
      },/*
      loading () {
        return this.$store.getters['shared/loading']
      },*/
      actionPass () {
      	return this.$store.getters['shared/actionPass']
      	console.log('actionPass es: ' + this.actionPass)
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
        // enviamos los datos del usuario para su registro
        console.log('Estoy dentro del PREenvio de alertas'),
        this.$store.dispatch('user/signUserUp', {
          name: this.name,
          email: this.email,
          password: this.password
        })
      },
      onDismissed () {
        console.log('estoy en onDismissed!!')
        this.$store.dispatch('shared/clearError', null)
      },
      toTerms () {
        this.$store.commit('navigator/push', TermsOfService)
      },
      toPrivacy () {
        this.$store.commit('navigator/push', PrivacyPolicy)
      },
      togglePassword () {
        this.type = this.type === 'password' ? 'text' : 'password'
        // IMPORTANTE: añadir $el para que funcione setAttribute
        this.$refs.passwordInput.$el.setAttribute('type', this.type)
        this.passwordVisible = !this.passwordVisible
      },
      onClickAlertButton () {
      	console.log('Estoy en el botón de la alerta de confirmación de password')
      	this.$store.commit('shared/setActionPass', false)
        this.$store.commit('navigator/push', HomePage, { root: true })
      }
    },
  }
</script>

<style scoped>
  .form {
    border: 1px solid green;
  }
  .form__input {
    border: 1px solid pink;
    height: 50px;
  }
  .socialButtonsList {
    border: 1px solid blue;
  }
  .socialButtonsList__item {
    border: 1px solid red;
    height: 50px;
  }
  .socialButtonsList__item-button{
    border: 1px solid green;
    height: 40px;
  }
  .list-item__icon {
    size: 25px;
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
  .error {
    color: red;
  }
</style>
