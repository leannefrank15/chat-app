import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import { Loader } from 'rsuite';

const PublicRoute = ({children, ...routeProps}) => {
  const {profile, isLoading} = useProfile();

  if(isLoading && !profile){
    return(
      <div>
        <Loader center vertical size="lg" content="Loading..." speed="slow"/>

      </div>
    )

  }

  if(profile && !isLoading){
    return (
    <Redirect to="/">

    </Redirect>
    )
  }

  return (
    <Route {...routeProps}>

      {children}

    </Route>
  )
}

export default PublicRoute
