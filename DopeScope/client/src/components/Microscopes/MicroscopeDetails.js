import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { Button, Container } from "reactstrap";
import { getMicroscopesById } from "../../modules/MicroscopeManager";
import { getSlideByScopeId } from "../../modules/SlideManager";
import { SideBar } from "../SideBar/SideBar";
import { SlideCard } from "../Slides/SlideCard";

export const MicroscopeDetail = () => {
  const history = useHistory();
  const { scopeId } = useParams();

  const [scope, setScope] = useState({
    make: "",
    model: "",
    userId: "",
    user: {
      firstName: "",
      lastName: "",
      fullName: "",
    },
  });
  const [slides, setSlides] = useState([]);

  const handleEdit = () => {
    history.push(`/microscope/form/${scope.id}`);
  };

  useEffect(() => {
    getMicroscopesById(scopeId).then(setScope);
    getSlideByScopeId(scopeId).then(setSlides);
  }, []);
  return (
    <>
      <container className="scope-details-wrapper">
        <div className="scope-details-container">
          <div className="scope-details-header">
            <h1 className="scope-name">
              {scope.make} {scope.model}
            </h1>
            {/* <div className="scope-owner">{scope.user.fullName}</div> */}
          </div>
          {/* <h5>{scope.user.fullName}</h5> */}
          {/* <h5>Scopes Slides</h5> */}
          <div className="scope-slides-wrapper">
            <h5 className="scope-slide-title"> {slides.length !== 0 ? <>{slides.length} {slides.length === 1 ? <>Slide</> : <>Slides</> }</> : <>Slides</>}</h5>
            <h5 className="scope-slide-title">
              ________________________________________________________________________________________
            </h5>
            <div className="scope-slides">
              {slides.length === 0 ? (
                <div>Currenlty No Slides </div>
              ) : (
                slides?.map((slide) => {
                  return <SlideCard key={slide.id} slide={slide} />;
                })
              )}
            </div>
            <Button className="scope-card-btn" onClick={handleEdit}>
              Edit Scope
            </Button>
          </div>
        </div>
        <img
          className="scope-detail-image"
          src={scope.imageUrl}
          alt={scope.model}
        />
      </container>
    </>
  );
};
