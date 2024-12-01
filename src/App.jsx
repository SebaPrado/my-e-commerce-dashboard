import { RouterProvider } from "react-router-dom";
import router from "../routes";
import "./App.css";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <ConfirmProvider>
      <RouterProvider router={router} />
    </ConfirmProvider>
  );
}

export default App;
