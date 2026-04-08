import NavBar from "../WebPage/NavBar/desktop";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const user = useAuth();
    const navigation = useNavigate();
    const isAdmin = user.user.rola === "admin" ? true : false;
    
    return(
        <>
            {isAdmin ? (<NavBar/>):navigation("/webpage")}
        </>
    )
}

export default AdminPanel;