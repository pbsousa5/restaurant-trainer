import { POP_ROUTE, PUSH_ROUTE, REPLACE, JUMP_TO } from './types'

export function push (route) {
  return {
    type: PUSH_ROUTE,
    route
  }
}
export function jump(route){
  return {
    type: JUMP_TO,
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
