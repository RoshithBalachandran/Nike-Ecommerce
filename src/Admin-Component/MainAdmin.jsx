// import { Header } from 'antd/es/layout/layout'
import React from 'react'
import SideBar from './SideBar'
import Home from './Home'
import { Space } from 'antd'
import AdminApp from './AdminApp'

const MainAdmin = () => {
  return (
    <div>
      {/* <Header /> */}
      <Home />
      <Space >
      <SideBar />
     <AdminApp />
     
      </Space>
    </div>
  )
}

export default MainAdmin
