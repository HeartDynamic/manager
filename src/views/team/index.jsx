// 班级/学生
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Parent from './Parent'
import Student from '../student'

function Team() {
    return (
        <>
            <Switch>
                <Route path='/team/:period/:teamId' component={Student} />
                <Route path='/team' component={Parent} />
            </Switch>
        </>
    )
}
export default Team
