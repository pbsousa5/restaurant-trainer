import { POP_ROUTE, PUSH_ROUTE, REPLACE } from './types'

export function push (route) {
  console.log("PUSHING ROUTE: ", route);
  return {
    type: PUSH_ROUTE,
    route
  }
}

export function pop () {
  return {
    type: POP_ROUTE,

  }
}

export function replace (route) {
  return {
    type: REPLACE,
    route
  }
}
