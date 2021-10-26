import { getToken } from "./authManager";

const apiUrl = "/api/like";

export const getAllLikes = () => {
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
        throw new Error("An unknown error occurred while trying to get Likes.");
      }
    });
  });
};
export const getSlideLikes = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetSlideLikes?slideId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get Likes.");
      }
    });
  });
};
export const getSlideLikeByUser = (slideId, firebaseId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/GetUserSlideLike?slideId=${slideId}&firebaseId=${firebaseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.status === 200 ) {
        return resp.json();
      } else if (resp.status === 204) {
        
      }else {
        throw new Error("An unknown error occurred while trying to get Slide User Likes.");
      }
    });
  });
};


export const addLike = (likeObj) => {
    return getToken().then((token) => {
      return fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeObj),
      }).then((resp) => {
        if (resp.ok ) {
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

  export const deleteLike = (id) => {
    return getToken().then((token) => {
      return fetch((apiUrl + "/" + id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
    });
  };