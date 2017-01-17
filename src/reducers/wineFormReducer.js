import { combineReducers } from 'redux-immutablejs'

import { reducer as form } from 'redux-form/immutable'

const reducer = combineReducers({
  form: form,
})

export default reducer
