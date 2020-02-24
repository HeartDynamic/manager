// 课程表
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import TimeType from './TimeType'

const MyTime = styled.div`
    margin-top: 20px;
    padding: 0 20px;
`

function Time(minute, time, frequency) {
    let data = []
    data.push({ id: 0, value: 0, name: (time < 10 ? '0' + time : time) + ':00', early: 'early' })
    for (let i = 0; i < frequency; i++) {
        minute += 5
        if (minute === 60) {
            minute = 0
            time += 1
        }
        data.push({
            id: i + 1,
            value: i,
            name: (time < 10 ? '0' + time : time) + ':' + (minute < 10 ? '0' + minute : minute),
            early: 'early',
        })
    }
    return data
}
function TimeBox(props) {
    const [amOptions, setAmOptions] = useState(Time(0, 7, 60))
    const [pmOptions, setPmOptions] = useState(Time(0, 12, 72))
    const [nightOptions, setNightOptions] = useState(Time(0, 17, 60))
    const [amStartTime, setamStartTime] = useState(
        props.data.amClass.length > 0 && props.data.amClass[0].startTimeString
    )
    const [pmStartTime, setPmStartTime] = useState(
        props.data.pmClass.length > 0 && props.data.pmClass[0].startTimeString
    )
    const [nightStartTime, setNightStartTime] = useState(
        props.data.nightClass.length > 0 && props.data.nightClass[0].startTimeString
    )

    //修改上课时间
    const handleChangeTime = (value, data) => {
        let datas = {
            initTimeString: value.name,
            courseTimeId: props.data.id,
            timeState: data.name === 'amClass' ? 1 : data.name === 'pmClass' ? 2 : 3,
        }
        if (data.name === 'amClass') {
            setamStartTime(value.name)
        } else if (data.name === 'pmClass') {
            setPmStartTime(value.name)
        } else if (data.name === 'nightClass') {
            setNightStartTime(value.name)
        }
        props.editCourseDetail(datas)
    }

    return (
        <MyTime>
            <TimeType
                text='上午'
                name='amClass'
                timeClass={props.data.amClass}
                startTime={amStartTime}
                timeOptions={amOptions}
                onChangeTime={handleChangeTime}
                addCourseDetailCreate={props.addCourseDetailCreate}
                editCourseDetail={props.editCourseDetail}
                deleteCourseDetail={props.deleteCourseDetail}
            />
            <TimeType
                text='下午'
                name='pmClass'
                timeClass={props.data.pmClass}
                startTime={pmStartTime}
                timeOptions={pmOptions}
                onChangeTime={handleChangeTime}
                addCourseDetailCreate={props.addCourseDetailCreate}
                editCourseDetail={props.editCourseDetail}
                deleteCourseDetail={props.deleteCourseDetail}
            />
            <TimeType
                text='晚修'
                name='nightClass'
                timeClass={props.data.nightClass}
                startTime={nightStartTime}
                timeOptions={nightOptions}
                onChangeTime={handleChangeTime}
                addCourseDetailCreate={props.addCourseDetailCreate}
                editCourseDetail={props.editCourseDetail}
                deleteCourseDetail={props.deleteCourseDetail}
            />
        </MyTime>
    )
}

export default TimeBox
