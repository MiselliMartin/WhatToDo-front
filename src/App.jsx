import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import { HomePage } from './pages/HomePage'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'
import { TaskProvider } from './context/TaskContext'
import { Navbar } from './components/Navbar'

export const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/*' element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<ProfilePage />}></Route>
              <Route path='/tasks' element={<TasksPage />}></Route>
              <Route path='/tasks/:id' element={<TaskFormPage />}></Route>
              <Route path='/add-tasks' element={<TaskFormPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
