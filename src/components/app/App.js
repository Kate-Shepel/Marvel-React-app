import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, SingleComicsPage, SingleCharPage, SinglePage} from '../pages';
import Spinner from '../spinner/Spinner'

const Page404  = lazy(() => import('../pages/404Page'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicsPage} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharPage} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;