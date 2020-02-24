import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

const {
    getTeam,
    getTeamSuccess,
    getTeamFailed,
    editTeam,
    editTeamSuccess,
    editTeamFailed,
    addTeam,
    addTeamSuccess,
    addTeamFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_team',
    'get_team_success',
    'get_team_failed',
    'edit_team',
    'edit_team_success',
    'edit_team_failed',
    'add_team',
    'add_team_success',
    'add_team_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getTeam),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getTeamList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getTeamSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'teamMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editTeamEpic = action$ =>
    action$.pipe(
        ofType(editTeam),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editTeam(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editTeamSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                            }
                            observer.next(getTeam(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editTeamMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addTeamEpic = action$ =>
    action$.pipe(
        ofType(addTeam),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addTeam(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addTeamSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                            }
                            observer.next(getTeam(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addTeamMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const teamActions = {
    getTeam, //获取班级列表
    editTeam, //编辑班级
    addTeam, //添加班级
    setMsg,
    clearMsg,
}

export const teamEpic = combineEpics(epic, editTeamEpic, addTeamEpic)

const teamReducer = handleActions(
    {
        [getTeam]: state => ({
            ...state,
            isTeacher: true,
        }),
        [getTeamSuccess]: (state, action) => ({
            ...state,
            teamData: action.payload.data
                ? action.payload.data.map(item => {
                      item.newStatus = item.status ? '启用' : '禁用'
                      item.newName = item.name + '班'
                      item.newPeriod = item.period + '级'
                      item.newSegment = item.segment === 1 ? '小学' : item.segment === 2 ? '初中' : '高中'
                      item.newStudentCount = item.studentCount + '人'
                      item.newEntryTime = dayjs(item.entryTime * 1000).format('YYYY 年 M 月 D 日')
                      item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
                      return item
                  })
                : [],
            teamPageData: action.payload.page,
            isTeam: false,
            teamReady: true,
        }),
        [getTeamFailed]: state => ({
            ...state,
            isTeam: false,
        }),
        [editTeam]: state => ({
            ...state,
            isEditTeam: true,
        }),
        [editTeamSuccess]: (state, action) => ({
            ...state,
            editTeamData: action.payload,
            isEditTeam: false,
            editTeamReady: true,
        }),
        [editTeamFailed]: state => ({
            ...state,
            isEditTeam: false,
        }),
        [addTeam]: state => ({
            ...state,
            isAddTeam: true,
        }),
        [addTeamSuccess]: (state, action) => ({
            ...state,
            addTeamData: action.payload,
            isAddTeam: false,
            addTeamReady: true,
        }),
        [addTeamFailed]: state => ({
            ...state,
            isAddTeam: false,
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
        isTeam: false,
        teamReady: false,
        teamData: [],
        teamPageData: {},
        isEditTeam: false,
        editTeamReady: false,
        editTeamData: [],
        isAddTeam: false,
        addTeamReady: false,
        addTeamData: [],
    }
)

export default teamReducer
