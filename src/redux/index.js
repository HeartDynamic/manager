import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user, { userEpic, userActions } from './user'
import teaching, { teachingEpic, teachingActions } from './teaching'
import teacher, { teacherEpic, teacherActions } from './teacher'
import team, { teamEpic, teamActions } from './team'
import student, { studentEpic, studentActions } from './student'
import courseTime, { courseTimeEpic, courseTimeActions } from './schedul/course-time'
import teanchingTask, { teanchingTaskEpic, teanchingTaskActions } from './schedul/teaching-task'
import rowLesson, { rowLessonEpic, rowLessonActions } from './schedul/row-lesson'

export const rootEpic = combineEpics(
    userEpic,
    teachingEpic,
    teacherEpic,
    teamEpic,
    studentEpic,
    courseTimeEpic,
    teanchingTaskEpic,
    rowLessonEpic
)

export const actions = {
    user: userActions,
    teaching: teachingActions,
    teacher: teacherActions,
    team: teamActions,
    student: studentActions,
    courseTime: courseTimeActions,
    teanchingTask: teanchingTaskActions,
    rowLesson: rowLessonActions,
}

export const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        user,
        teaching,
        teacher,
        team,
        student,
        courseTime,
        teanchingTask,
        rowLesson,
    })
