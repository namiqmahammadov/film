import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: [],
}
const listSlice = createSlice({
    name:'list',
    initialState,
    reducers:{
        addlist:(state,action)=>{
            state.value.push(action.payload)
            console.log(action.payload)
              }
    }
})
export const {addlist}=listSlice.actions;
export default listSlice.reducer