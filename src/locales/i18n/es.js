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
      },
      main: {
        text1: '¡Regístrate y comienza a recibir tus alertas favoritas!',
        text2: 'Al registrarte aceptas nuestros {terms} y la {privacy}',
        terms: 'Términos del Servicio',
        text3: 'y la',
        privacy: 'Política de Privacidad'
      }
    },
    signin: {
    },
    service: {
      toolbar: {
        title: 'TERMINOS DEL SERVICIO'
      },
      main: {
        text: 'Términos del servicio'
      }
    },
    privacy: {
      toolbar: {
        title: 'POLITICA DE PRIVACIDAD'
      },
      main: {
        text: 'Política de privacidad'
      }
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
      { reset: 'Reset' }
    ]
  },
  errors: {
  }
}
