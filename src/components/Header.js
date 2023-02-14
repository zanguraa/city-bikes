import React from 'react'
import bikeLogo from '../assets/bicycle-solid.svg';
import burgerLogo from '../assets/bars-solid.svg'
import styled from 'styled-components';

const Header = ({burger, setBurger}) => {
  return (
    <HeaderCont >
    <img src={bikeLogo} alt='logo' />
    <Burger burger={burger} onClick={()=> setBurger(!burger)}  src={burgerLogo} alt='bars' />
    
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

    </HeaderCont>
  )
}

export default Header

const HeaderCont = styled.div`
width: 100%;
justify-content: space-between;
padding: 20px;
display: flex;
img {
    width: 35px;
    height: 35px;
}
`

const Navigate = styled.ul`
display: none;
width: 50%;
min-width: 500px;
justify-content: space-between;
li {
    list-style: none;
    &:hover {
        color: red;
        scale: 1.1;
        transition: all 1.5s ease-in-out;
    }
}

@media screen and (min-width: 768px) {
display: flex;
    
}
`

const Burger = styled.img`
    width: 35px;
    height: 35px;
display: ${(props) => (!props.burger ? "block" : "none")};

    @media screen and (min-width: 768px) {
        display: none;
    }
`