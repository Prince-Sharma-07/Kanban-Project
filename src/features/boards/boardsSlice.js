import { createSlice } from "@reduxjs/toolkit";
import { defaultLocalData } from '../../Constants'

const {boards} = JSON.parse(localStorage.getItem('kanban')) ?? defaultLocalData

const initialState = JSON.parse(JSON.stringify(boards))

export const BoardsSlice = createSlice({

    name : "Boards",
    initialState,
    reducers:{
        addBoardToLocal: (state , {payload = {}})=>{
            state.push(payload)
        },
        addBoard: (state , {payload = {}})=>{
             state.push(payload)
        },   
        removeBoard: (state , {payload = ""})=>{
             return state.filter((board)=>board.board_id != payload)
        },
        addStage: (state , {payload: {boardId = "" , stageData}})=>{
            state?.find(({board_id})=>board_id === boardId)?.stages?.push(stageData)
        },
        addItem: (state , {payload: {boardId = "" , stageId = "", itemData}})=>{
            state?.find(({board_id})=>board_id == boardId)?.stages?.find(({stage_id})=>stage_id == stageId)?.items.push(itemData) 
        }
    }

})

export const {addBoard , removeBoard , addStage} = BoardsSlice.actions
export default BoardsSlice.reducer