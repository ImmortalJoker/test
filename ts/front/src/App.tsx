
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Details = React.lazy(() => import('./pages/Details'));
const FavoriteList = React.lazy(() => import('./pages/Favorite'));

const Loading = () => <p>Loading ...</p>;

const NoMatch: React.FC = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favorite' element={<FavoriteList/>} />
        <Route path='/asteroid/:id' element={<Details />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
