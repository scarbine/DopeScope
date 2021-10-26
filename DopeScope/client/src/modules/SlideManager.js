import { getToken } from "./authManager";


const apiUrl = "/api/Slide";



export const getAllSlides = () => {
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
            "An unknown error occurred while trying to get Slide."
          );
        }
      });
    });
  };

  export const  getSlideById =(id) => {
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
            throw new Error("An unknown error occurred while trying to get slides.");
          }
        });
      });
    };

  export const  getSlideByUserId =(id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GetUserSlides?firebaseId=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("An unknown error occurred while trying to get user slides.");
          }
        });
      });
    };
  export const  getSlideByScopeId =(id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GetScopeSlides?id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("An unknown error occurred while trying to get scope slides.");
          }
        });
      });
    };

export const addSlide = (slide) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slide),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new Slide."
        );
      }
    });
  });
};
export const updateSlide = (slide) => {
  return getToken().then((token) => {
    return fetch((apiUrl+'/'+slide.id), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slide),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new Slide."
        );
      }
    });
  });
};

export const deleteSlide = (id) => {
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

export const searchSlides = (searchTerm) => {
  return getToken().then((token) => {
  return fetch(`${apiUrl}/search?q=${searchTerm}`,{
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("An unknown error occurred while trying to get user slides.");
    }
  });
});
};
