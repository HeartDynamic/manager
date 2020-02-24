import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)

const {
    getTeacher,
    getTeacherSuccess,
    getTeacherFailed,
    editTeacher,
    editTeacherSuccess,
    editTeacherFailed,
    addTeacher,
    addTeacherSuccess,
    addTeacherFailed,
    getSubjects,
    getSubjectsSuccess,
    getSubjectsFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_teacher',
    'get_teacher_success',
    'get_teacher_failed',
    'edit_teacher',
    'edit_teacher_success',
    'edit_teacher_failed',
    'add_teacher',
    'add_teacher_success',
    'add_teacher_failed',
    'get_subjects',
    'get_subjects_success',
    'get_subjects_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getTeacher),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getTeacherList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getTeacherSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'teacherMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editTeacherEpic = action$ =>
    action$.pipe(
        ofType(editTeacher),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editTeacher(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editTeacherSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'entry_time',
                                order: 'desc',
                            }
                            observer.next(getTeacher(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editTeacherMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addTeacherEpic = action$ =>
    action$.pipe(
        ofType(addTeacher),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addTeacher(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addTeacherSuccess(res))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'entry_time',
                                order: 'desc',
                            }
                            observer.next(getTeacher(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addTeacherMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const getSubjectsEpic = action$ =>
    action$.pipe(
        ofType(getSubjects),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getSubject(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getSubjectsSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'subjectsMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const teacherActions = {
    getTeacher, //获取老师列表
    editTeacher, //编辑老师
    addTeacher, //添加老师
    getSubjects, //获取学科
    setMsg,
    clearMsg,
}

export const teacherEpic = combineEpics(epic, editTeacherEpic, addTeacherEpic, getSubjectsEpic)

const teacherReducer = handleActions(
    {
        [getTeacher]: state => ({
            ...state,
            isTeacher: true,
        }),
        [getTeacherSuccess]: (state, action) => ({
            ...state,
            teacherData: action.payload.data
                ? action.payload.data.map(item => {
                      item.newSex = item.sex ? '女' : '男'
                      item.newStatus = item.status ? '启用' : '禁用'
                      item.newEntryTime = dayjs(item.entryTime * 1000).format('YYYY 年 M 月 D 日')
                      item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
                      return item
                  })
                : [],
            teacherPageData: action.payload.page,
            isTeacher: false,
            teacherReady: true,
        }),
        [getTeacherFailed]: state => ({
            ...state,
            isTeacher: false,
        }),
        [editTeacher]: state => ({
            ...state,
            isEditTeacher: true,
        }),
        [editTeacherSuccess]: (state, action) => ({
            ...state,
            editTeacherData: action.payload,
            isEditTeacher: false,
            editTeacherReady: true,
        }),
        [editTeacherFailed]: state => ({
            ...state,
            isEditTeacher: false,
        }),
        [addTeacher]: state => ({
            ...state,
            isAddTeacher: true,
        }),
        [addTeacherSuccess]: (state, action) => ({
            ...state,
            addTeachergData: action.payload,
            isAddTeacher: false,
            addTeacherReady: true,
        }),
        [addTeacherFailed]: state => ({
            ...state,
            isAddTeacher: false,
        }),
        [getSubjects]: state => ({
            ...state,
            isSubjects: true,
        }),
        [getSubjectsSuccess]: (state, action) => ({
            ...state,
            subjectData: action.payload,
            isSubjects: false,
            subjectsReady: true,
        }),
        [getSubjectsFailed]: state => ({
            ...state,
            isSubjects: false,
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
        isTeacher: false,
        teacherReady: false,
        teacherData: [],
        teacherPageData: {},
        isEditTeacher: false,
        editTeacherReady: false,
        editTeacherData: [],
        isAddTeacher: false,
        addTeacherReady: false,
        addTeachergData: [],
        isSubjects: false,
        subjectsReady: false,
        subjectData: [],
    }
)

export default teacherReducer
