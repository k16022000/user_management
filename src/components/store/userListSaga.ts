import { call, put, select, takeLatest } from 'redux-saga/effects';
import { userService } from '../../services/userService';
import { setUserList, setLoading, setSingleUser } from './userListSlice';
import {
  getUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from './userListActions';
import { RootState } from '../store';

function* getUsersWorker(action: ReturnType<typeof getUsersRequest>): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const response = yield call(userService.getUserById, action.payload);
    yield put(setUserList(response.data));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // error
  } finally {
    yield put(setLoading(false));
  }
}

// function* createUserWorker(
//   action: ReturnType<typeof createUserRequest>
// ): Generator<any, void, any> {
//   yield call(userService.createUser, action.payload);
//   yield call(getUsersWorker, getUsersRequest(1));
// }

function* createUserWorker(
  action: ReturnType<typeof createUserRequest>
): Generator<any, void, any> {
  const response = yield call(userService.createUser, action.payload);

  const state: RootState = yield select();
  const { page, per_page, total, total_pages, data: tableData } = state.user.userList;

  const newUser = {
    ...action.payload,
    id: response?.data?.id || `${tableData.length + 1}`,
  };

  yield put(
    setUserList({
      page,
      per_page,
      total: total + 1,
      total_pages,
      data: [...tableData, newUser],
    })
  );
}

// function* updateUserWorker(
//   action: ReturnType<typeof updateUserRequest>
// ): Generator<any, void, any> {
//   yield call(userService.updateUser, action.payload.id, action.payload.data);
//   yield call(getUsersWorker, getUsersRequest(1));
// }

function* updateUserWorker(
  action: ReturnType<typeof updateUserRequest>
): Generator<any, void, any> {
  yield call(userService.updateUser, action.payload.id, action.payload.data);

  const state: RootState = yield select();
  const { page, per_page, total, total_pages, data: tableData } = state.user.userList;

  const updatedData = tableData.map(user =>
    user.id === action.payload.id ? { ...user, ...action.payload.data } : user
  );

  yield put(
    setUserList({
      page,
      per_page,
      total,
      total_pages,
      data: updatedData,
    })
  );
}

function* deleteUserWorker(
  action: ReturnType<typeof deleteUserRequest>
): Generator<any, void, any> {
  yield call(userService.deleteUser, action.payload);
  yield call(getUsersWorker, getUsersRequest(1));
}

function* getSingleUserWorker(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  const res = yield call(userService.getSingleUser, action.payload);
  yield put(setSingleUser(res.data.data));
}

export function* userListSaga(): Generator {
  yield takeLatest(getUsersRequest.type, getUsersWorker);
  yield takeLatest(createUserRequest.type, createUserWorker);
  yield takeLatest(updateUserRequest.type, updateUserWorker);
  yield takeLatest(deleteUserRequest.type, deleteUserWorker);
  yield takeLatest('userList/getSingleUser', getSingleUserWorker);
}
