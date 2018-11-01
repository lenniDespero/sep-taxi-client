import reducer from './profile'
import { profileSuccess, profileRequest, profileFailure } from './actions'

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
}

describe('Reducer profile', () => {
  const state0 = reducer(undefined, randomAction)

  describe('action profileRequest', () => {
    it('Устанавливает значение isLoading в положение true', () => {
      const state1 = reducer(state0, profileRequest())

      expect(state1.isLoading).toBeTruthy()
    })
  })

  describe('action profileSuccess', () => {
    const testValue = { data: '12', status: '13', something: 'wtf O_o' }
    const state1 = reducer(state0, profileSuccess(testValue))

    it('Добавляет переданные в поле data', () => {
      expect(state1.data).toEqual(testValue)
    })

    it('Устанавливает значение isLoading в положение false', () => {
      expect(state1.isLoading).toBeFalsy()
    })
  })

  describe('action profileFailure', () => {
    const testValue = { status: '666', text: 'Something strange' }
    const state1 = reducer(state0, profileFailure(testValue))

    it('Добавляет переданные в поле error', () => {
      expect(state1.error).toEqual(testValue)
    })

    const state2 = reducer(state1, profileRequest())
    it('При вызове другого экшена error обнуляется', () => {
      expect(state2.error).toBeNull()
    })
  })
})
