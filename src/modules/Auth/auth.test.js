import reducer from './auth'
import {
  setToken,
  setUserCredentals,
  clearErrorSuccess,
  authorizationFailure
} from './actions'

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
}

describe('Reducer auth', () => {
  const state0 = reducer(undefined, randomAction)

  describe('action setToken', () => {
    it('Добавляет ключ в reducer jwtToken', () => {
      const testValue = '123'
      const state1 = reducer(state0, setToken(testValue))

      expect(state1.jwtToken).toBe(testValue)
    })
  })

  describe('action setUserCredentals', () => {
    it('Добавляет email и id в auth', () => {
      const testValueEmail = '123'
      const testValueId = '123'
      const state1 = reducer(
        state0,
        setUserCredentals({ email: testValueEmail, id: testValueId })
      )

      expect(state1).toEqual({
        email: testValueEmail,
        id: testValueId,
        error: null,
        jwtToken: null
      })
    })
  })

  describe('action authorizationFailure', () => {
    it('Устанавливает значения в поле error', () => {
      const testValue = { status: '666', text: 'Some strange error' }
      const state1 = reducer(state0, authorizationFailure(testValue))

      expect(state1.error).toEqual(testValue)
    })
  })

  describe('action clearErrorSuccess', () => {
    it('Очищает поле error', () => {
      const testValue = { status: '666', text: 'Some strange error' }
      const state1 = reducer(state0, authorizationFailure(testValue))
      const state2 = reducer(state1, clearErrorSuccess())

      expect(state2.error).toBeNull()
    })
  })
})
