import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'

import { actions } from './redux'
import styled from 'styled-components'

import Teaching from './views/teaching'
import Teacher from './views/teacher'
import Team from './views/team'
import Header from './views/header'
import Schedul from './views/schedul'
import PasswordReset from './views/header/PasswordReset'
const MySection = styled.main`
    padding-top: 100px;
    margin: 0 auto;
    width: 1366px;
    height: calc(100vh - 100px);
`
function App(props) {
    useEffect(() => {
        if (!props.isGettingUserInfo && !props.userInfoReady) {
            props.getUserInfo(props.token)
        }
    }, [props.isGettingUserInfo, props.userInfoReady])
    return (
        <>
            <Header />
            <MySection>
                <Switch>
                    <Route path='/password-reset' component={PasswordReset} />
                    <Route path='/team' component={Team} />
                    <Route path='/teacher' component={Teacher} />
                    <Route path='/schedul' component={Schedul} />
                    <Route path='/' component={Teaching} />
                </Switch>
            </MySection>
        </>
    )
}

const mapStateToProps = state => {
    return state.user
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.user, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
