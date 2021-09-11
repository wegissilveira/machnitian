import { call, put } from 'redux-saga/effects'
import http from 'services/assetsService'

import IAssetsData from 'models/AssetsModel'
import { loadSuccess, loadFailure } from './actions'
import { AxiosResponse } from 'axios'

export function* load() {
  try {
    const responseAll: AxiosResponse<any> = yield call(http.getAll)
    // const response: AxiosResponse<IAssetsData[]> = yield call(http.getAllAssets)    

    yield put(loadSuccess(Object.values(responseAll)))
  } catch (err) {
    yield put(loadFailure())
  }
}

