import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../../api'

const {
    getRowLesson,
    getRowLessonSuccess,
    getRowLessonFailed,
    // setCourseTime,
    setIsSwitch,
    pushRowLesson,
    editRowLesson,
    editRowLessonSuccess,
    editRowLessonFailed,
    addRowLesson,
    addRowLessonSuccess,
    addRowLessonFailed,
    deleteRowLesson,
    deleteRowLessonSuccess,
    deleteRowLessonFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_row_lesson',
    'get_row_lesson_success',
    'get_row_lesson_failed',
    'set_course_time',
    'set_is_switch',
    'push_row_lesson',
    'edit_row_lesson',
    'edit_row_lesson_success',
    'edit_row_lesson_failed',
    'add_row_lesson',
    'add_row_lesson_success',
    'add_row_lesson_failed',
    'delete_row_lesson',
    'delete_row_lesson_success',
    'delete_row_lesson_failed',
    'set_msg',
    'clear_msg'
)
const epic = action$ =>
    action$.pipe(
        ofType(getRowLesson),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getCourseClasstimes(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getRowLessonSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'rowLessonMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )
const addRowLessonEpic = action$ =>
    action$.pipe(
        ofType(addRowLesson),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addCourse(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addRowLessonSuccess(res.data))
                            observer.next(getRowLesson({ teamId: action.payload.teamId }))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addRowLessonMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editRowLessonEpic = action$ =>
    action$.pipe(
        ofType(editRowLesson),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editCourse(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editRowLessonSuccess(res.data))
                            observer.next(getRowLesson({ teamId: action.payload.teamId }))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editRowLessonMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const rowLessonActions = {
    getRowLesson, //获取时间模板列表
    // setCourseTime, //选择模板
    setIsSwitch,
    pushRowLesson, //添加列表
    editRowLesson, //编辑时间模板
    addRowLesson, //添加时间模板
    deleteRowLesson, //删除时间模板
    setMsg,
    clearMsg,
}

export const rowLessonEpic = combineEpics(epic, addRowLessonEpic, editRowLessonEpic)

const rowLessonReducer = handleActions(
    {
        [getRowLesson]: (state, action) => ({
            ...state,
            isRowLesson: true,
            rowLessonReady: false,
        }),
        [getRowLessonSuccess]: (state, action) => {
            let weekDayArr = JSON.stringify([
                {
                    id: 1,
                    name: '',
                    week: 'Monday',
                },
                {
                    id: 2,
                    name: '',
                    week: 'Tuesday',
                },
                {
                    id: 3,
                    name: '',
                    week: 'Wednesday',
                },
                {
                    id: 4,
                    name: '',
                    week: 'Thursday',
                },
                {
                    id: 5,
                    name: '',
                    week: 'Friday',
                },
                {
                    id: 6,
                    name: '',
                    week: 'Saturday',
                },
                {
                    id: 0,
                    name: '',
                    week: 'Sunday',
                },
            ])
            let amClassIdx = 1
            let pmClassIdx = 1
            let nightClassIdx = 1
            action.payload.courseTimeDTO.amClass.map((item, index) => {
                if (item.type === 2) {
                    item.name = `第${amClassIdx}节`
                    amClassIdx += 1
                }
                item.weekDayArr = JSON.parse(weekDayArr)
            })
            action.payload.courseTimeDTO.pmClass.map((item, index) => {
                if (item.type === 2) {
                    item.name = `第${pmClassIdx}节`
                    pmClassIdx += 1
                }
                item.weekDayArr = JSON.parse(weekDayArr)
            })
            action.payload.courseTimeDTO.nightClass.map((item, index) => {
                if (item.type === 2) {
                    item.name = `第${nightClassIdx}节`
                    nightClassIdx += 1
                }
                item.weekDayArr = JSON.parse(weekDayArr)
            })
            action.payload.courseDTOS.map((item, index) => {
                if (item.type === 1) {
                    let amClass = action.payload.courseTimeDTO.amClass[item.section].weekDayArr
                    amClass.map((a, b) => {
                        if (item.weekDay === 0) {
                            amClass[amClass.length - 1].name = item.subjectName
                        } else if (item.weekDay === b + 1) {
                            a.name = item.subjectName
                        }
                    })
                } else if (item.type === 2) {
                    let pmClass = action.payload.courseTimeDTO.pmClass[item.section].weekDayArr
                    pmClass.map((a, b) => {
                        if (item.weekDay === 0) {
                            pmClass[pmClass.length - 1].name = item.subjectName
                        } else if (item.weekDay === b + 1) {
                            a.name = item.subjectName
                        }
                    })
                } else {
                    let nightClass = action.payload.courseTimeDTO.nightClass[item.section].weekDayArr
                    nightClass.map((a, b) => {
                        if (item.weekDay === 0) {
                            nightClass[nightClass.length - 1].name = item.subjectName
                        } else if (item.weekDay === b + 1) {
                            a.name = item.subjectName
                        }
                    })
                }
            })
            return {
                ...state,
                rowLessonData: action.payload,
                isRowLesson: false,
                rowLessonReady: true,
            }
        },
        [getRowLessonFailed]: state => ({
            ...state,
            isRowLesson: false,
            rowLessonReady: false,
        }),
        [addRowLesson]: (state, action) => ({
            ...state,
            isAddRowLesson: true,
            addRowLessonReady: false,
        }),
        [addRowLessonSuccess]: (state, action) => ({
            ...state,
            isAddRowLesson: false,
            addRowLessonReady: true,
        }),
        [addRowLessonFailed]: state => ({
            ...state,
            isAddRowLesson: false,
            addRowLessonReady: false,
        }),
        [editRowLesson]: (state, action) => ({
            ...state,
            isEditRowLesson: true,
            editRowLessonReady: false,
        }),
        [editRowLessonSuccess]: (state, action) => ({
            ...state,
            isEditRowLesson: false,
            editRowLessonReady: true,
        }),
        [editRowLessonFailed]: state => ({
            ...state,
            isEditRowLesson: false,
            editRowLessonReady: false,
        }),
        // [setCourseTime]: (state, action) => ({
        //     ...state,
        //     courseTime: action.payload,
        // }),
        [setIsSwitch]: (state, action) => ({
            ...state,
            isSwitch: action.payload,
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
        isRowLesson: false,
        rowLessonReady: false,
        rowLessonData: {},
        courseTime: {},
        isSwitch: false,
        isAddRowLesson: false,
        addRowLessonReady: false,
        addRowLessonData: {},
        isEditRowLesson: false,
        editRowLessonReady: false,
        editRowLessonData: {},
    }
)

export default rowLessonReducer
