import React from 'react'

import {NavigatorContainer} from './NavigatorContainer'
import ApolloClient from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'
import {BrowserRouter as Router, withRouter} from 'react-router-dom'

import './App.css'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:3001',
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  onError: ({networkError}) => {
    if (networkError) console.log('Network Error:', networkError)
  },
  cache
})

const WrapperWithRouter = withRouter(NavigatorContainer)

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <WrapperWithRouter />
    </Router>
  </ApolloProvider>
)
