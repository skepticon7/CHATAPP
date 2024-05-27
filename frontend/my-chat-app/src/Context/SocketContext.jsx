import { useContext , useState , createContext, useEffect} from 'react'
import { UseAuthContext } from './AuthContext';
import io from "socket.io-client";
export const SocketContext = createContext();

export const UseSocketContext = ()=>{
    return useContext(SocketContext);
}
export const SocketContextProvider  = ({children})=>{
    const {AuthUser} = UseAuthContext();
    const [socket , setSocket] = useState(null);
    const [onlineUsers , setOnlineUsers] = useState([]);
    useEffect(()=>{
        if(AuthUser) {
            const socket = io("https://chatify-pod8.onrender.com",{
                query : {
                    UserId : AuthUser.id,
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers",users=>{
                setOnlineUsers(users);
            })
            return ()=> socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[AuthUser]);
    
    
    return <SocketContext.Provider value={{socket , onlineUsers }}>{children}</SocketContext.Provider>

}
