import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

const MyInfoMenu = styled.section`
    width: 240px;
    position: absolute;
    z-index: 100;
    top: 56px;
    right: 10px;
    user-select: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`
const MyInfoMenuHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 92px;
    background-color: #ca9fe8;
    color: #fff;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`
const MyTriangleUp = styled.span`
    position: absolute;
    top: -6px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #ca9fe8;
`
const MyInfoAvatar = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    svg {
        font-size: 30px;
    }
`
const MyInfoBox = styled.div`
    width: 160px;
`
const MyInfoRealname = styled.p`
    font-size: 14px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: #fefeff;
    padding-left: 10px;
`
const MyInfoUsername = styled(MyInfoRealname)`
    font-size: 12px;
`

const MyInfoMenuFooter = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 58px;
    /* border: 1px solid #edf0f5; */
    background-color: #fff;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
`
const MyLink = styled(Link)`
    box-sizing: border-box;
    display: block;
    height: 28px;
    line-height: 26px;
    text-align: center;
    border: 1px solid #edf0f5;
    border-radius: 13px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #7a8fb8;
    padding: 0px 14px;
    background-color: #fff;
    &:hover {
        background-color: #ccc;
        border: 1px solid #fff;
        color: #fff;
    }
`
const MyLogOut = styled.button`
    box-sizing: border-box;
    display: block;
    height: 28px;
    line-height: 26px;
    text-align: center;
    border: 1px solid #edf0f5;
    border-radius: 13px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #7a8fb8;
    padding: 0px 14px;
    outline: none;
    background-color: #fff;
    &:hover {
        background-color: #ccc;
        border: 1px solid #fff;
        color: #fff;
    }
`

function Menu(props) {
    Menu.handleClickOutside = event => {
        if (event.target === props.tagRef.current) return
        props.close()
    }
    const handleClickLogOut = () => {
        props.userInfo.userInfo.logOut()
    }
    return (
        <MyInfoMenu>
            <MyTriangleUp />
            <MyInfoMenuHeader>
                <MyInfoAvatar>
                    <FontAwesomeIcon icon={faUserTie} />
                </MyInfoAvatar>
                <MyInfoBox>
                    <MyInfoRealname>{props.userInfo.userInfo.userInfo.realname}</MyInfoRealname>
                    <MyInfoUsername>{props.userInfo.userInfo.userInfo.schoolName}</MyInfoUsername>
                    {/* {props.userInfo.userInfo.userInfo.username} */}
                </MyInfoBox>
            </MyInfoMenuHeader>
            <MyInfoMenuFooter>
                <MyLink to='/password-reset'>修改密码</MyLink>
                <MyLogOut onClick={handleClickLogOut}>退出登录</MyLogOut>
            </MyInfoMenuFooter>
        </MyInfoMenu>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => Menu.handleClickOutside,
}

export default onClickOutside(Menu, clickOutsideConfig)
