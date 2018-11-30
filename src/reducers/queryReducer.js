export default queryReducer = (state = {}, action) => {

  switch (action.type) {
    case 'UPDATE_RESULTS':
      return action.query || {}
    case 'CLEAR_QUERY':
      return {}
    default:
      return state
  }

}