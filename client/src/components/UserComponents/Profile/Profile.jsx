import { useEffect,  useContext } from "react";
import { UserContext,axiosContext } from "../../../App.js";
export default function Profile() {

  const { user, setUser } = useContext(UserContext);
  const axios = useContext(axiosContext);
  useEffect(() => {


    if(!axios || !user.idToken || user.idToken=='') return ;
    axios.post("/user/add", {
    })
      .catch((err) => {
        console.log(err);
      });

  }, [user,axios]);
  return (
      <>
  <div>This Is Profile</div>
      <div>
      email:{`${user.email}`}
      </div>
      <div>
      name:{`${user.name}`}
      </div>
      </>
)
}
