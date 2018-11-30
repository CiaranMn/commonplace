import React from 'react'
import DatePicker from 'react-native-datepicker'

import {globalStyles} from '../config/globalStyles'

export default DatePickerInput = ({date, changeDate}) => {

  return <DatePicker
            style={[
              globalStyles.selectInput,
              {width: "75%"}
            ]}
            date={date}
            mode="date"
            placeholder="Select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 5,
                top: 4,
              },
              dateInput: globalStyles.input,
            }}
            onDateChange={changeDate}
          />
}

