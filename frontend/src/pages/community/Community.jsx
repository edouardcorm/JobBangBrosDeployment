import { useEffect, useState } from "react";
import "./Community.css";
import DetailProfil from "../../components/detailProfil/DetailProfil";
import { useAuthContext } from "../../hooks/useAuthContext";

const Community = () => {
  const [profils, setProfils] = useState([]);
  const { user: loggedInUser } = useAuthContext();

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        console.log("Fetching users..."); // Log when fetching starts
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${loggedInUser.token}`
            }
          }
        );

        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data

        if (response.ok) {
          // Filter users based on the logged-in user's preferences
          console.log("Logged in user's preference:", loggedInUser.preference);
          const filteredUsers = data.filter(user => {
            console.log("User gender:", user.gender); // Log each user's gender
            return user.gender === loggedInUser.preference;
          });
          console.log("Filtered users:", filteredUsers); // Log filtered users
          setProfils(filteredUsers);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (loggedInUser) {
      console.log("Logged in user:", loggedInUser); // Log logged-in user
      fetchFilteredUsers();
    } else {
      console.log("No logged-in user found"); // Log if no user is logged in
    }
  }, [loggedInUser]);

  const handleDelete = (id) => {
    setProfils(profils.filter(profil => profil._id !== id));
  };

  const backgroundColor =
    loggedInUser.preference === 'male' ? 'rgba(255, 192, 203, 0.5)' :
    loggedInUser.preference === 'female' ? 'rgba(0, 0, 255, 0.1)' :
    'linear-gradient(to right, rgba(255, 192, 203, 0.5), rgba(173, 216, 230, 0.5))';

  return (
    <div className="JBB-community-container" style={{ background: backgroundColor }}>
      {
        profils.map((profil) => (
          <div key={profil._id} className="JBB-community-profil">
            <DetailProfil profil={profil} onDelete={handleDelete} />
          </div>
        ))}
    </div>
  );
};

export default Community;