import React from 'react';
import './App.css';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient} from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
const client=new apolloCLient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache()
})

function App() {
  return (
<ApolloProvider client={client}>
<>
<Navbar />
<Outlet />
</>
</ApolloProvider>
);
}

export default App;
