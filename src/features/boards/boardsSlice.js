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
            state?.find(({board_id})=>board_id === boardId)?.
            stages?.push(stageData)
        },
        addItem: (state , {payload: {boardId = "" , stageId = "", itemData}})=>{
            
            state?.find(({board_id})=>board_id === boardId)?.stages?.
            find(({stage_id})=>stage_id === stageId)?.
            items.push(itemData) 
            
        },
        moveItem: (state , {payload: {boardId = "" , itemId = "" , senderStageId="" , receiverStageId="" }})=>{
            if(!boardId || !itemId || !senderStageId || !receiverStageId) alert("Something went wrong...")
                
            const board = state?.find(({board_id})=> board_id === boardId)
            const senderStage = board?.stages?.find(({stage_id})=>stage_id === senderStageId)
            const receiverStage = board?.stages?.find(({stage_id})=> stage_id === receiverStageId)
          
            const itemData = senderStage.items.find((item)=>item.item_id === itemId)

            senderStage.items = senderStage.items.filter((item)=>item.item_id !== itemId)
            receiverStage.items.push(itemData)
        }
    }

})

export const {addBoard , removeBoard , addStage , moveItem} = BoardsSlice.actions
export default BoardsSlice.reducer