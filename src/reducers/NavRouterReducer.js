import { Actions , ActionConst } from 'react-native-router-flux';
import { JUMP_TO_WINES } from '../actions/types'

const DEFAULT_STATE = {
  scene: {},
};

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      }
    case JUMP_TO_WINES:
    // this is not working
    // moved the actions call into actions
      return  () => Actions.wines({type:"replace"})
    default:
      return state;
  }
}
export const getNav = (state) => ({
  scene: state.scene
})
