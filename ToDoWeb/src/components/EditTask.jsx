import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function EditTask(props) {

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
      <Button color="btn btn-success" onClick={toggle}>Edit</Button>
      <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader>Add a New Task</ModalHeader>
        <ModalBody>
        <form>
            <div className="mb-3">
            <label  className="form-label">
              User Name
            </label>
            <input type="text" value={username} className="form-control" id="Tasktitle" name='username' onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label  className="form-label" >
              Title
            </label>
            <input type="text" value={title} className="form-control" id="Tasktitle" name='title' onChange={e => setTitle(e.target.value)} />
          </div>
          <label className="form-label">
              Description
            </label><br/>
          <textarea id="description" value={description} className='form-control' name="description" onChange={e => setDescription(e.target.value)} ></textarea>
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

export default EditTask;