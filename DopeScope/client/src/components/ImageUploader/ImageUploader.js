import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

export const ImageUploader = (props) => {
  const history = useHistory();
  const { slideId } = useParams();

  const [imageSelected, setImageSelected] = useState("");

  const handleAddFile = () => {
    if (imageSelected) {
      console.log("im here", imageSelected);
      const formData = new FormData();

      formData.append("file", imageSelected);
      formData.append("upload_preset", "arete-app");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/ddaeunjfu/image/upload",
          formData
        )
        .then((res) => {
          const slidePicObj = {
            imageURL: res.data.secure_url,
            slideId: props.slide.id,
            description: props.slide.description,
          };
          console.log(slidePicObj);
        })
        .then(history.push(`/slide/${slideId}`));
    } else {
      window.alert("You must select a file");
    }
  };

  return (
    <>
      <form className="form submit_pic">
        <h5>Choose Your Image to Upload</h5>
        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        ></input>

        <div className="btn" onClick={handleAddFile}>
          Upload Image
        </div>
      </form>
    </>
  );
};
