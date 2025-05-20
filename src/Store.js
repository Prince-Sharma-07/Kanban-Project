import { configureStore } from "@reduxjs/toolkit";
import  BoardsSliceReducer  from "./features/boards/boardsSlice";


export const store = configureStore({
    reducer:{
        Boards : BoardsSliceReducer
    } 
})