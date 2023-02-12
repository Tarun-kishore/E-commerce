import { useEffect,  useContext } from "react";
import { UserContext } from "../../../App.js";
export default function Profile() {

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {


    if(!user.idToken || user.idToken=='') return ;
    fetch("/user/add", {
        method:'POST',
      headers: {
          'AuthToken': user.idToken,
      },
        body:JSON.stringify({})
    })
      .catch((err) => {
        console.log(err);
      });

  }, [user]);
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
