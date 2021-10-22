import { getToken } from "./authManager";

const apiUrl = "/api/note";


export const  getNotesBySlideId =(id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/Slide?id=${id}`, {
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

    export const addNote = (note) => {
        return getToken().then((token) => {
          return fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
          }).then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else if (resp.status === 401) {
              throw new Error("Unauthorized");
            } else {
              throw new Error(
                "An unknown error occurred while trying to save a new Scope."
              );
            }
          });
        });
      };
