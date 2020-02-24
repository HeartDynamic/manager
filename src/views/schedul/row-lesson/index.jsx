//排课
import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import ClassSchedule from './ClassSchedule'
import Team from '../team'
const Container = styled.section`
    width: 100%;
    height: 100%;
    height: calc(100vh - 242px);
`
const Wrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
`
const ScrollbarWrap = styled.div`
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

function RowLesson(props) {
    const [teamData, setTeamData] = useState({})
    const [festivals, setFestivals] = useState([
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
            id: 7,
            name: '',
            week: 'Sunday',
        },
    ])

    //切换-班级/课程表
    const handleClickShow = data => {
        setTeamData(data)
        props.setIsSwitch(!props.isSwitch)
    }
    return (
        <Container>
            {props.isSwitch ? (
                <Wrap>
                    <ScrollbarWrap>
                        <ClassSchedule teamData={teamData} festivals={festivals} onClickSwitch={handleClickShow} />
                    </ScrollbarWrap>
                </Wrap>
            ) : (
                <Team teamDatas={teamData} getRowLesson={props.getRowLesson} onClickSwitch={handleClickShow} />
            )}
        </Container>
    )
}
const mapStateToProps = state => {
    return state.rowLesson
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.rowLesson, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RowLesson)
