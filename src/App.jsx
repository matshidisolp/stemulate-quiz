import './App.css';
import { createBrowserRouter, RouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>template layout</div>,
    children: [
        {
            index: true,
            element: <p>Home Page</p>
        },
        {
            path:"quiz",
            element: <p>Quiz Page</p>
        },
        {
            path:"results",
            element: <p>Results Page</p>
        }
    ]
  },
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App
