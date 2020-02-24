// 作息时间
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import dayjs from 'dayjs'
import styled from 'styled-components'
import TimeBox from './TimeBox'
import Button from '../../../components/button'

const Container = styled.section`
    box-sizing: border-box;
    width: 100%;
    height: 580px;
`
const MyFooter = styled.footer`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    text-align: center;
    button {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        box-shadow: 2px 6px 12px 0px rgba(88, 216, 224, 0.11);
    }
`
const styledOptions = {
    color: '#40a9ff',
    height: '40px',
    radius: '29px',
    HColor: '#fff',
    HbgColor: '#40a9ff',
}

function CourseTime(props) {
    const [courseTimeData, setCourseTimeData] = useState([])
    useEffect(() => {
        setCourseTimeData(
            props.courseTimeData &&
                props.courseTimeData.map((item, index) => {
                    item.amClass.sort((a, b) => {
                        return a.index - b.index
                    })

                    item.pmClass.sort((a, b) => {
                        return a.index - b.index
                    })
                    item.nightClass.sort((a, b) => {
                        return a.index - b.index
                    })
                    let amClassIdx = 1
                    item.amClass.map((t, i) => {
                        if (t.type === 2) {
                            t.name = `第${amClassIdx}节`
                            amClassIdx += 1
                        }
                    })
                    let pmClassIdx = 1
                    item.pmClass.map((t, i) => {
                        if (t.type === 2) {
                            t.name = `第${pmClassIdx}节`
                            pmClassIdx += 1
                        }
                    })
                    let nightClassIdx = 1
                    item.nightClass.map((t, i) => {
                        if (t.type === 2) {
                            t.name = `第${nightClassIdx}节`
                            nightClassIdx += 1
                        }
                    })
                    if (item.state === 1) {
                        props.setCourseTime({ id: item.id, name: item.name, state: item.state })
                    }
                    return item
                })
        )
    }, [props.courseTimeData])
    return (
        <Container>
            {courseTimeData.map((item, index) => (
                <TimeBox
                    key={item.id}
                    index={index}
                    data={item}
                    editCourseTime={props.editCourseTime}
                    editCourseTimeState={props.editCourseTimeState}
                    deleteCourseTime={props.deleteCourseTime}
                    addCourseDetailCreate={props.addCourseDetailCreate}
                    editCourseDetail={props.editCourseDetail}
                    deleteCourseDetail={props.deleteCourseDetail}
                />
            ))}
            {props.isShow && (
                <MyFooter>
                    <Button styledOptions={styledOptions} onClick={props.onClickPlus}>
                        + 新增时间
                    </Button>
                </MyFooter>
            )}
        </Container>
    )
}
const mapStateToProps = state => {
    return state.courseTime
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.courseTime, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseTime)
