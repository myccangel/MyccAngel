import { UserRegister } from "src/app/model/user/UserRegister";
import { AppInitialState } from "../AppInitialState"
import { registerReducer } from "./register.reducers";
import { register, registerFail, registerSuccess } from "./register.actions";

describe('Register store', () => {

  it('register', () => {
    const initialState = {
      ...AppInitialState.register
    };
    const newState = registerReducer(initialState, register({ userRegister: new UserRegister() }));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistered: false,
      isRegistering: true
    })
  })

  it('registerSuccess', () => {
    const initialState = {
      ...AppInitialState.register,
      isRegistering: true
    };
    const newState = registerReducer(initialState, registerSuccess());
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistered: true,
      isRegistering: false
    })
  })

  it('registerFail', () => {
    const initialState = {
      ...AppInitialState.register,
      isRegistering: true
    };
    const error = { error: "anyError" };
    const newState = registerReducer(initialState, registerFail({ error }));
    expect(newState).toEqual({
      ...initialState,
      error: error, // Updated to set the error correctly
      isRegistered: false, // Updated to false
      isRegistering: false
    })
  })
})
