import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['form/setPreviewBlob'],
                ignoredPaths: ['form.previewBlob'],
            },
        }),
});

export default store;