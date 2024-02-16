'next/dynamic'


import Navbar from '@/components/navbar';
import Projects from '@/components/projects/project_homepage';
import React from 'react';
import styled from 'styled-components';
type Props = {}


const MainWorkpage = styled.div({
    
});

const Workpage = (props: Props) => {
  return (
    <MainWorkpage style={{flex:9.5 }}>
        <Navbar/>
        <Projects/>
    </MainWorkpage>
  )
}

export default Workpage