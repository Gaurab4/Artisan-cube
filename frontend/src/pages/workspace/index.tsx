'next/dynamic'

import Sidebar from '@/components/Sidebar/main_page_sidebar';

import styled from 'styled-components';
import React from 'react'
import Workpage from '@/components/home_page/workspace_page';


const MainContainer = styled.div`

`;



const Workspace = () => {
  return (
    <MainContainer className="display-flex" style={{display:'flex', marginTop:'30px' ,marginRight:'20px' , marginLeft:'20px'}}>
    {/* Sidebar */}
    <Sidebar/>
    <div className="divider divider-horizontal"></div>
    <Workpage/>
    </MainContainer >
  
  )
}

export default Workspace;