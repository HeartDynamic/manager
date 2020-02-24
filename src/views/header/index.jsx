import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'

import Right from './Right'
import Nav from './Nav'

import logo from '../../images/logo_like2.png'

const MyHeader = styled.header`
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 6px 9px 0px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.div`
    height: 64px;
    width: 174px;
    background-color: #ccc;
    margin-left: 20px;
    background-image: url(${logo});
    background-size: 100% 100%;
`

function Header(props) {
    return (
        <MyHeader>
            <Logo />
            <Nav />
            <Right userInfo={props} />
        </MyHeader>
    )
}
const mapStateToProps = state => {
    return state.user
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.user, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
