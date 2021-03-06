
import { getToken } from "./authManager";

const apiUrl = "/api/tag"

export const getAllTags = () => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(
            "An unknown error occurred while trying to get Tags."
          );
        }
      });
    });
  };

  export const  getTagById =(id) => {
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
            throw new Error("An unknown error occurred while trying to get Tag.");
          }
        });
      });
    };


  export const addTag = (Tag) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Tag),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new Tag."
          );
        }
      });
    });
  };


  export const updateTag = (tag) => {
    return getToken().then((token) => {
      return fetch((apiUrl+'/'+ tag.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else if (resp.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error(
            "An unknown error occurred while trying to save a new Tag."
          );
        }
      });
    });
  };
  // export const deleteTag = (id) => {
  //   return getToken().then((token) => {
  //     return fetch((apiUrl + "/" + id), {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(id),
  //     });
  //   });
  // };


  

