import React from "react";
import { useHistory } from "react-router";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import "./Slide.css";

export const SlideCard = ({ slide }) => {
  const [date] = slide.dateCreated.split("T");
  const history = useHistory();

  const handleDelete = () => {};

  const handleEdit = () => {
    history.push("/slide/edit");
  };

  return (
    <>
      <div>
        <Card>
          {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
          <CardBody>
            <CardTitle tag="h5">{slide.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {" "}
              Submited by: {slide.microscope.user.firstName}{" "}
              {slide.microscope.user.lastName} on {date}
            </CardSubtitle>
            <CardText>{slide.description}</CardText>
            <div className="slide-buttons">
            <Button className="slide-btn" onClick={handleEdit}>Edit Slide</Button>
            <Button className="slide-btn" onClick={handleDelete}>Delete Slide</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
