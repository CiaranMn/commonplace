const blankEntry = {
  author: {name: 'Nothing here'},
  content: 'There are no entries to show here - try adding more, or try a new search!',
  tags: [],
  id: 404
}

export default resultsReducer = (state = [blankEntry], action) => {

  switch (action.type) {
    case 'UPDATE_RESULTS':
      return action.results.length !== 0 ? action.results : [blankEntry]
    case 'ADD_RESULTS':
      return [...action.results, ...state]
    case 'REPLACE_RESULT':
      if (!action.replacement) { return state }
      let results = state.map(entry => 
        entry.id === action.replacement.id ? 
          action.replacement
          : entry 
        )
      return results
    default:
      return state
  }

}