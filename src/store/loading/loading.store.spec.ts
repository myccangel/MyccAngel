import { LoadingState } from "./LoadingState";
import { loadingReducer } from "./loading.reducers";
import { hide, show } from "./loading.actions";
import { createAction } from "@ngrx/store";

describe('Loading store', ()=>{

  it('It show', ()=>{

    const initialState: LoadingState = {show: false}
    const newState = loadingReducer(initialState, show());

    expect(newState).toEqual({show:true});
  })

  it('It hide', ()=>{

    const initialState: LoadingState = {show: true}
    const newState = loadingReducer(initialState, hide());

    expect(newState).toEqual({show:false});
  })

  it('It should keep state if action is unkown', ()=>{

    const initialState: LoadingState = {show: true}
    const action = createAction("UNKOWN")
    const newState = loadingReducer(initialState,action);

    expect(newState).toEqual({show:true});

  })
})
