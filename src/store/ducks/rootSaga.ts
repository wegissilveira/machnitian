import { all, takeLatest, AllEffect, ForkEffect } from 'redux-saga/effects';

import { AssetsTypes } from './assets/types';
import { load } from './assets/sagas';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<never>>> {
    let root = yield all([
        takeLatest(AssetsTypes.LOAD_REQUEST, load),
      ]);
  return root
}