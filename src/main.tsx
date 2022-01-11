import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import './index.css'
import App from './App'
import NotFound from '../components/NotFound/NotFound'
import Home from '../components/Home/Home'
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/" element={<Home></Home>}>
      </Route>
      <Route
        path="/practice" element={<NotFound></NotFound>}>
      </Route>
      <Route path="/practice/:path" element={<App></App>}>
      </Route>
      <Route path="*"
        element={<NotFound />}
      ></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
