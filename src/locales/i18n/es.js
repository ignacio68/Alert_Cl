export default {
  lang: 'es',
  pages: {
    global: {
      text1: 'El lenguaje es español'
    },
    signup: {
      toolbar: {
        backLabel: '',
        title: 'REGISTRO'
      }
    },
    signin: {
    }
  },
  components: {
    input: {
      placeholder: [
        { email: 'email' },
        { password: 'contraseña' }
      ]
    },
    button: [
      { submit: 'Submit' },
      { sigup: 'Sign Up' },
      { sigin: 'Sign In' },
      { signout: 'Sign Out' },
      { reset: 'Reset'}
    ]
  },
  errors: {
  }
}
