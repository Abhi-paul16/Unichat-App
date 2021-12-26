import { auth } from '../firebase';
import React,{ useState , useEffect} from 'react'
import {  ChatEngine } from 'react-chat-engine';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const Chats = () => {
    
    const navigate = useNavigate();
    const {user} = useAuth();
    const [loading , setLoading] = useState(true)

   
    const handleLogout = async () =>{
        await auth.signOut();
        navigate("/");
    }

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data] , 'userPhoto.jpeg' , {type:"image/jpeg"})
    }

    useEffect(()=>{
         
        if(!user){
             navigate("/");
             return;
        } 
        axios.get("https://api.chatengine.io/users/me", {
            headers:{
                "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name" : user.email , 
                "user-secret" : user.uid,
            }
        }).then(()=>{
          setLoading(false)
        }).catch(()=>{
            let formdata = new FormData();
            formdata.append('email' , user.email);
            formdata.append('username' , user.email);
            formdata.append('secret' , user.uid);

            getFile(user.photoURL)
            .then((avatar)=>{
               formdata.append('avatar' , avatar , avatar.name)
               axios.post("https://api.chatengine.io/users" , 
               formdata ,
               {headers:{"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}}
               ).then(()=>setLoading(false))
               .catch((error)=>{
                   console.log(error)
                   console.log(process.env.REACT_APP_CHAT_ENGINE_ID)
               })
            })

        })
    },[user, navigate ])

    if(!user || loading) return "..loading";

    return (
        <div className='chats-page'>
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout}  className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
             height = "calc(100vh-66px)"
             projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}
             userName = {user.email}
             userSecret = {user.uid}
            />
        </div>
    )
}


export default Chats;