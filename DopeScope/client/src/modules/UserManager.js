
import { getToken } from "./authManager";



 const apiUrl = "/userprofile"
export const  getUserByFirebaseId =(firebaseId) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${firebaseId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("An unknown error occurred while trying to get slides.");
          }
        });
      });
    };