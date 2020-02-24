// 排课
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faChalkboardTeacher, faBookReader } from '@fortawesome/free-solid-svg-icons'

import TeachingTask from './teaching-task'
import CourseTime from './course-time'
import RowLesson from './row-lesson'
import Button from '../../components/button'
const Container = styled.div``

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`

const MyHeader = styled.header`
    display: flex;
    width: 100%;
`
const MyBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 160px;
    height: 100px;
    padding: 0 10px;
    background-color: ${props => (props.isShow ? '#3a93df' : '#fff')};
    border: 2px solid ${props => (props.isShow ? '#3a93df' : '#fff')};
    box-shadow: -1px 2px 5px 0px rgba(0, 91, 167, 0.11);
    border-radius: 8px;
    margin-right: 16px;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: ${props => (props.isShow ? '#fff' : '#3a93df')};
    cursor: pointer;
    :hover {
        background-color: #3a93df;
        color: #fff;
    }
`
const MyName = styled.div``
const MyFontWrap = styled.div`
    svg {
        font-size: 24px;
    }
`
const MyFooter = styled.footer`
    display: flex;
    justify-content: center;
    margin: 20px auto;
    text-align: center;
    button {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        box-shadow: 2px 6px 12px 0px rgba(88, 216, 224, 0.11);
    }
`

function Schedul(props) {
    const [isShow, setIsShow] = useState(1)
    const [state, setState] = useState(1)
    const [headerNav, setHeaderNav] = useState([
        {
            id: 1,
            icon: faHistory,
            name: '作息时间',
        },
        {
            id: 2,
            icon: faChalkboardTeacher,
            name: '教学任务',
        },
        {
            id: 3,
            icon: faBookReader,
            name: '排课',
        },
    ])
    useEffect(() => {
        if (!props.isCourseTime && !props.courseTimeReady) {
            props.getCourseTime()
        }
    }, [props.isCourseTime, props.courseTimeReady])

    //作息时间/教学任务/班级/排课
    const handleClickSwitch = value => {
        setState(value + 1)
        if (value === 2) {
            props.editCourseTimeState({ id: props.courseTimeData[0].id })
        }
        setIsShow(3)
    }
    //添加作息时间
    const handleClickPlus = () => {
        props.addCourseTime()
    }

    //作息/教学/班级/排课 切换
    const handleClickShow = data => {
        setIsShow(data.id)
    }
    const styledOptions = {
        color: '#40a9ff',
        height: '40px',
        radius: '29px',
        HColor: '#fff',
        HbgColor: '#40a9ff',
    }
    return (
        <>
            {props.courseTimeStatus === 0 ? (
                <>
                    {state === 1 ? (
                        <CourseTime />
                    ) : state === 2 ? (
                        <TeachingTask status={props.courseTimeStatus} />
                    ) : null}
                    <MyFooter>
                        <Button styledOptions={styledOptions} onClick={() => handleClickSwitch(state)}>
                            保存，下一步
                        </Button>
                    </MyFooter>
                </>
            ) : (
                <>
                    <MyHeader>
                        {headerNav.map((item, index) => (
                            <MyBox key={item.id} onClick={() => handleClickShow(item)} isShow={isShow === item.id}>
                                <MyName>{item.name}</MyName>
                                <MyFontWrap>
                                    <FontAwesomeIcon icon={item.icon} />
                                </MyFontWrap>
                            </MyBox>
                        ))}
                    </MyHeader>
                    {isShow === 1 ? (
                        <Container>
                            <Wrap>
                                <CourseTime isShow={true} onClickPlus={handleClickPlus} />
                            </Wrap>
                        </Container>
                    ) : isShow === 2 ? (
                        <TeachingTask />
                    ) : (
                        <RowLesson
                            onClickSwitch={handleClickShow}
                            courseTimeData={props.courseTimeData.courseTimeDtos}
                        />
                    )}
                </>
            )}
        </>
    )
}
const mapStateToProps = state => {
    return state.courseTime
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.courseTime, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedul)
