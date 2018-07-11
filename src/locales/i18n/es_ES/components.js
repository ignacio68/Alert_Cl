export default {
  input: {
    placeholder: [
      { email: 'email' },
      { password: 'contraseña' }
    ]
  },
  button: [
    { submit: 'Enviar' },
    { sigup: 'Registrar' },
    { sigin: 'Entrar' },
    { signout: 'Desconectar' },
    { reset: 'Reset' }
  ],
  alertConfirmPassword: [
  	{ alertText: 'Te hemos enviado un email para confirmar la contraseña' },
  	{ buttonText: 'Ok'}
  ]
}
