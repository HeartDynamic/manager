import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

import Menu from './Menu'

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding-right: 20px;
    position: relative;
`
const MySubjectName = styled.span`
    line-height: 30px;
    text-align: center;
    width: 58px;
    height: 30px;
    background-color: #ca9fe8;
    color: #fff;
    border-radius: 2px;
`
const MyAvatar = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    border: 1px solid;
    border-radius: 50%;
    color: #999;
    svg {
        font-size: 30px;
    }
`

const Right = props => {
    const [isInfoMenu, setIsInfoMenu] = useState(false)
    const handleClickInfoMenu = () => {
        setIsInfoMenu(!isInfoMenu)
    }
    const handleCloseMenu = () => {
        setIsInfoMenu(false)
    }
    const tagRef = useRef(null)
    Right.handleClickOutside = () => setIsInfoMenu(false)
    return (
        <Container>
            <MySubjectName>教务</MySubjectName>
            <MyAvatar onMouseDown={handleClickInfoMenu} ref={tagRef}>
                <FontAwesomeIcon icon={faUserTie} />
            </MyAvatar>
            {isInfoMenu && <Menu userInfo={props} close={handleCloseMenu} tagRef={tagRef} />}
        </Container>
    )
}

export default Right
