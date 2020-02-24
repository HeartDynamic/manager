import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'
import Cookies from 'js-cookie'
import { push } from 'connected-react-router'

const {
    getUserInfo,
    getUserInfoSuccess,
    getUserInfoFailed,
    logOut,
    logOutSuccess,
    logOutFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailed,
    getCaptcha,
    getCaptchaSuccess,
    getCaptchaFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_user_info',
    'get_user_info_success',
    'get_user_info_failed',
    'log_out',
    'log_out_success',
    'log_out_failed',
    'password_reset',
    'password_reset_success',
    'password_reset_failed',
    'get_captcha',
    'get_captcha_success',
    'get_captcha_failed',
    'set_msg',
    'clear_msg'
)

export const userActions = {
    getUserInfo, //获取用户信息
    logOut, //退出登录
    passwordReset, //修改密码
    getCaptcha, //验证码
    setMsg,
    clearMsg,
}

const epic = action$ =>
    action$.pipe(
        ofType(getUserInfo),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .userInfo()
                    .then(res => {
                        if (res.data) {
                            observer.next(getUserInfoSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        )
    )
const epicLogOut = action$ =>
    action$.pipe(
        ofType(logOut),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .logOut()
                    .then(res => {
                        if (res.success) {
                            Cookies.remove('token')
                            Cookies.remove('uploadToken')
                            window.location.href = 'https://www.likeyun.net'
                            // window.location.href = 'http://localhost:1234'
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        )
    )

const epicPasswordReset = action$ =>
    action$.pipe(
        ofType(passwordReset),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .passwordReset(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(push('/'))

                            // window.location.href = 'http://localhost:2345'
                        }
                    })
                    .catch(error => {
                        if (error.code === 4010) {
                            observer.next(
                                setMsg({
                                    type: 'captchaMsg',
                                    message: error.message,
                                })
                            )
                        } else {
                            observer.next(
                                setMsg({
                                    type: 'passwordMsg',
                                    message: error.message,
                                })
                            )
                        }
                    })
            })
        )
    )

const captchaEpic = action$ =>
    action$.pipe(
        ofType(getCaptcha),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getCaptcha()
                    .then(res => {
                        if (res.data) {
                            observer.next(getCaptchaSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(getCaptchaFailed())
                        observer.next(
                            setMsg({
                                type: 'captchaImgMsg',
                                message: '获取验证码失败',
                            })
                        )
                    })
            })
        )
    )
export const userEpic = combineEpics(epic, epicLogOut, epicPasswordReset, captchaEpic)

const userReducer = handleActions(
    {
        [getUserInfo]: state => ({
            ...state,
            isGettingUserInfo: true,
        }),
        [getUserInfoSuccess]: (state, action) => ({
            ...state,
            userInfo: action.payload,
            userInfoReady: true,
            isGettingUserInfo: false,
        }),
        [getUserInfoFailed]: state => ({
            ...state,
            isGettingUserInfo: false,
        }),
        [logOut]: (state, action) => ({
            ...state,
            islogOut: true,
        }),
        [logOutSuccess]: (state, action) => ({
            ...state,
            isLogOut: false,
        }),
        [logOutFailed]: state => ({
            ...state,
            isLogOut: false,
        }),
        [passwordReset]: (state, action) => ({
            ...state,
            isPasswordReset: true,
        }),
        [passwordResetSuccess]: (state, action) => ({
            ...state,
            isPasswordReset: false,
            passwordResetData: action.payload,
        }),
        [passwordResetFailed]: state => ({
            ...state,
            isPasswordReset: false,
        }),
        [getCaptcha]: state => ({
            ...state,
            isGettingCaptcha: true,
        }),
        [getCaptchaSuccess]: (state, action) => ({
            ...state,
            captchaReady: true,
            isGettingCaptcha: false,
            captcha: action.payload,
        }),
        [getCaptchaFailed]: state => ({
            ...state,
            isGettingCaptcha: false,
        }),
        [setMsg]: (state, action) => ({
            ...state,
            [action.payload.type]: action.payload.message,
        }),
        [clearMsg]: (state, action) => ({
            ...state,
            [action.payload.type]: '',
        }),
    },
    {
        username: Cookies.get('username') || '',
        token: Cookies.get('token'),
        userInfoReady: false,
        isGettingUserInfo: false,
        userInfo: {},
        isLogOut: false,
        isPasswordReset: false,
        passwordResetData: {},
        captchaReady: false,
        isGettingCaptcha: false,
        captcha: {},
    }
)

export default userReducer
