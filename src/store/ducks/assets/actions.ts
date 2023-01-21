import { action } from 'typesafe-actions'
import { AssetsTypes } from './types'

// import IAssetsData from 'models/AssetsModel'
// import ICompanyData from 'models/CompanyModel'
// import IUnitsData from 'models/UnitsModel'
// import IUsersData from 'models/UsersModel'

interface Metadata {
    key: string,
    value: any
  }

interface MetadataObj {
    [key: string]: Metadata
}


export const loadRequest = () => action(AssetsTypes.LOAD_REQUEST)

export const loadSuccess = (data: MetadataObj[]) => action(AssetsTypes.LOAD_SUCCESS, { data })
// export const loadSuccess = (data: DataFetch) => action(AssetsTypes.LOAD_SUCCESS, { data })
// export const loadSuccess = (data: MetadataObj[]) => {
//   return {
//     type: AssetsTypes.LOAD_SUCCESS, 
//     data
//   }
// }

export const loadFailure = () => action(AssetsTypes.LOAD_FAILURE)


// type DataFetch = {
//   assets: IAssetsData[];
//   users: IUsersData[];
//   companies: ICompanyData[];
//   units: IUnitsData[];
// }