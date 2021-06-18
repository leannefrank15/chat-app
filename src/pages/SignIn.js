import React from 'react'
import firebase from 'firebase/app'
import { Container, Grid, Row, Panel, Button, Icon, Alert } from 'rsuite'
import { Col } from 'rsuite'
import { auth, database } from '../misc/firebase'
import  '../styles/utility.scss'

const SignIn = () => { //grid has 24 columns. on mobiles, all 24 will be displayed

  const signInWithProvider=async(provider)=>{
    try{
      const {additionalUserInfo, user} =await auth.signInWithPopup(provider)
      Alert.success('signed in successfully', 4000)

      if(additionalUserInfo.isNewUser){
        await database.ref(`profiles/${user.uid}`).set({
          name : user.displayName,
          createdAt : firebase.database.ServerValue.TIMESTAMP
        })
      }
    }
    catch(err){
      Alert.error(err.message, 4000); //milliseconds

    }
      
  }

  const onGoogleSignIn =()=>{
    signInWithProvider(new firebase.auth.GoogleAuthProvider())
  }
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}> 
            <Panel>
             <div className='text-center'>
               <h2>Welcome to chat</h2>
               <p>progressive chat app for neophytes</p>
             </div>

             <div className="mt-3">
               <Button block color="green" onClick={onGoogleSignIn}>
                 <Icon icon="google"/> Continue with Google
               </Button>
             </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default SignIn
