import {Routes, Route} from 'react-router'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserDetails from './components/UserDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
    <Route path="/users/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
