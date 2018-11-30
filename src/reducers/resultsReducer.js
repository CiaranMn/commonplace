export default resultsReducer = (state = [], action) => {

  switch (action.type) {
    case 'UPDATE_RESULTS':
      return action.results
    case 'ADD_RESULTS':
      return [...action.results, ...state]
    default:
      return state
  }

}