import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function ProductModal({ order }) {
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
          <Modal.Title>Order:{order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {order && (
            <div key={order.id}>
              <h5 className="mb-3">Products:</h5>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    <hr className="mt-0" />
                    <div className="row">
                      <div className="col-3">
                        <img
                          className="img-table"
                          src={`${import.meta.env.VITE_IMG_URL}/products/${
                            product.image
                          }`}
                          alt=""
                        />
                      </div>
                      <div className="col-7 pt-4 pb-3 d-flex flex-column justify-content-between">
                        <div>
                          <p className="m-0 fw-bold">{product.name}</p>
                          <p className="m-0">{product.artist}</p>
                        </div>
                        <div>
                          <p className="text-secondary">
                            Quantity:{product.amount}
                          </p>
                        </div>
                      </div>
                      <div className="col-2 pt-4 fw-bold text-center">
                        <p>${product.price}</p>
                      </div>
                    </div>
                    <hr className="m-0" />
                  </li>
                ))}
              </ul>
            </div>
          )}
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

export default ProductModal;
