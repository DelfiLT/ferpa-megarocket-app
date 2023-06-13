import { combineReducers } from 'redux';
import { trainersReducer } from './trainers/reducer';
import { adminsReducers } from './admins/reducer';
import activitiesReducer from './activities/reducer';
import { classReducer } from './classes/reducer';
import superadminsReducer from './superadmins/reducer';
import subscriptionsReducer from './subscriptions/reducer';

const reducers = combineReducers({
  trainers: trainersReducer,
  admins: adminsReducers,
  activities: activitiesReducer,
  classes: classReducer,
  superadmins: superadminsReducer,
  subscriptions: subscriptionsReducer
});

export default reducers;
