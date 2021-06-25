import React from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './CreateRoomBtnModal'

const Sidebar = () => {
  return (
    <div className="h-100">
      
      <div style={{marginTop:"10px"}}>
        <DashboardToggle />
        <CreateRoomBtnModal/>
      </div>

      bottom

    </div>
  )
}

export default Sidebar
