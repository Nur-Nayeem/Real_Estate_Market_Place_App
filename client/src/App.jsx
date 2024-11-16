import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/home";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
    return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sign-in" element={<Signin/>}/>
            <Route path="/sign-up" element={<Signup/>}/>
            <Route path="/about" element={<About/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
    </BrowserRouter>)
}
