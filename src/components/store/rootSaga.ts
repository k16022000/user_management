// components/store/rootSaga.ts
import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userListSaga } from './userListSaga';

export default function* rootSaga() {
  yield all([authSaga(), userListSaga()]);
}
