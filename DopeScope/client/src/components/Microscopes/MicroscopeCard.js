import React from "react";
import { useHistory } from "react-router";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { deleteMicroscope } from "../../modules/MicroscopeManager";
  import "./Microscope.css";

export const MicroscopeCard = (props) => {

  const history = useHistory();

  const handleOnClick = () => {
    history.push("/microscope/details")
  }
  return (
    <>
      <div>
      <Card>
        {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
        <CardBody>
          <CardTitle tag="h5">{props.microscope.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.microscope.make} {props.microscope.model}</CardSubtitle>
          <CardText>Owner : {props.microscope.user.firstName} {props.microscope.user.lastName}</CardText>
          <Button onClick={handleOnClick}>Details</Button>
        </CardBody>
      </Card>
    </div>
    </>
  );
};
