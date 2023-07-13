import React, {useState} from 'react';
import EditTask from './EditTask';
import axios from 'axios';

const Cards = (props) => {
    const handleDelete = (event) => {
        console.log(props.id)
        deleteData(props.id);
      };
      const deleteData =async (id)=>{
            await axios.delete(`http://localhost:5000/user/${id}`);
            window.location.reload(false);
      }
    return (
            <div className="card" style={{ width: "18rem" }}>
            <img src="" className="card-img-top" alt="Buy Prememium" />
            <div className="card-body">
                <h5 className="card-title">{props.taskTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.timeStamp}</h6>
                <p className="card-text">{props.description}
                </p>
            </div>
            <div className="card-body">
                <div align='center'>
                    <EditTask id={props.id} />
                </div>
                <br/>
                <div align='center'>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                </div>
            </div>
            </div>
    );
};

export default Cards;