import { PUSH_ROUTE, POP_ROUTE, REPLACE, JUMP_TO } from '../actions/types'
import { NavigationExperimental } from 'react-native'
const {
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'loading',
      title: 'LOADING',
    },
  ],
}

function navigationState (state = initialState, action) {
  //console.log(action)
  const {
    index,
    routes,
  } = state;

  switch (action.type) {
    case PUSH_ROUTE:
      if (state.routes[state.index].key === (action.route && action.route.key)){
        return state
      }
      if( NavigationStateUtils.has(state, action.route.key)){
        // IF WE LAREADY HAVE THE KEY THEN JUMP TO
        return NavigationStateUtils.jumpTo(state, action.route.key)
        //return NavigationStateUtils.pop(state)
      }
      // DEFAULT PUSH
      return NavigationStateUtils.push(state, action.route)
    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1){
        console.log("returning state");
        return state
      }
      console.log("returning pop");
      return NavigationStateUtils.pop(state)
    case JUMP_TO:
      console.log('index: ', state);
      if( NavigationStateUtils.has(state, action.route.key)) return NavigationStateUtils.pop(state)
      return NavigationStateUtils.jumpTo(state, action.key)
    case REPLACE:
      return NavigationStateUtils.replace(state, action.route);
    default:
      return state
  }
}

// You can also manually create your reducer::
// export default (state = initialState, action) => {
//   const {
//     index,
//     routes
//   } = state
//   console.log('action: ', action)
//   switch (action.type) {
//     case PUSH_ROUTE:
//       return {
//         ...state,
//         routes: [
//           ...routes,
//           action.route
//         ],
//         index: index + 1
//       }
//     case POP_ROUTE:
//       return index > 0 ? {
//         ...state,
//         routes: routes.slice(0, routes.length - 1),
//         index: index - 1
//       } : state
//     default:
//       return state
//   }
// }

export default navigationState
