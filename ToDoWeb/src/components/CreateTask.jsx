import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from 'reactstrap';
import axios from "axios";

const CreateTask = (modal,toggle) => {

    const [titleName, setTitleName]=useState('');
    const [description, setDescription]=useState('');

    const handleChange = (e)=>{
        const{name,value}=e.target

        if(name === "title"){
            setTitleName(value)
        }
        else{
            setDescription(value)
        }

    }

    

    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Item</ModalHeader>
        <ModalBody>
        <form action="/insert" method="post">
            <div className='form-group'>
            <label htmlFor="title">Title:</label>
            <input className='form-control' type="text" id="title" name="title" value={titleName} onChange={handleChange} />
            </div>
            <div className='form-group'>
            <label htmlFor="description">Description:</label>
            <textarea  className='form-control' id="description" name="description" value={description} onChange={handleChange} />
            </div>
        </form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={formData}> ADD</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

    );
};

export default CreateTask;