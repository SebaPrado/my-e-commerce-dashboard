import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function TracklistModal({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <IconButton onClick={handleShow}>
        <FormatListBulletedIcon />
      </IconButton>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex flex-column">
              <div className="fw-lighter fs-5">{product.artist.name}</div>
              <div className="">{product.name}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <img
                className="tracklist-modal-image"
                src={`${import.meta.env.VITE_IMG_URL}/products/${
                  product.image
                }`}
                alt=""
              />
            </div>
            <div className="col-6 d-flex align-items-center">
              {product && (
                <div key={product.id}>
                  <ol>
                    {product.tracklist.map((track, index) => (
                      <li key={index} className="mb-1">
                        {track}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TracklistModal;
