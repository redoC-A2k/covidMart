import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import {dbdataReducer} from './Reducers/dbdataReducer'
import {fetchAProductReducer} from "./Reducers/fetchAProductReducer";
import { manageCartReducer } from "./Reducers/manageCartReducer";
import { userdataReducer } from "./Reducers/userdataReducer";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage"


const masterReducer = combineReducers({
    dbdata:dbdataReducer,
    myproduct:fetchAProductReducer,
    cart:manageCartReducer,
    user:userdataReducer
})

// const persistConfig = {
//     key:"root",
//     storage:storage,
//     whitelist :["cart"]
// }

// const persistedReducer = persistReducer(persistConfig,masterReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(masterReducer,{dbdata:null,myproduct:null,cart:null,user:null},composeEnhancers(applyMiddleware(thunk)))
// export const persistor = persistStore(store)
