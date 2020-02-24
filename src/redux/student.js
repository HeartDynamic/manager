import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

const {
    getStudent,
    getStudentSuccess,
    getStudentFailed,
    editStudent,
    editStudentSuccess,
    editStudentFailed,
    addStudent,
    addStudentSuccess,
    addStudentFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_student',
    'get_student_success',
    'get_student_failed',
    'edit_student',
    'edit_student_success',
    'edit_student_failed',
    'add_student',
    'add_student_success',
    'add_student_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getStudent),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getStudentList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getStudentSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'studentMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editStudentEpic = action$ =>
    action$.pipe(
        ofType(editStudent),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editStudent(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editStudentSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'login_time',
                                order: 'desc',
                                period: action.payload.period,
                                teamId: action.payload.teamId,
                            }
                            observer.next(getStudent(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editStudentMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addStudentEpic = action$ =>
    action$.pipe(
        ofType(addStudent),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addStudent(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addStudentSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'login_time',
                                order: 'desc',
                                period: action.payload.period,
                                teamId: action.payload.teamId,
                            }
                            observer.next(getStudent(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addStudentMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const studentActions = {
    getStudent, //获取学生列表
    editStudent, //编辑学生
    addStudent, //添加学生
    setMsg,
    clearMsg,
}

export const studentEpic = combineEpics(epic, editStudentEpic, addStudentEpic)

const studentReducer = handleActions(
    {
        [getStudent]: (state, action) => ({
            ...state,
            isStudent: true,
            currentClassId: action.payload.teamId,
        }),
        [getStudentSuccess]: (state, action) => ({
            ...state,
            studentData: action.payload.data
                ? action.payload.data.map(item => {
                      item.newStatus = item.status ? '启用' : '禁用'
                      item.newSex = item.sex ? '女' : '男'
                      item.newStudentCount = item.studentCount + '人'
                      item.newEntryTime = dayjs(item.entryTime * 1000).format('YYYY 年 M 月 D 日')
                      item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
                      return item
                  })
                : [],
            studentPageData: action.payload.page,
            isStudent: false,
            studentReady: true,
        }),
        [getStudentFailed]: state => ({
            ...state,
            isStudent: false,
        }),
        [editStudent]: state => ({
            ...state,
            isEditStudent: true,
        }),
        [editStudentSuccess]: (state, action) => ({
            ...state,
            editStudentData: action.payload,
            isEditStudent: false,
            editStudentReady: true,
        }),
        [editStudentFailed]: state => ({
            ...state,
            isEditStudent: false,
        }),
        [addStudent]: state => ({
            ...state,
            isAddStudent: true,
        }),
        [addStudentSuccess]: (state, action) => ({
            ...state,
            addStudentData: action.payload,
            isAddStudent: false,
            addStudentReady: true,
        }),
        [addStudentFailed]: state => ({
            ...state,
            isAddStudent: false,
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
        isStudent: false,
        studentReady: false,
        studentData: [],
        studentPageData: {},
        isEditStudent: false,
        editStudentReady: false,
        editStudentData: [],
        isAddStudent: false,
        addStudentReady: false,
        addStudentData: [],
        currentClassId: null,
    }
)

export default studentReducer
