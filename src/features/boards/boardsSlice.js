import { createSlice } from "@reduxjs/toolkit";
import { defaultLocalData } from '../../Constants'

let boards;

try {
  const localData = JSON.parse(localStorage.getItem('kanban'));
  boards = localData?.boards ?? defaultLocalData.boards;
} catch (e) {
    console.log('error occured!' , e)
    boards = defaultLocalData.boards;
}

const initialState = structuredClone(boards)

export const BoardsSlice = createSlice({

    name : "Boards",
    initialState,
    reducers:{
        addBoard: (state , {payload = {}})=>{
            state.push(payload)
        },   
        removeBoard: (state , {payload = ""})=>{
            return state.filter(({board_id})=>board_id != payload)
        },
        addStage: (state , {payload: {boardId = "" , stageData}})=>{
            state?.find(({board_id})=>board_id === boardId)?.
            stages?.push(stageData)
        },
        removeStage: (state , {payload: {boardId , stageId}})=>{
            const board = state.find(({ board_id }) => board_id === boardId);
            if(board)
            board.stages = board.stages.filter(({ stage_id }) => stage_id !== stageId);
        },
        addItem: (state , {payload: {boardId = "" , stageId = "", itemData}})=>{
            state?.find(({board_id})=>board_id === boardId)?.stages?.
            find(({stage_id})=>stage_id === stageId)?.
            items.push(itemData) 
        },
        removeItem: (state , {payload: {boardId , stageId , itemId}})=>{
            const stage = state?.find(({board_id})=>board_id === boardId).stages?.find(({stage_id})=>stage_id == stageId)
            if(stage) 
                stage.items = stage.items.filter(({item_id})=>item_id !== itemId)
            // console.log('remove item reducer called')
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

export const {addBoard , removeBoard , addItem , addStage , moveItem , removeStage , removeItem} = BoardsSlice.actions
export default BoardsSlice.reducer