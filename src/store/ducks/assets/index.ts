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
    // data: [IAssetsData[], IUsersData[], ICompanyData[], IUnitsData[]]
}

interface Action {
    type: string;
    payload?: DataPayload;
    meta?: any;
    error?: boolean;
}

// const isArrayOfIAssetsData = (arr: any[]): arr is IAssetsData[] => {
//     // return arr.every(asset => asset instanceof IAssetsData);
//     return arr.every(asset => typeof asset === 'string' );
// }

const reducer: Reducer<AssetsState> = (state = INITIAL_STATE, action: Action): AssetsState => {    
  switch (action.type) {
    case AssetsTypes.LOAD_REQUEST:
        return { 
            ...state, 
            loading: true 
        }
    case AssetsTypes.LOAD_SUCCESS:
        // console.log('action ', action.payload?.data);      

        return {
            ...state, 
            loading: false, 
            error: false, 
            // assets: action.data[0].data,
            // users: action.data[1].data,
            // units: action.data[2].data,
            // company: action.data[3].data,
            assets: action.payload?.data[0].data as IAssetsData[],
            users: action.payload?.data[1].data as IUsersData[],
            units: action.payload?.data[2].data as IUnitsData[],
            company: action.payload?.data[3].data as ICompanyData[],
            // assets: action.payload?.data[0] as IAssetsData[],
            // users: action.payload?.data[1] as IUsersData[],
            // units: action.payload?.data[2] as IUnitsData[],
            // company: action.payload?.data[3] as ICompanyData[],
        }
    case AssetsTypes.LOAD_FAILURE:
        return {
            ...state, 
            loading: false, 
            error: true 
            // data: [],
        }
    default:
        return state
  }
}

export default reducer