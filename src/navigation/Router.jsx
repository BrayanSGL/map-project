import { BrowserRouter, Route, Routes } from "react-router-dom";
import {HomeView} from "../views/home-view";
import {AdminView} from "../views/admin-view";
import {DisplayView} from "../views/display-view";
import {Navbar} from "../components/Navbar";
import { AddRouteForm } from "../views/AddRouteForm";

export const Router = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/administration" element={<AdminView />} />
            <Route path="/display" element={<DisplayView />} />
            <Route path="/add-route" element={<AddRouteForm />} />
            <Route path="*" element={<HomeView />} />
        </Routes>
    </BrowserRouter>
  )
}

