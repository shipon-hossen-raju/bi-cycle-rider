import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persisStore, store } from "./redux/store.ts";
import appRoutes from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisStore}>
        <RouterProvider router={appRoutes} />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
