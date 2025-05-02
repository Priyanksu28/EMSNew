import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import AssetList from './components/assets/AssetList'
import AddAsset from './components/assets/AddAsset'
import EditAsset from './components/assets/EditAsset'
import List from './components/employee/List'
import Add from './components/employee/Add'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EditDepartment from './components/departments/EditDepartment'
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import AddAssign from './components/assign/Add'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
          
          }>

          <Route index element={<AdminSummary />}></Route>

          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/departments/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>


          <Route path='/admin-dashboard/assets' element={<AssetList />}></Route>
          <Route path='/admin-dashboard/assets/add-asset' element={<AddAsset />}></Route>
          <Route path='/admin-dashboard/asset/:id' element={<EditAsset />}></Route>
          
          
          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/employees/add-employee' element={<Add />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>



          <Route path='/admin-dashboard/assign/add' element={<AddAssign />}></Route>

          </Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
