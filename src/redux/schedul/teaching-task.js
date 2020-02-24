import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../../api'

const {
    getTeachingTaskList,
    getTeachingTaskListSuccess,
    getTeachingTaskListFailed,
    getTeamAll,
    getTeamAllSuccess,
    getTeamAllFailed,
    setTeamAll,
    addTeachingTask,
    addTeachingTaskSuccess,
    addTeachingTaskFailed,
    editTeachingTask,
    editTeachingTaskSuccess,
    editTeachingTaskFailed,
    deleteTeachingTask,
    deleteTeachingTaskSuccess,
    deleteTeachingTaskFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_teaching_task_list',
    'get_teaching_task_list_success',
    'get_teaching_task_list_failed',
    'get_team_all',
    'get_team_all_success',
    'get_team_all_failed',
    'set_team_all',
    'add_teaching_task',
    'add_teaching_task_success',
    'add_teaching_task_failed',
    'edit_teaching_task',
    'edit_teaching_task_success',
    'edit_teaching_task_failed',
    'delete_teaching_task',
    'delete_teaching_task_success',
    'delete_teaching_task_failed',
    'set_msg',
    'clear_msg'
)

const getTeachingTaskListEpic = action$ =>
    action$.pipe(
        ofType(getTeachingTaskList),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getTeachingTaskList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getTeachingTaskListSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'teanchingTaskListMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editTeachingTaskEpic = action$ =>
    action$.pipe(
        ofType(editTeachingTask),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editTeachingTaskUpdate({
                        teacherId: action.payload.teacherId,
                        teamId: action.payload.teamId,
                        newTeamId: action.payload.newTeamId,
                    })
                    .then(res => {
                        if (res.success) {
                            observer.next(editTeachingTaskSuccess(res))
                            let data = {
                                subjectId: action.payload.currentSubject,
                            }
                            observer.next(getTeachingTaskList(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editTeachingTaskMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addTeachingTaskEpic = action$ =>
    action$.pipe(
        ofType(addTeachingTask),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addTeachingTaskCreate({
                        teacherId: action.payload.teacherId,
                        newTeamId: action.payload.newTeamId,
                    })
                    .then(res => {
                        if (res.success) {
                            observer.next(addTeachingTaskSuccess(res))
                            let data = {
                                subjectId: action.payload.currentSubject,
                            }
                            observer.next(getTeachingTaskList(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addTeachingTaskMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const deleteTeachingTaskEpic = action$ =>
    action$.pipe(
        ofType(deleteTeachingTask),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .deleteTeachingTaskDelete({
                        teacherId: action.payload.teacherId,
                        teamId: action.payload.teamId,
                    })
                    .then(res => {
                        if (res.success) {
                            observer.next(deleteTeachingTaskSuccess(res))
                            let data = {
                                subjectId: action.payload.currentSubject,
                            }
                            observer.next(getTeachingTaskList(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'deleteTeachingTaskMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const getTeamAllEpic = action$ =>
    action$.pipe(
        ofType(getTeamAll),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getTeamAll(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getTeamAllSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'teanchingTaskMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const teanchingTaskActions = {
    getTeachingTaskList, //老师班级列表
    setTeamAll, //当前班级
    addTeachingTask, //添加班级
    editTeachingTask, //编辑班级
    deleteTeachingTask, //删除班级
    getTeamAll, //获取班级列表
    setMsg,
    clearMsg,
}

export const teanchingTaskEpic = combineEpics(
    getTeachingTaskListEpic,
    getTeamAllEpic,
    addTeachingTaskEpic,
    editTeachingTaskEpic,
    deleteTeachingTaskEpic
)

const teanchingTaskReducer = handleActions(
    {
        [getTeachingTaskList]: state => ({
            ...state,
            isTeachingTaskList: true,
        }),
        [getTeachingTaskListSuccess]: (state, action) => ({
            ...state,
            teachingTaskListData: action.payload.data,
            isTeachingTaskList: false,
            teachingTaskListReady: true,
        }),
        [getTeachingTaskListFailed]: state => ({
            ...state,
            isTeachingTaskList: false,
        }),
        [getTeamAll]: state => ({
            ...state,
            isTeamAll: true,
        }),
        [setTeamAll]: (state, action) => ({
            ...state,
            currentTeamAllData: action.payload,
        }),
        [getTeamAllSuccess]: (state, action) => ({
            ...state,
            teamAllData: action.payload.data,
            isTeamAll: false,
            teamAllReady: true,
        }),
        [getTeamAllFailed]: state => ({
            ...state,
            isTeamAll: false,
        }),
        [editTeachingTask]: state => ({
            ...state,
            isEditTeachingTask: true,
        }),
        [editTeachingTaskSuccess]: (state, action) => ({
            ...state,
            editTeachingTaskData: action.payload,
            isEditTeachingTask: false,
            editTeachingTaskReady: true,
        }),
        [editTeachingTaskFailed]: state => ({
            ...state,
            isEditTeachingTask: false,
        }),
        [addTeachingTask]: state => ({
            ...state,
            isAddTeachingTask: true,
        }),
        [addTeachingTaskSuccess]: (state, action) => ({
            ...state,
            addTeachingTaskData: action.payload,
            isAddTeachingTask: false,
            addTeachingTaskReady: true,
        }),
        [addTeachingTaskFailed]: state => ({
            ...state,
            isAddTeachingTask: false,
        }),
        [deleteTeachingTask]: state => ({
            ...state,
            isAddTeachingTask: true,
        }),
        [deleteTeachingTaskSuccess]: (state, action) => ({
            ...state,
            deleteTeachingTaskData: action.payload,
            isAddTeachingTask: false,
            deleteTeachingTaskReady: true,
        }),
        [deleteTeachingTaskFailed]: state => ({
            ...state,
            isAddTeachingTask: false,
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
        isTeachingTaskList: false,
        teachingTaskListData: [],
        teachingTaskListReady: false,
        isTeamAll: false,
        teamAllReady: false,
        teamAllData: [],
        currentTeamAllData: {},
        teanchingTaskPageData: {},
        isEditTeachingTask: false,
        editTeachingTaskReady: false,
        editTeachingTaskData: [],
        isAddTeachingTask: false,
        addTeachingTaskReady: false,
        addTeachingTaskData: [],
        isDeleteTeachingTask: false,
        deleteTeachingTaskReady: false,
        deleteTeachingTaskData: [],
    }
)

export default teanchingTaskReducer
