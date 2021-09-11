import IAssetsData from 'models/AssetsModel'
import IUsersData from 'models/UsersModel'
import IUnitsData from 'models/UnitsModel'
import ICompanyData from 'models/CompanyModel'


export enum AssetsTypes {
    LOAD_REQUEST = '@assets/LOAD_REQUEST',
    LOAD_SUCCESS = '@assets/LOAD_SUCCESS',
    LOAD_FAILURE = '@assets/LOAD_FAILURE'
}

export interface AssetsState {
    readonly assets: IAssetsData[]
    readonly users: IUsersData[]
    readonly units: IUnitsData[]
    readonly company: ICompanyData[]
    readonly loading: boolean
    readonly error: boolean
}