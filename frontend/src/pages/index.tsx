import Image from "next/image";
import { Inter } from "next/font/google";
import React,{useState ,useEffect} from "react";
import axios from 'axios';
import CountdownTimer from "@/components/home_page/countdown-timer";
import LaunchPage from "@/components/home_page/launch_page";

interface User {
    id:number;
    name:string;
    email:string;
    password:string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [users , setUsers] = useState<User[]>([]);
  const [newUser , setNewUser] = useState({name:'' , email: '', password:''});
  
  // fetch the users 

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       console.log('on trying...')
    //       // const response =  await axios.get(`http://localhost:4000/users`);
    //       const response = await axios.get(`${apiUrl}/users`);
    //       setUsers(response.data);
    //     } catch (error) {
        
    //       console.log('error fetchiing data ' , error);
    //     }
    //   };

    //   fetchData();
    // },[]);

    return (
      <main>
        <div>    
              <LaunchPage/>  
              {/* <CountdownTimer/> */}
        </div>
      </main>
    )
  
}
