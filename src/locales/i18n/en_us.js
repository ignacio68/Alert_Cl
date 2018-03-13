export default {
  lang: 'en_us',
  pages: {
    global: {
      text1: 'The lenguage is english'
    },
    signup: {
      toolbar: {
        backLabel: '',
        title: 'SIGN UP'
      }
    },
    signin: {
    }
  },
  components: {
    input: {
      placeholder: [
        { email: 'email' },
        { password: 'password' }
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
