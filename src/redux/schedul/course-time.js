import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../../api'

const {
    getCourseTime,
    getCourseTimeSuccess,
    getCourseTimeFailed,
    pushCourseTime,
    editCourseTime,
    editCourseTimeSuccess,
    editCourseTimeFailed,
    addCourseTime,
    addCourseTimeSuccess,
    addCourseTimeFailed,
    deleteCourseTime,
    deleteCourseTimeSuccess,
    deleteCourseTimeFailed,
    editCourseTimeState,
    editCourseTimeStateSuccess,
    editCourseTimeStateFailed,
    addCourseDetailCreate,
    addCourseDetailCreateSuccess,
    addCourseDetailCreateFailed,
    editCourseDetail,
    editCourseDetailSuccess,
    editCourseDetailFailed,
    deleteCourseDetail,
    deleteCourseDetailSuccess,
    deleteCourseDetailFailed,
    setCourseTime,
    setMsg,
    clearMsg,
} = createActions(
    'get_course_time',
    'get_course_time_success',
    'get_course_time_failed',
    'push_course_time',
    'edit_course_time',
    'edit_course_time_success',
    'edit_course_time_failed',
    'add_course_time',
    'add_course_time_success',
    'add_course_time_failed',
    'delete_course_time',
    'delete_course_time_success',
    'delete_course_time_failed',
    'edit_course_time_state',
    'edit_course_time_state_success',
    'edit_course_time_state_failed',
    'add_course_detail_create',
    'add_course_detail_create_success',
    'add_course_detail_create_failed',
    'edit_course_detail',
    'edit_course_detail_success',
    'edit_course_detail_failed',
    'delete_course_detail',
    'delete_course_detail_success',
    'delete_course_detail_failed',
    'set_course_time',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getCourseTime),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getCoursesTime(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getCourseTimeSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'courseTimeMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editCourseTimeEpic = action$ =>
    action$.pipe(
        ofType(editCourseTime),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editCoursesTime(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editCourseTimeSuccess(res))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editCourseTimeMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addCourseTimeEpic = action$ =>
    action$.pipe(
        ofType(addCourseTime),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addCoursesTimes(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addCourseTimeSuccess(res))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addCourseTimeMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const deleteCourseTimeEpic = action$ =>
    action$.pipe(
        ofType(deleteCourseTime),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .deleteCoursesTimes(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(deleteCourseTimeSuccess(res))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'deleteCourseTimeMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editCourseTimeStateEpic = action$ =>
    action$.pipe(
        ofType(editCourseTimeState),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editCourseTimeState(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editCourseTimeStateSuccess(res.data))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editCourseTimeStateMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addCourseDetailCreateEpic = action$ =>
    action$.pipe(
        ofType(addCourseDetailCreate),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addCourseDetailCreate(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addCourseDetailCreateSuccess(res.data))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addCourseDetailCreateMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editCourseDetailEpic = action$ =>
    action$.pipe(
        ofType(editCourseDetail),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editCourseDetail(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editCourseDetailSuccess(res.data))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editCourseDetailMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const deleteCourseDetailEpic = action$ =>
    action$.pipe(
        ofType(deleteCourseDetail),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .deleteCourseDetail(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(deleteCourseDetailSuccess(res.data))
                            observer.next(getCourseTime())
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'deleteCourseDetailMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const courseTimeActions = {
    getCourseTime, //获取时间模板列表
    pushCourseTime, //添加列表
    editCourseTime, //编辑时间模板
    addCourseTime, //添加时间模板
    deleteCourseTime, //删除时间模板
    editCourseTimeState, //修改时间模板状态
    addCourseDetailCreate,
    editCourseDetail,
    deleteCourseDetail,
    setCourseTime,
    setMsg,
    clearMsg,
}

export const courseTimeEpic = combineEpics(
    epic,
    editCourseTimeEpic,
    addCourseTimeEpic,
    deleteCourseTimeEpic,
    editCourseTimeStateEpic,
    addCourseDetailCreateEpic,
    editCourseDetailEpic,
    deleteCourseDetailEpic
)

const courseTimeReducer = handleActions(
    {
        [getCourseTime]: (state, action) => ({
            ...state,
            isCourseTime: true,
            courseTimeReady: false,
        }),
        [getCourseTimeSuccess]: (state, action) => ({
            ...state,
            courseTimeData: action.payload.courseTimeDtos,
            courseTimeStatus: action.payload.status,
            isCourseTime: false,
            courseTimeReady: true,
        }),
        [getCourseTimeFailed]: state => ({
            ...state,
            isCourseTime: false,
        }),
        [pushCourseTime]: (state, action) => ({
            courseTimeData: action.payload,
        }),
        [editCourseTime]: state => ({
            ...state,
            isEditCourseTime: true,
        }),
        [editCourseTimeSuccess]: (state, action) => ({
            ...state,
            editCourseTimeData: action.payload,
            isEditCourseTime: false,
            editCourseTimeReady: true,
        }),
        [editCourseTimeFailed]: state => ({
            ...state,
            isEditCourseTime: false,
        }),
        [addCourseTime]: state => ({
            ...state,
            isAddCourseTime: true,
        }),
        [addCourseTimeSuccess]: (state, action) => ({
            ...state,
            addCourseTimeData: action.payload,
            isAddCourseTime: false,
            addCourseTimeReady: true,
        }),
        [addCourseTimeFailed]: state => ({
            ...state,
            isAddCourseTime: false,
        }),
        [deleteCourseTime]: state => ({
            ...state,
            isAddCourseTime: true,
        }),
        [deleteCourseTimeSuccess]: (state, action) => ({
            ...state,
            deleteCourseTimeData: action.payload,
            isAddCourseTime: false,
            deleteCourseTimeReady: true,
        }),
        [deleteCourseTimeFailed]: state => ({
            ...state,
            isAddCourseTime: false,
        }),
        [editCourseTimeState]: state => ({
            ...state,
            isEditCourseTimeState: true,
        }),
        [editCourseTimeStateSuccess]: (state, action) => ({
            ...state,
            editCourseTimeStateData: action.payload,
            isEditCourseTimeState: false,
            editCourseTimeStateReady: true,
        }),
        [editCourseTimeStateFailed]: state => ({
            ...state,
            isEditCourseTimeState: false,
        }),
        [addCourseDetailCreate]: state => ({
            ...state,
            isCourseDetailCreate: true,
        }),
        [addCourseDetailCreateSuccess]: (state, action) => ({
            ...state,
            courseDetailCreateData: action.payload,
            isCourseDetailCreate: false,
            addCourseDetailCreateReady: true,
        }),
        [addCourseDetailCreateFailed]: state => ({
            ...state,
            isCourseDetailCreate: false,
        }),
        [editCourseDetail]: state => ({
            ...state,
            isCourseDetail: true,
        }),
        [editCourseDetailSuccess]: (state, action) => ({
            ...state,
            courseDetailData: action.payload,
            isCourseDetail: false,
            addCourseDetailReady: true,
        }),
        [editCourseDetailFailed]: state => ({
            ...state,
            isCourseDetail: false,
        }),
        [deleteCourseDetail]: state => ({
            ...state,
            isCourseDetailDelete: true,
        }),
        [deleteCourseDetailSuccess]: (state, action) => ({
            ...state,
            courseDetailDeleteData: action.payload,
            isCourseDetailDelete: false,
            deleteCourseDetailDeleteReady: true,
        }),
        [deleteCourseDetailFailed]: state => ({
            ...state,
            isCourseDetailDelete: false,
        }),
        [setCourseTime]: (state, action) => ({
            ...state,
            setCourseTimeData: action.payload,
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
        isCourseTime: false,
        courseTimeReady: false,
        courseTimeData: [],
        courseTimePageData: [],
        courseTimeStatus: '',
        isEditCourseTime: false,
        editCourseTimeReady: false,
        editCourseTimeData: [],
        isAddCourseTime: false,
        addCourseTimeReady: false,
        addCourseTimeData: [],
        isDeleteCourseTime: false,
        deleteCourseTimeReady: false,
        deleteCourseTimeData: [],
        isEditCourseTimeState: false,
        editCourseTimeStateReady: false,
        editCourseTimeStateData: [],
        isCourseDetailCreate: false,
        addCourseDetailCreateReady: false,
        courseDetailCreateData: [],
        isCourseDetail: false,
        addCourseDetailReady: false,
        courseDetailData: false,
        isCourseDetailDelete: false,
        deleteCourseDetailDeleteReady: false,
        courseDetailDeleteData: [],
        setCourseTimeData: {},
    }
)

export default courseTimeReducer
