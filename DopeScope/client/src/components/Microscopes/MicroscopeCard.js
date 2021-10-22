import React from "react";
import { useHistory } from "react-router";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

  import "./Microscope.css";

export const MicroscopeCard = (props) => {

  const history = useHistory();
  const location = history.location.pathname

  const handleOnClick = () => {
    history.push(`/microscope/${props.microscope.id}`)
  }

  const handleEdit = () => {
    history.push(`/microscope/form/${props.microscope.id}`)
  }
  return (
    <>
      <div className="scope-card-container">
      <Card>
        {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
        <CardBody>
          {/* <CardTitle className="scope-name" tag="h5">{props.microscope.name}</CardTitle> */}
          <div className="title-scope">
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.microscope.make} {props.microscope.model}</CardSubtitle>
          </div>
          <CardText>{location === "/myscopes" || location ==="/" ? <></> :<div> Owner : {props.microscope.user.firstName} {props.microscope.user.lastName}</div> }</CardText>
          <Button className="scope-card-btn" onClick={handleOnClick}>Details</Button>
          <Button className="scope-card-btn" onClick={handleEdit}>Edit</Button>
        </CardBody>
      </Card>
    </div>
    </>
  );
};
