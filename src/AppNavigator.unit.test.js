import { shallow } from '@vue/test-vue'
import AppNavigator from './AppNavigator'

describe('AppNavigator.vue', () => {

  let wrapper

  beforeEach(() => {})

  it('Debe comprobar si el usuario está autenticado', () => {

  })

  it('carga la página HomePage si el usuario SI está autenticado', () => {
    wrapper = shallow(AppNavigator)
  })

  it('carga la página SignUp si el usuario NO está autenticado', () => {

  })
})
