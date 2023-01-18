import HomePage from "./components/HomePage";
import AllStore from "./components/AllStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Store from "./components/Store";
import RankingPage from "./components/RankingPage";
import AllCategory from "./components/AllCategory";
import GetReady from "./components/GetReady";
import WorldCup from "./components/WorldCup";
import WinnerResult from "./components/WinnerResult";
import AdminAddShop from "./components/admin/AdminAddShop";
import AddCategory from "./components/AddCategory";

function App() {

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/Store/:storeId" element={<Store />}></Route>
                    <Route path="/AllStore/*" element={<AllStore />}></Route>
                    <Route path="/AllCategory/*" element={<AllCategory />}></Route>
                    <Route path="/GetReady/:categoryId" element={<GetReady />}></Route>
                    <Route path="/Round/:categoryId/:numOfRound" element={<WorldCup />}></Route>
                    <Route path="/Result/:categoryId/:storeId" element={<WinnerResult />}></Route>
                    <Route path="/Ranking/:categoryId" element={<RankingPage />}></Route>
                    <Route path="/admin/AdminAddShop" element={<AdminAddShop />}></Route>
                    <Route path="/AddCategory" element={<AddCategory />}></Route>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
