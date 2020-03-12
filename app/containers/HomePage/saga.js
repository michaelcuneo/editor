import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API, graphqlOperation } from 'aws-amplify';

import { makeSelectValue } from 'containers/App/selectors';
import { makeSelectEdit } from './selectors';
import { savePostSuccess, savePostFailure } from './actions';

import { createPost, updatePost } from '../../../src/graphql/mutations';

import { SAVE_POST } from './constants';

/**
 * Github repos request/response handler
 */
export function* savePost() {
  const values = yield select(makeSelectValue());
  const edit = yield select(makeSelectEdit());

  try {
    if (edit) {
      yield call(handleEditPost, values);
    } else {
      yield call(handleSavePost, values);
    }

    yield put(savePostSuccess());
  } catch (err) {
    yield put(savePostFailure(err));
  }
}

async function handleEditPost(values) {
  API.graphql(
    graphqlOperation(updatePost, {
      input: {
        id: values.id,
        date: values.date.toISOString(),
        data: values.data,
      },
    }),
  )
    .then(result => result)
    .catch(err => err);
}

async function handleSavePost(values) {
  API.graphql(
    graphqlOperation(createPost, {
      input: {
        date: new Date().toISOString(),
        data: values,
      },
    }),
  )
    .then(result => result)
    .catch(err => err);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* PostSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SAVE_POST, savePost);
}
