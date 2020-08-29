* blocks don't redraw on the focus view information change
* solidify block-content representation model. reconcile it with markdown.
  * there's a significant tension between blocks-from-markdown and transclusion.
  * option: if a block is split always keep acontainer super-block
  * option: accept markdown as an import/export target wihtout letting it dictate internal representaiton
  	* but how would you represent a multi-block transclude in general?
* pick a strategy for representing url state.
  * connected-router vs. custom representation of route as a 'view' state property.
* consider move to immutable.js


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
