import { combineReducers } from 'redux';
import appReducer  from './reducers/app.reducer';
import { gameReducer } from './reducers/game.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
