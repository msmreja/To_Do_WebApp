import React, {useState, useEffect} from 'react';
import Cards from './Cards';
import AddTask from './AddTask';
import Buy from './Buy';


const TodoList = () => {
    const [modal, setModal] = useState(false);
    const toggle =() => {
        setModal(!modal);
    }
    const [data, setData]=useState([])
    useEffect( () =>{
      fetch("http://127.0.0.1:5000/user").then((result)=>{
        result.json().then((resp)=>{
          setData(resp)
        })
      })
    },[])
    return (
        <>
        <div className='header text-center'>
            <h1>Your To Do List</h1>
            <AddTask />
            <br/>
            <Buy />
        </div>
        <br/>
        <section>
        <div className='container'>
        <div className='Cards'>
            {data.map((item)=>
                <div className='Card'>
                <Cards id={item.id} taskTitle={item.title} timeStamp={item.timestamp} description={item.description} />
                </div>
            )}
        </div>
        </div>
        </section>
       {/* <CreateTask toggle = {toggle} modal ={modal}/>*/}
        </>

    );
};

export default TodoList;