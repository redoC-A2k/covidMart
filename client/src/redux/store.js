import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import {fetchAllproductsReducer} from './Reducers/fetchAllproductsReducer'
import {fetchAProductReducer} from "./Reducers/fetchAProductReducer";

const masterReducer = combineReducers({
    dbdata:fetchAllproductsReducer,
    myproduct:fetchAProductReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(masterReducer,{dbdata:"afshan",myproduct:null},composeEnhancers(applyMiddleware(thunk)))