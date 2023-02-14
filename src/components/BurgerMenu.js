import React from 'react'
import styled from 'styled-components'
import Xmark from '../assets/xmark-solid.svg'

const BurgerMenu = ({setBurger, burger}) => {
  return (
    <Overlay>
    <BurgerContainer>
    <Navigate>
    <li>
    Bike City
    </li>
    <li>
    Contact
    </li>
    <li>
    About Us
    </li>
    </Navigate>
    </BurgerContainer>
    <img style={{
        width: '40px',
        height: '40px',
        position: 'absolute',
        top: 10,
        right: 10,
    }} src={Xmark} onClick={()=> setBurger(!burger)} alt='xmark' />
    </Overlay>
  )
}

export default BurgerMenu


const Overlay = styled.div`
position: absolute;
z-index: 10;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: rgba(25, 13, 26, 0.5); 
padding-right: 20px;
`

const BurgerContainer = styled.div`
width: 80%;
height: 100%;
background-color: black;

`

const Navigate = styled.ul`
display: flex;
flex-direction: column;
gap: 20px;
align-items: flex-start;
margin: 0;
padding: 20px;
li {
    list-style: none;
    font-size: 34px;
    color: white;
    &:hover {
        color: red;
        scale: 1.1;
        transition: all 1.5s ease-in-out;
    }
}


`