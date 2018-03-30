/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/HomePage/constants';
import { reposLoaded, repoLoadingError } from 'containers/HomePage/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

import { REQUEST_API_DATA, receiveApiData } from './actions';
import { fetchData } from "./api";

/**
 * Express api request/response handler
 */
export function* getApiData(action) {
  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(fetchData);
    //console.log('getApiData:' + data);
    yield put(receiveApiData(data));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* mySaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
