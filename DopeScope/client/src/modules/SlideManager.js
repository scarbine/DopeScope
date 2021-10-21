import { getToken } from "./authManager";

const apiUrl = "api/Slide";

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

//   export const getSlideByUserId = () => {
//     return getToken().then((token) => {
//         return fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }).then((resp) => {
//           if (resp.ok) {
//             return resp.json();
//           } else {
//             throw new Error(
//               "An unknown error occurred while trying to get Slide."
//             );
//           }
//         });
//       });
//   }

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
