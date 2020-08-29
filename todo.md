* block creation
* block reparenting
* better focus navigation
* page creation
* refactor slices as ducks pattern.
* move data definitions somewhere easier to import.
* pick a strategy for representing url state.
  * connected-router vs. custom representation of route as a 'view' state property.

## Thunk Example:

```
import { AnyAction } from 'redux'
import { RootState, AppThunk } from  '../../app/store';
import { ThunkDispatch } from 'redux-thunk';

//...

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): BlockDispatchProps => {
  return {
    setSelected: () => { dispatch(setFocusPath(ownProps.path)) },
    update: (value: string) => { dispatch(updateBlock(ownProps.id, value)) },
    offsetFocus: (path: BlockPath, offset: number) => { (dispatch as ThunkDispatch<RootState, void, AnyAction>)(offsetFocusThunkDispatch(path, offset)) }
  }
};

const offsetFocusThunkDispatch = (path: BlockPath, offset: number): AppThunk =>
  (dispatch, getState): void => {
    let state = getState();
    dispatch(offsetBlockFocus(path, offset, state.data.blocks, state.data.pages))
  }

```
