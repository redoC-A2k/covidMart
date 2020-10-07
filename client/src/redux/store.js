import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import {fetchAllproductsReducer} from './Reducers/fetchAllproductsReducer'
import {fetchAProductReducer} from "./Reducers/fetchAProductReducer";
import { manageCartReducer } from "./Reducers/manageCartReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"


const masterReducer = combineReducers({
    dbdata:fetchAllproductsReducer,
    myproduct:fetchAProductReducer,
    cart:manageCartReducer
})

const persistConfig = {
    key:"root",
    storage:storage,
    whitelist :["cart"]
}

const persistedReducer = persistReducer(persistConfig,masterReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer,{dbdata:"afshan",myproduct:null,cart:null},composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
