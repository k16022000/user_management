import { takeLatest, call, put } from 'redux-saga/effects';
import { loginRequest } from './authActions';
import { userService } from '../../services/userService';
import { loginFailure, setAuthenticated } from './authSlice';

function* loginWorker(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  const { email, password } = action.payload;
  const response = yield call(userService.login, { email, password });

  if (response?.status === 200) {
    yield put(setAuthenticated(true));
  } else {
    yield put(loginFailure('Invalid credentials'));
  }
}

export function* authSaga(): Generator {
  yield takeLatest(loginRequest.type, loginWorker);
}
