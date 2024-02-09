import reducer from './slice';
import * as asyncActions from '../tasks/api-actions';

export const tasksActions = {
  ...asyncActions,
};

export default reducer;
