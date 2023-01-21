import { call, put } from 'redux-saga/effects'
import http from 'services/assetsService'
// import getAllTeste from 'services/assetsService'

import { loadSuccess, loadFailure } from './actions'
import { AxiosResponse } from 'axios'

import IAssetsData from 'models/AssetsModel'
import ICompanyData from 'models/CompanyModel'
import IUnitsData from 'models/UnitsModel'
import IUsersData from 'models/UsersModel'


export function* load() {
  try {
    const responseAll: AxiosResponse<any> = yield call(http.getAll)  
    // const responseAll: DataFetch = yield call(http.getAllTeste)  
    // console.log('responseAll: ', responseAll);
    
    yield put(loadSuccess(Object.values(responseAll)))
    // yield put(loadSuccess(responseAll))
  } catch (err) {
    console.log('ERROR: ', err);
    
    yield put(loadFailure())
  }
}

type DataFetch = {
  assets: IAssetsData[];
  users: IUsersData[];
  companies: ICompanyData[];
  units: IUnitsData[];
}
