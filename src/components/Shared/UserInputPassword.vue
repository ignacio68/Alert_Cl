<template>
  <div class="Password">
    <v-row>
      <div class="left">
        <v-ons-icon
          icon="ion-locked, md-lock"
          size="25px"
          class="list-item__icon"></v-ons-icon>
      </div>
      <div class="Password__Input center">
        <v-ons-input
          type="password"
          class="Input"
          :value="value"
          ref="input"
          @input="updatePassword($event.target.value)"
          v-bind="$attrs"
        >
        </v-ons-input>
        <slot
          name="strength-meter"
          v-if="!disableStrength"
          :strength="this.strength">
          <svg
            class="Password__Meter"
            viewBox="0, 0, 83, 2"
            preserveAspectRatio="none">
            <path d="M 0 1 L 20 1" class="getStrengthClass(0)"></path>
            <path d="M 21 1 L 41 1" class="getStrengthClass(1)"></path>
            <path d="M 42 1 L 62 1" class="getStrengthClass(2)"></path>
            <path d="M 63 1 L 83 1" class="getStrengthClass(3)"></path>
          </svg>
        </slot>
        <slot
          name="strength-message"
          v-if="!disableStrength"
          :strength="this.strength">
          <div
            class="Password__Message"
            :class="strengthClass">{{ message }}</div>
        </slot>
      </div>
      <div class="left">
        <v-ons-icon
          class="Password__Togle_Icon"
          id="icon"
          icon="ion-eye-disabled, md-eye-off"
          size="36px"
          @click="togglePassword"></v-ons-icon>
      </div>
    </v-row>
  </div>
</template>

<script>
  import passwordStrength from 'zxcvbn'
  export default {
    name: 'userInputPassword',
    inheritAttrs: false,
    props: {
      /**
       * Clases a aplicar para los niveles de fortaleza según zxcvbn*
       */
      strengthClasses: {
        type: Array,
        default () {
          return [
            'Password--very-weak',
            'Password--weak',
            'Password--medium',
            'Password--good',
            'Password--great'
          ]
        }
      },
      strengthMessages: {
        type: Array,
        default () {
          return [
            'Very Weak',
            'Weak',
            'Medium',
            'Strong',
            'Very Strong'
          ]
        }
      },
      value: {
        type: String,
        default: ''
      },
      userInputs: {
        type: Array,
        default () {
          return []
        }
      },
      disableStrength: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        type: 'password',
        strength: {},
        dirty: false
      }
    },
    computed: {
      /**
       * Get the current password strength message
       */
      message () {
        if (this.strength.score >= 0 && this.dirty) {
          if (this.strengthMessages[this.strength.score]) {
            return this.strengthMessages[this.strength.score]
          }
        }
      },
      /**
       * Get the current password strength class
       */
      strengthClass () {
        if (this.score >= 0) {
          if (this.strengthClasses[this.strength.score]) {
            console.log('La clase es: ' + this.strengthClasses[this.strength.score])
            return this.strengthClasses[this.strength.score]
          }
        }
      },
      feedback () {
        if (this.strength.feedback) {
          if (this.strength.feedback.warning) {
            return this.strength.feedback.warning
          } else {
            return this.strength.feedback.suggestions[0]
          }
        }
      }
    },
    mounted () {
      if (this.value) {
        this.strength = passwordStrength(this.value, this.userInputs)
        this.dirty = true
      }
    },
    watch: {
      userInputs () {
        this.strength = passwordStrength(this.value, this.userInputs)
      }
    },
    methods: {
      /**
       * Cambia el "tipe" del password
       */
      togglePassword () {
        this.type = this.type === 'password' ? 'text' : 'password'
        this.$refs.input.$el.setAttribute('type', this.type)
      },
      getStrengthClass (strength) {
        if (this.strength.score > strength) {
          return this.strengthClass
        }
        return ''
      },
      updatePassword (password) {
        this.$emit('input', password)
        this.dirty = true
        this.strength = passwordStrength(this.value, this.userInputs)
      }
    }
  }
</script>

<style scoped>
  .Password__Input {
  },
  .Password__Meter {
    color: rgb(175, 175, 175);
    display: block;
    heigth: .5rem;
    margin-top: .2rem;
    /* width: 80%; */
  },
  .Password__Meter path {
    stroke: currentColor;
    stroke-width: 2;
  },
  .Password--very-weak {
    color: rgb(175, 175, 175);
  },
  .Password--weak {
    color: rgb(230, 30, 30);
  },
  .Password--medium {
    color: rgb(255, 160, 65);
  },
  .Password--good {
    color: rgb(100, 200, 75);
  },
  .Password--great {
    color: rgb(255, 8, 81);
  },
  .Password__Message {
    cursor: default;
    font-size: 1rem;
    padding-left: .5rem;
    padding-right: .5rem;
    text-align: right;
    text-transform: uppercase;
  },
  .Password__Togle_Icon {
    color: black;
  }

</style>
