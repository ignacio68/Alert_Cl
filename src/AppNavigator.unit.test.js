import { shallow } from '@vue/test-vue'
import AppNavigator from './AppNavigator'

describe('AppNavigator.vue', () => {

  const wrapper = shallow(AppNavigator)
  const vm = wrapper.vm

  beforeEach(() => {})

  it('Debe comprobar si el usuario está autenticado', () => {

  })

  it('carga la página HomePage si el usuario SI está autenticado', () => {

  })

  it('carga la página SignUp si el usuario NO está autenticado', () => {

  })
})
