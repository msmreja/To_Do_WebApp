import  React,{ useEffect, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import Keycloak from 'keycloak-js';

{/*

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloak =  new Keycloak('keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      setKeycloak(keycloak);
      setAuthenticated(authenticated);
    });
  }, []);

  if(keycloak){
    if(authenticated) return (
      <div className="App">
        <TodoList />
      </div>
    ); else return (<div>Unable to authenticate!</div>)
  }
  return (
    <div>Keycloak is not working...</div>
  );
}
*/}

function App() {
  return(
    <>
    <TodoList />
    </>
  );
}

export default App;
