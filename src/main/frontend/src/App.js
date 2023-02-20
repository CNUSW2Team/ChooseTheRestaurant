import HomePage from "./components/HomePage";
import AllStore from "./components/store/AllStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Store from "./components/store/Store";
import RankingPage from "./components//worldcup/RankingPage";
import AllCategory from "./components/worldcup/AllCategory";
import GetReady from "./components/worldcup/GetReady";
import Game from "./components/worldcup/Game";
import WinnerResult from "./components/worldcup/WinnerResult";
import AdminAddStore from "./components/admin/AdminAddStore";
import AddCategory from "./components/worldcup/AddCategory";
import AdminAddMenuToStore from "./components/admin/AdminAddMenuToStore";
import ModifyEntities from "./components/admin/ModifyEntities";
import AdminPage from "./components/admin/AdminPage";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./components/Footer";
import {NavermapsProvider} from 'react-naver-maps';
import './App.css'
import AllMenu from "./components/store/AllMenu";

function App() {
    return (
        <NavermapsProvider ncpClientId='se3vlo7bzj'>
            <div className="d-flex flex-column justify-content-between min-vh-100">
                <div className="">
                    <Header/>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage/>}></Route>
                            <Route path="/Store/:storeId" element={<Store/>}></Route>
                            <Route path="/AllStore" element={<AllStore/>}></Route>
                            <Route path="/AllMenu" element={<AllMenu/>}></Route>
                            <Route path="/AllCategory" element={<AllCategory/>}></Route>
                            <Route path="/AddCategory" element={<AddCategory/>}></Route>
                            <Route path="/GetReady/:categoryId" element={<GetReady/>}></Route>
                            <Route path="/Round/:categoryId/:numOfRound" element={<Game/>}></Route>
                            <Route path="/Result/:categoryId/:storeId" element={<WinnerResult/>}></Route>
                            <Route path="/Ranking/:categoryId" element={<RankingPage/>}></Route>
                            <Route path="/admin" element={<AdminPage/>}></Route>
                            <Route path="/admin/AdminAddStore" element={<AdminAddStore/>}></Route>
                            <Route path="/admin/AdminAddMenuToStore" element={<AdminAddMenuToStore/>}></Route>
                            <Route path="/admin/ModifyEntities" element={<ModifyEntities/>}></Route>
                            <Route path="*" element={<NotFound/>}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        </NavermapsProvider>
    );

}

export default App;
