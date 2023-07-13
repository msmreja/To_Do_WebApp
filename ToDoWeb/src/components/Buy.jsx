import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function Buy(props) {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState(String(dateTime));
  const [imagePath, setImagePath] = useState('');


const userId = 1;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.warn(username,description,timestamp,imagePath)
    const user = {
      username,
      title,
      description,
      timestamp,
      image_path: imagePath,
    };

    await axios.put(`http://localhost:5000/user/${props.id}`, user);
    window.location.reload(false);
  };


  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  return (
    <div>
      <Button color="btn btn-success" onClick={toggle}>Buy Premmium</Button>
      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Buy Premmium</ModalHeader>
        <ModalBody>
        <form action="http://127.0.0.1:5000/create-checkout-session" method="POST">
            <button type="submit">Checkout</button>
        </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Add
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Buy;