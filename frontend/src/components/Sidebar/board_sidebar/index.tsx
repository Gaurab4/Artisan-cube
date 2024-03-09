import React from 'react'

type Props = {}

const BoardSideBar = (props: Props) => {
  return (
    <div>



<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Sidebar</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu  p-4 w-[220px] min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li className='text-[25px] ml-3 mt-4 font-[500]'>Board Name</li>
      <li><a>name</a></li>
    </ul>
  
  </div>
</div>

    </div>
  )
}

export default BoardSideBar


