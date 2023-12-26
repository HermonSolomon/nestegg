import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import RootLayout from "./Pages/RootLayout/RootLayout";
import { MoviesProvider } from "./context/MovieContext";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Favorites from "./Pages/Favorites/Favorites";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path={"/movies/:id"} element={<MovieDetails />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
      </Route>
    )
  );
  return (
    <div className="App">
      <MoviesProvider>
        <RouterProvider router={route} />
      </MoviesProvider>
    </div>
  );
}

export default App;
