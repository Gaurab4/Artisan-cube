'next/dynamic'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Navbar from '@/components/navbar';
import { jwtDecode } from 'jwt-decode';
import Projects from '@/components/projects/project_homepage';
import styled from 'styled-components';
type Props = {}



const MainWorkpage = styled.div({});


const Workpage = (props: Props) => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the token from the cookie
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      // Decode the token to extract the userId
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;
      // Set the userId state
      setUserId(userId);
    }else{
      router.push('/auth/login');
    }
  }, []);


  return (
    <MainWorkpage style={{flex:9.5 }}>
        <Navbar />
        <Projects userId={userId} />
    </MainWorkpage>
  )
}

export default Workpage

