<template>
  <v-ons-page class="main">
  	<the-custom-toolbar
      :pageTitle="$t('lang.pages.lognin.toolbar.title')"
      :backLabel="volver">
    </the-custom-toolbar>
    <div class="container">
      <form class="form" autocomplete="off">

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
                modifier="underbar"
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
                modifier="underbar"
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
        </v-ons-list>
        <!-- ERROR -->
        <v-ons-list-item>
          <p v-if="error" class="error">{{ $t('lang.errors.auth.invalidDisplayName') }}</p>
        </v-ons-list-item>
      </form>
      <v-ons-button
        class="center"
        modifier="large"
        :disabled="buttonActive"
        ripple="true"
        @click.prevent="onLognIn"
      >
        {{ $t('lang.pages.lognin.button')}}
      </v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  export default {
    name: 'log-in',
    data () {
      return {
      	volver:'',
        email: '',
        password: '',
        type: 'password',
        passwordVisible: false
      }
    },
    computed: {
      error () {
        return this.$store.getters['shared/error']
      },
      buttonActive () {
        if (this.email.length >= 6 && this.password.length >= 8) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onLognIn () {
        console.log('Estoy en onLognIn')
        this.$store.dispatch('user/logUserIn', {
          email: this.email,
          password: this.password
        })
      },
      togglePassword () {
        this.type = this.type === 'password' ? 'text' : 'password'
        // IMPORTANTE: añadir $el para que funcione setAttribute
        this.$refs.passwordInput.$el.setAttribute('type', this.type)
        this.passwordVisible = !this.passwordVisible
      }
    }
  }
</script>

<style scoped>

</style>
