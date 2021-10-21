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
import { deleteSlide} from "../../modules/SlideManager";
import "./Slide.css";

export const SlideCard = ({ slide , updateList }) => {
  const [date] = slide.dateCreated.split("T");
  const history = useHistory();

  const handleDelete = () => {
    deleteSlide(slide.id).then(history.push("/slide")).then(updateList())
  };

  const handleEdit = () => {
    history.push(`/slide/form/${slide.id}`);
  };

  const handleDetails = () => {
    history.push(`/slide/${slide.id}`)

  return (
    <>
      <div>
        <Card className="slide-card">
          <CardImg top width="100%" src={slide.imageUrl} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">{slide.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {" "}
              Submited by: {slide.microscope.user.fullName} on {date}
            </CardSubtitle>
            <CardText>{slide.microscope.make} {slide.microscope.model}</CardText>
            <CardText> Magnification: x{slide.magnification}</CardText>
            <CardText>{slide.description}</CardText>
            
            <div className="slide-buttons">
            <Button className="slide-btn" onClick={handleDetails}>Details</Button>
            <Button className="slide-btn" onClick={handleEdit}>Edit Slide</Button>
            <Button className="slide-btn" onClick={handleDelete}>Delete Slide</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}}
