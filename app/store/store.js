import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from "./reducers/password";

const store = configureStore({
	reducer: {
		password: passwordReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck:false, immutableCheck:false }),
});

export default store;