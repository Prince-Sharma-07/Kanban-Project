import { configureStore } from "@reduxjs/toolkit";
import  BoardsSliceReducer  from "./features/boards/boardsSlice";


export const store = configureStore({
    reducer:{
        Boards : BoardsSliceReducer
    } 
})

store.subscribe(() => {
  const state = store.getState();
  
  // Get existing localStorage data
  const existingLocalData = JSON.parse(localStorage.getItem('kanban')) || {};

  // Update only the boards field, keep other fields like users intact
  const newLocalData = {
    ...existingLocalData,
    boards: state.Boards,
  };
  
  localStorage.setItem('kanban', JSON.stringify(newLocalData));
});
