import {
    configureStore,
    createSelector,
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit'


const usersAdapter = createEntityAdapter()
const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    usersAddOne: usersAdapter.addOne,
    usersAddMany: usersAdapter.addMany,
    userUpdate: usersAdapter.updateOne,
    userRemove: usersAdapter.removeOne,
  },
});
export const { actions } = usersSlice;

export const selectors = usersAdapter.getSelectors((state) => state.users);

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
console.log( configureStore);