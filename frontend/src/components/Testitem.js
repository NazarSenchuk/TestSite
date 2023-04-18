import { Link, Redirect} from 'react-router-dom';
import React, { useState , NavLink } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';


const Testitem = ({note} ) =>{
      const [show, setShow] = useState(false);
      const pk  =  note?.id
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const url = `/test/${pk}`
    return (
    <div>

        <div className = "listitem">

    <div className="card text-dark bg-info mb-3">
  <div className="card-header">
  <div className="d-grid gap-2">
      <Button variant = 'default'  size ='lg' onClick={handleShow} >{note?.name}</Button>

    </div>

  </div>
  <div className="card-body">
    <h5 className="card-title">{note?.description}</h5>
    <p className="card-text">Перше запитання:{note?.test_questions[0].question_text}.</p>
  </div>
</div>
    </div>


    //Модальне вікно


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви хочете пройти цей тест ?</Modal.Body>
        <Modal.Footer>
           <Link variant="primary" to = {url}> Так</Link>

        </Modal.Footer>
      </Modal>


    </div>
    )





}
export default Testitem