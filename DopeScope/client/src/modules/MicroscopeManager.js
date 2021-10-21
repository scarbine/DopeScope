import { getToken } from "./authManager";

const apiUrl = "api/microscope";

export const getAllMicroscopes = () => {
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
        throw new Error("An unknown error occurred while trying to get Scope.");
      }
    });
  });
};

// export const getMicroscopesByUserId = () => {
//   return getToken().then((token) => {
//     return fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((resp) => {
//       if (resp.ok) {
//         return resp.json();
//       } else {
//         throw new Error(
//           "An unknown error occurred while trying to get Scope."
//         );
//       }
//     });
//   });
// };

export const addMicroscope = (microscope) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(microscope),
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
export const deleteMicroscope = (id) => {
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
