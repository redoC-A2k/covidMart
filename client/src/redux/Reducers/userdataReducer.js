import {FETCH_USER} from '../types'
export const userdataReducer = (state = null ,action) =>{
    if(action.type === FETCH_USER && action.userdata){
        return action.userdata
    }
    else return state
}