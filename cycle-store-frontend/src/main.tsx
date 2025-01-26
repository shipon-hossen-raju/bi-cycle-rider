import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import appRoutes from "./routes/index.tsx";
import { Provider } from "react-redux";
import { persisStore, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisStore}>
        <RouterProvider router={appRoutes} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
