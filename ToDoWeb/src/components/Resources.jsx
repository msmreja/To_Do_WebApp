import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

export default function Resources(){
    const [keycloak, setKeycloak] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(()=>{
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
          setKeycloak(keycloak)
          setAuthenticated(authenticated)
        })
      }, [])
  }