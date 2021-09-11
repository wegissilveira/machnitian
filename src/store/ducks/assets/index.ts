import { Reducer } from 'redux'
import { AssetsState, AssetsTypes } from './types'

const INITIAL_STATE: AssetsState = {
    assets: [],
    users: [],
    units: [],
    company: [],
    error: false,
    loading: false,
}

const reducer: Reducer<AssetsState> = (state = INITIAL_STATE, action) => {
    
  switch (action.type) {
    case AssetsTypes.LOAD_REQUEST:
        return { 
            ...state, 
            loading: true 
        }
    case AssetsTypes.LOAD_SUCCESS:
        return {
            ...state, 
            loading: false, 
            error: false, 
            assets: action.payload.data[0].data,
            users: action.payload.data[1].data,
            units: action.payload.data[2].data,
            company: action.payload.data[3].data,
        }
    case AssetsTypes.LOAD_FAILURE:
        return {
            ...state, 
            loading: false, 
            error: true, 
            data: [],
        }
    default:
        return state
  }
}

export default reducer