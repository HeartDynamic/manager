// 课程表
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Section from './Section'

const MyBox = styled.div`
    background-color: #fff;
    /* padding: 20px; */
    margin: 20px;
    box-shadow: -6px -7px 20px 0px rgba(0, 91, 167, 0.11);
    border-radius: 8px;
`

function TimeBox(props) {
    //删除模板
    const handleClickDelete = () => {
        let data = {
            id: props.data.id,
        }
        props.deleteCourseTime(data)
    }

    return (
        <MyBox>
            <Header
                index={props.index}
                data={props.data}
                editCourseTime={props.editCourseTime}
                editCourseTimeState={props.editCourseTimeState}
                onClickDelete={handleClickDelete}
            />
            <Section
                index={props.index}
                data={props.data}
                addCourseDetailCreate={props.addCourseDetailCreate}
                editCourseDetail={props.editCourseDetail}
                deleteCourseDetail={props.deleteCourseDetail}
            />
        </MyBox>
    )
}

export default TimeBox
