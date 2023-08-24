import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import logger from "redux-logger";
import { usersSlice } from "./users/usersSlice";
import { categoriesSlice } from "./categories/categoriesSlice";
import { partnersSlice } from "./partners/partnersSlice";
import { postsSlice } from "./posts/postsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    users: usersSlice.reducer,
    categories: categoriesSlice.reducer,
    partners: partnersSlice.reducer,
    posts: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
