import { call, put } from 'redux-saga/effects'
import http from 'services/assetsService'

import { loadSuccess, loadFailure } from './actions'
import { AxiosResponse } from 'axios'

export function* load() {
  try {
    const responseAll: AxiosResponse<any> = yield call(http.getAll)  

    yield put(loadSuccess(Object.values(responseAll)))
  } catch (err) {
    yield put(loadFailure())
  }
}

