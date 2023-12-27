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
import { MediaProvider } from "./context/MediaContext";
import MovieDetails from "./Pages/MovieDetails/MovieDetails";
import Favorites from "./Pages/Favorites/Favorites";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/:mediaType/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <MediaProvider>
        <RouterProvider router={route} />
      </MediaProvider>
    </div>
  );
}

export default App;
