import {configureStore} from '@reduxjs/toolkit'
import listSliceReducer from '../listSlice'

export const store = configureStore({
    reducer:{
listSlice:listSliceReducer
    },
})