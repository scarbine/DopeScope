import { getToken } from "./authManager";

const apiUrl = "/api/note";


export const  getNotesBySlideId =(id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          if (res.ok) {
            return res.json(id);
          } else {
            throw new Error("An unknown error occurred while trying to get notes.");
          }
        });
      });
    };
