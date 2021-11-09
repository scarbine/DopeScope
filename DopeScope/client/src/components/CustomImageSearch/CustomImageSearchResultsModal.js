import React from "react";
import { useState } from "react";

import { Offcanvas, Button } from "bootstrap";

export const CustomerSearchResultsModal = ({
  name,
  searchResults,
  ...props
}) => {
  const [show, setShow] = useState(false);

  const mapSearchResults = () => {
    return searchResults !== undefined ? (
      searchResults.items?.map((sr) => {
        return (
          <>
            <div className="search-return-container">
              <a className="search-return-card" href={sr.image.contextLink}>
                <img
                  className="search-results-image"
                  src={sr.image.thumbnailLink}
                  alt={sr.title}
                />
                <div className="search-result-title">{sr.snippet}</div>
              </a>
            </div>
          </>
        );
      })
    ) : (
      <> </>
    );
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{mapSearchResults()}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

