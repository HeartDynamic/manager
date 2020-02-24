import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { actions } from '../../redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { encrypt } from '../../utils/encrypt'
import Input from '../../components/input'

const MyH2 = styled.h2``
const Container = styled.div`
    position: absolute;
    width: 500px;
    height: 600px;
    left: 50%;
    top: 50%;
    margin: -300px 0 0 -250px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 40px 40px;
`

const CaptchaWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const CaptchaInput = styled(Input)``
const Captcha = styled.div`
    width: 150px;
    margin-left: 20px;
    height: 80px;
`
const CaptcahImg = styled.div`
    border: 1px solid #ccc;
    height: 56px;
    margin-top: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    background-image: url(${props => props.img});
    background-size: 100% 100%;
    cursor: pointer;
`
const LoginButton = styled.div`
    width: 100%;
    height: 56px;
    background-color: #00a6f3;
    line-height: 56px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
`
const Spinner = styled.div`
    border: 1px solid #ccc;
    height: 56px;
    margin-top: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    background-size: 100% 100%;
    font-size: 25px;
    line-height: 56px;
    text-align: center;
    color: #00a6f3;
`
const Warn = styled(Spinner)`
    color: red;
    cursor: pointer;
`
const CaptchaHelper = styled.div`
    height: 20px;
    width: 100%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: red;
`
function PasswordReset(props) {
    const [password, setPassword] = useState('')
    const [passwordReset, setPasswordReset] = useState('')
    const [passwordReset1, setPasswordReset1] = useState('')
    const [captcha, setCaptcha] = useState('')
    //原密码
    const handleChangePassword = event => {
        if (props.passwordMsg) {
            props.clearMsg({
                type: 'passwordMsg',
            })
        }
        setPassword(event.target.value)
    }
    //新密码
    const handleChangePasswordReset = event => {
        if (props.passwordResetMsg) {
            props.clearMsg({
                type: 'passwordResetMsg',
            })
        }
        setPasswordReset(event.target.value)
    }
    //确认密码
    const handleChangePasswordReset1 = event => {
        if (props.passwordReset1Msg) {
            props.clearMsg({
                type: 'passwordReset1Msg',
            })
        }
        setPasswordReset1(event.target.value)
    }
    //验证码
    const handleChangeCaptcha = event => {
        if (props.captchaMsg) {
            props.clearMsg({
                type: 'captchaMsg',
            })
        }
        setCaptcha(event.target.value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!password) {
            props.setMsg({
                type: 'passwordMsg',
                message: '密码不能为空',
            })
            isOk = false
        } else if (!passwordReset) {
            props.setMsg({
                type: 'passwordResetMsg',
                message: '新密码不能为空',
            })
            isOk = false
        } else if (passwordReset.length < 6) {
            props.setMsg({
                type: 'passwordResetMsg',
                message: '密码长度不能为小于6位',
            })
            isOk = false
        } else if (passwordReset.length > 20) {
            props.setMsg({
                type: 'passwordResetMsg',
                message: '密码长度不能超过20位',
            })
            isOk = false
        } else if (!passwordReset1) {
            props.setMsg({
                type: 'passwordReset1Msg',
                message: '确认密码不能为空',
            })
            isOk = false
        } else if (passwordReset1.length < 6) {
            props.setMsg({
                type: 'passwordReset1Msg',
                message: '密码长度不能为小于6位',
            })
            isOk = false
        } else if (passwordReset1.length > 20) {
            props.setMsg({
                type: 'passwordReset1Msg',
                message: '密码长度不能超过20位',
            })
            isOk = false
        } else if (passwordReset !== passwordReset1) {
            props.setMsg({
                type: 'passwordReset1Msg',
                message: '新密码与确认密码不一致',
            })
            isOk = false
        } else if (!captcha) {
            props.setMsg({
                type: 'captchaMsg',
                message: '验证码不能为空',
            })
            isOk = false
        } else if (captcha.toUpperCase() !== props.captcha.capText.toUpperCase()) {
            props.setMsg({
                type: 'captchaMsg',
                message: '验证码输入错误',
            })
            isOk = false
        }
        return isOk
    }
    const handleLogin = () => {
        if (props.isLogining) return
        if (checkForm()) {
            const data = {
                password: encrypt(props.username, password, captcha, props.captcha.key),
                passwordReset: encrypt(props.username, passwordReset, captcha, props.captcha.key),
                key: props.captcha.key,
                captcha: captcha,
            }
            props.passwordReset(data)
        } else {
            props.getCaptcha()
        }
    }
    const handleClickCaptcha = () => {
        props.getCaptcha()
    }
    const handleEnter = event => {
        if (event.which === 13) {
            handleLogin()
            event.target.blur()
        }
    }
    useEffect(() => {
        if (!props.captchaReady && !props.isGettingCaptcha && !props.captchaImgMsg) {
            props.getCaptcha()
        }
    }, [props.captchaReady, props.isGettingCaptcha])
    return (
        <Container>
            <MyH2>修改密码</MyH2>
            <Input
                type='password'
                message={props.passwordMsg}
                label='原密码'
                value={password}
                onChange={handleChangePassword}
            />
            <Input
                type='password'
                label='新密码'
                message={props.passwordResetMsg}
                value={passwordReset}
                onChange={handleChangePasswordReset}
            />
            <Input
                type='password'
                label='确认密码'
                message={props.passwordReset1Msg}
                value={passwordReset1}
                onChange={handleChangePasswordReset1}
            />
            <CaptchaWrap>
                <CaptchaInput
                    label='验证码'
                    type='text'
                    value={captcha}
                    onChange={handleChangeCaptcha}
                    message={props.captchaMsg}
                />
                <Captcha>
                    {props.isGettingCaptcha ? (
                        <Spinner>
                            <FontAwesomeIcon icon={faSpinner} />
                        </Spinner>
                    ) : props.captchaImgMsg ? (
                        <Warn onClick={handleClickCaptcha}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </Warn>
                    ) : (
                        <CaptcahImg img={props.captcha.base64} onClick={handleClickCaptcha} />
                    )}
                    <CaptchaHelper>{props.captchaImgMsg}</CaptchaHelper>
                </Captcha>
            </CaptchaWrap>
            <LoginButton onClick={handleLogin}>
                {props.isLogining ? (
                    <LoginSpinner>
                        <FontAwesomeIcon icon={faSpinner} />
                    </LoginSpinner>
                ) : (
                    '确认修改'
                )}
            </LoginButton>
            <Link to='/'>返回首页</Link>
        </Container>
    )
}

const mapStateToProps = state => {
    return state.user
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.user, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordReset)
