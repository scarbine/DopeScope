import React from "react";
import { getToken } from "./authManager";

const apiUrl = "/api/slidetag"

export const getAllSlideTags = () => {
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
            "An unknown error occurred while trying to get Slide Tags."
          );
        }
      });
    });
  };

export const getAllSlideTagsBySlideId = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/SlideTagList?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(
            "An unknown error occurred while trying to get Slide Tags."
          );
        }
      });
    });
  };


