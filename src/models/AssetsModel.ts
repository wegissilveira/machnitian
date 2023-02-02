import { AssetsTypes } from "store/ducks/assets/types"
import IUsersData from "models/UsersModel"
import IUnitsData from "models/UnitsModel"
import ICompanyData from "models/CompanyModel"
import { IconName } from "@fortawesome/fontawesome-svg-core"

export type SpecificationKeyDetailsType = {
   icon: IconName
   name: string
   unit: string
   key: keyof SpecificationsType
}

export type SpecificationsType = {
   maxTemp?: number
   power?: number
   rpm?: number
}

export type DetailsKeyType = {
   icon: IconName
   name: string
   key: keyof IAssetsData
}

type HealthHistory = {
   status: string
   timestamp: string
}

export default interface IAssetsData {
   id: number
   name: string
   model: string
   image: string
   specifications: SpecificationsType
   metrics: {
      lastUptimeAt: string | null
      totalCollectsUptime: number | null
      totalUptime: number | null
   }
   sensors: string[]
   companyId: number
   healthHistory: HealthHistory[]
   unitId: number
   healthscore: number
   status: string
   agent?: string
}

type LoadRequest = {
   type: AssetsTypes.LOAD_REQUEST
}

type loadSuccess = {
   type: AssetsTypes.LOAD_SUCCESS
   loading: false
   error: false
   assets: IAssetsData[]
   users: IUsersData[]
   units: IUnitsData[]
   company: ICompanyData[]
}

type LoadFailure = {
   type: AssetsTypes.LOAD_FAILURE
   loading: false
   error: true
   data: any[]
}

export type AssetsActions = LoadRequest | loadSuccess | LoadFailure
