import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

const {
    getTeaching,
    getTeachingSuccess,
    getTeachingFailed,
    editTeaching,
    editTeachingSuccess,
    editTeachingFailed,
    addTeaching,
    addTeachingSuccess,
    addTeachingFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_teaching',
    'get_teaching_success',
    'get_teaching_failed',
    'edit_teaching',
    'edit_teaching_success',
    'edit_teaching_failed',
    'add_teaching',
    'add_teaching_success',
    'add_teaching_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getTeachingList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getTeachingSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'teachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editTeachingEpic = action$ =>
    action$.pipe(
        ofType(editTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editTeaching(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editTeachingSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getTeaching(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editTeachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addTeachingEpic = action$ =>
    action$.pipe(
        ofType(addTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addTeaching(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addTeachingSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getTeaching(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addTeachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const teachingActions = {
    getTeaching, //获取教务列表
    editTeaching, //编辑教务
    addTeaching, //添加教务
    setMsg,
    clearMsg,
}

export const teachingEpic = combineEpics(epic, editTeachingEpic, addTeachingEpic)

const teachingReducer = handleActions(
    {
        [getTeaching]: state => ({
            ...state,
            isTeaching: true,
        }),
        [getTeachingSuccess]: (state, action) => ({
            ...state,
            teachingData: action.payload.data
                ? action.payload.data.map(item => {
                      item.newSex = item.sex ? '女' : '男'
                      item.newStatus = item.status ? '启用' : '禁用'
                      item.newCreateTime = dayjs(item.createTime * 1000).format('YYYY 年 M 月 D 日')
                      item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
                      return item
                  })
                : [],
            teachingPageData: action.payload.page,
            isTeaching: false,
            teachingReady: true,
        }),
        [getTeachingFailed]: state => ({
            ...state,
            isTeaching: false,
        }),
        [editTeaching]: state => ({
            ...state,
            isEditTeaching: true,
        }),
        [editTeachingSuccess]: (state, action) => ({
            ...state,
            editTeachingData: action.payload,
            isEditTeaching: false,
            editTeachingReady: true,
        }),
        [editTeachingFailed]: state => ({
            ...state,
            isEditTeaching: false,
        }),
        [addTeaching]: state => ({
            ...state,
            isAddTeaching: true,
        }),
        [addTeachingSuccess]: (state, action) => ({
            ...state,
            addTeachingData: action.payload,
            isAddTeaching: false,
            addTeachingReady: true,
        }),
        [addTeachingFailed]: state => ({
            ...state,
            isAddTeaching: false,
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
        isTeaching: false,
        teachingReady: false,
        teachingData: [],
        teachingPageData: {},
        isEditTeaching: false,
        editTeachingReady: false,
        editTeachingData: [],
        isAddTeaching: false,
        addTeachingReady: false,
        addTeachingData: [],
    }
)

export default teachingReducer
