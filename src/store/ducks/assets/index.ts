import { Reducer } from 'redux'
import { AssetsState, AssetsTypes } from './types'

import IAssetsData from 'models/AssetsModel'
import ICompanyData from 'models/CompanyModel'
import IUnitsData from 'models/UnitsModel'
import IUsersData from 'models/UsersModel'

const INITIAL_STATE: AssetsState = {
    assets: [],
    users: [],
    units: [],
    company: [],
    error: false,
    loading: false,
}

type Data = {
    config: any
    data: IAssetsData[] | IUsersData[] | ICompanyData[] | IUnitsData[]
    headers: any
    request: any
    status: number
    statusText: string
}

type DataPayload = {
    data: Data[]
}

interface Action {
    type: string;
    payload?: DataPayload;
    meta?: any;
    error?: boolean;
}

const reducer: Reducer<AssetsState> = (state = INITIAL_STATE, action: Action): AssetsState => {    
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
            assets: action.payload?.data[0].data as IAssetsData[],
            users: action.payload?.data[1].data as IUsersData[],
            units: action.payload?.data[2].data as IUnitsData[],
            company: action.payload?.data[3].data as ICompanyData[]
        }
    case AssetsTypes.LOAD_FAILURE:
        return {
            ...state, 
            loading: false, 
            error: true 
        }
    default:
        return state
  }
}

export default reducer