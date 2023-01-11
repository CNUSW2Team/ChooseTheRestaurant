import HomePage from "./components/HomePage";
import AllStore from "./components/AllStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Store from "./components/Store";
import RankingPage from "./components/RankingPage";
import AllCategory from "./components/AllCategory";

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
                    <Route path="/Ranking/:worldcupId" element={<RankingPage />}></Route>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;