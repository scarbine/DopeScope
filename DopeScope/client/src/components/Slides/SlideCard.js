import React from "react";
import { useHistory } from "react-router";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

import "./Slide.css";

export const SlideCard = ({ slide, updateList }) => {
  const [date] = slide.dateCreated.split("T");
  const history = useHistory();

  const handleDetails = () => {
    history.push(`/slide/${slide.id}`);
  };

  return (
    <>
      <div className="slide-card-container">
        <Card className="slide-card">
          <CardImg
            top
            width="100%"
            src={slide.imageUrl}
            alt="Card image cap"
            onClick={handleDetails}
          />
          <CardBody>
            <div className="card-subtitle">
              <CardTitle tag="h5">{slide.name}</CardTitle>
            </div>
            <div className="slide-buttons"></div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
