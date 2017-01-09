import { connect } from 'react-redux'
import NavigationRoot from '../components/NavRoot'
import { push, pop, replace } from '../actions/navActions'
function mapStateToProps (state) {
  return {
    navigation: state.navReducer
  }
}

export default connect(
  mapStateToProps,
  {
    pushRoute: (route) => push(route),
    popRoute: () => pop(),
    replaceRoute: (route) => replace(route)
  }
)(NavigationRoot)
