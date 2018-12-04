const defaultSettings = {
  showNavButtons: false,
  quickBrowse: true,
  entryFontSize: 17,
  homePageEntries: 'Oldest first'
}

export default settingsReducer = (state = defaultSettings, action) => {

  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return action.settings
    default:
      return state
  }

}