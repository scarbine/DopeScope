import React from "react";
import { useHistory } from "react-router";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

  import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,
  } from "cloudinary-react";

  import "./Microscope.css";
  import "../Slides/Slide.css";

export const MicroscopeCard = (props) => {

  const history = useHistory();
  const location = history.location.pathname
  const [, imagePublicIdWithFileExt] = props.microscope.imageUrl.split("DopeScope/");
  const [imagePublicId,] = imagePublicIdWithFileExt.split(".");

  const handleOnClick = () => {
    history.push(`/microscope/${props.microscope.id}`)
  }

  // const handleEdit = () => {
  //   history.push(`/microscope/form/${props.microscope.id}`)
  // }
  return (
    // <>
    //   <div className="scope-card-container">
    //   <Card onClick={handleOnClick}>
    //     <CardImg className="scope-thumbnail" top width="100%" src={props.microscope.imageUrl} alt="Card image cap" />
    //     <CardBody>
    //       {/* <CardTitle className="scope-name" tag="h5">{props.microscope.name}</CardTitle> */}
    //       <div className="title-scope">
    //       <CardSubtitle tag="h6" className="mb-2 text-muted">{props.microscope.make} {props.microscope.model}</CardSubtitle>
    //       </div>
    //       <CardText>{location === "/myscopes" || location ==="/" ? <></> :<div> Owner : {props.microscope.user.firstName} {props.microscope.user.lastName}</div> }</CardText>
    //       {/* <Button className="scope-card-btn" onClick={handleOnClick}>Details</Button>
    //       <Button className="scope-card-btn" onClick={handleEdit}>Edit</Button> */}
    //     </CardBody>
    //   </Card>
    // </div>
    // </>
<>
    <div className="slide-card-container">
        <Card className="slide-card" onClick={handleOnClick}>
          {/* <Image
            top
            className="slide-card-image"
            width="100%"
            src={slide.imageUrl}
            alt="Card image cap"
            onClick={handleDetails}
            thumbnail={true} 
          /> */}
          <CloudinaryContext
            cloudName="ddaeunjfu"
            secure="true"
          
          >
            <Image publicId={`DopeScope/${imagePublicId}`} secure="true">
              <Transformation
                width="237"
                height="237"
                // gravity="face"
                crop="thumb"
              />
            </Image>
          </CloudinaryContext>

          <CardBody>
            <div className="card-subtitle">
              <CardTitle tag="h5">{props.microscope.make} {props.microscope.model}</CardTitle>
              {/* <div>
                {likes.length}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </div> */}
            </div>
            <div className="slide-buttons"></div>
          </CardBody>
        </Card>
      </div>
      </>
  );
};
