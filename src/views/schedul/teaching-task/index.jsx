// 教学任务
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import styled from 'styled-components'
import Button from '../../../components/button'
import TeamBox from './TeamBox'
import TeamPlus from './TeamPlus'

const Container = styled.div`
    width: 100%;
    margin-top: 30px;
    user-select: none;
`
const MyTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 29px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #3e99e6;
`
const MyBox = styled.div`
    min-height: 602px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 2px 16px 32px 0px rgba(0, 91, 167, 0.16);
    border-radius: 23px;
`
const MyHeader = styled.header``
const MySection = styled.section`
    height: 100%;
`
const MyUl = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 447px;
    height: 71px;
    border-radius: 6px;
    margin: 0 auto;
`
const MyLi = styled.li`
    text-align: center;
`

const MyUl1 = styled.ul`
    position: relative;
    height: 100%;
    margin: 40px 68px;
`
const MyLi1 = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 38px;
`
const MyLine = styled.div`
    width: 1px;
    height: 100%;
    position: absolute;
    left: 60px;
`
const MyName = styled.span`
    display: inline-block;
    padding-right: 21px;
`

function TeachingTask(props) {
    const [currentSubject, setCurrentSubject] = useState(1)
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0)
    const [isPlus, setIsPlus] = useState(false)
    const [isIndexPlus, setIsIndexPlus] = useState(false)
    const [isTeam, setIsTeam] = useState(false)
    const [isIndexTeam, setIsIndexTeam] = useState(false)
    const [isIdTeam, setIsIdTeam] = useState(false)

    const [subjectData, setSubjectData] = useState([
        { id: 1, name: '数学' },
        { id: 2, name: '物理' },
        { id: 3, name: '化学' },
        { id: 4, name: '生物' },
    ])
    const [teacherData, setTeacherData] = useState([])
    const [teamData, setTeamData] = useState([])
    const [currentTeamData, setCurrentTeamData] = useState({})
    useEffect(() => {
        //班级列表
        if (!props.isTeamAll && !props.teamAllReady) {
            props.getTeamAll()
        }
        let map = {},
            dest = []
        props.teamAllData.map((item, index) => {
            item.newSegmentName = item.segmentName.slice(0, 4)
            item.type = item.segmentName.slice(0, 2)
            if (!map[item.newSegmentName]) {
                dest.push({
                    id: item.id,
                    type: item.type === '准备' ? 0 : item.type === '小学' ? 1 : item.type === '初中' ? 2 : 3,
                    segment: item.segment,
                    newSegmentName: item.newSegmentName,
                    segmentName: item.segmentName,
                    teamName: item.teamName,
                    teamArr: [item],
                })
                map[item.newSegmentName] = item
            } else {
                for (let j = 0; j < dest.length; j++) {
                    let dj = dest[j]
                    if (dj.newSegmentName == item.newSegmentName) {
                        dj.teamArr.push(item)
                        break
                    }
                }
            }
        })
        dest.sort((a, b) => {
            return a.type - b.type
        })
        setTeamData(dest)
    }, [props.isTeamAll, props.teamAllReady])
    useEffect(() => {
        //老师教学班级列表
        if (!props.isTeachingTaskList && !props.teachingTaskListReady) {
            let data = {
                subjectId: 1,
            }
            props.getTeachingTaskList(data)
        }
        let map = {},
            dest = []
        for (let i = 0; i < props.teachingTaskListData.length; i++) {
            let item = props.teachingTaskListData[i]
            item.newTeam = item.segment === 1 ? '小学' : item.segment === 2 ? '初中' : '高中'
            item.newTeam += item.teamName + '班'
            if (!map[item.teacherId]) {
                if (item.segment) {
                    dest.push({
                        teacherName: item.teacherName,
                        teacherId: item.teacherId,
                        teamArr: [item],
                    })
                } else {
                    dest.push({
                        teacherName: item.teacherName,
                        teacherId: item.teacherId,
                        teamArr: [],
                    })
                }
                map[item.teacherId] = item
            } else {
                for (let j = 0; j < dest.length; j++) {
                    let dj = dest[j]
                    if (dj.teacherId == item.teacherId) {
                        dj.teamArr.push(item)
                        break
                    }
                }
            }
        }
        setTeacherData(dest)
    }, [props.isTeachingTaskList, props.teachingTaskListReady])
    //学科
    const handleClickSubject = (item, index) => {
        if (currentSubjectIndex === index) {
            return
        }
        setCurrentSubjectIndex(index)
        let data = {
            subjectId: item.id,
        }
        props.getTeachingTaskList(data)
        setCurrentSubject(item.id)
    }
    //班级弹窗
    const handleClickPop = (text, item, index) => {
        setCurrentTeamData(item)
        if (text === 'edit') {
            setIsTeam(true)
            setIsPlus(false)
            setIsIndexTeam(index)
            setIsIdTeam(item.teamId)
        } else if (text === 'plus') {
            setIsPlus(true)
            setIsTeam(false)
            setIsIndexPlus(index)
        }
    }
    //班级添加
    const handleClickPlus = (text, item) => {
        if (isPlus && text === 'name') {
            let data = {
                teacherId: currentTeamData.teacherId,
                newTeamId: item.id,
                currentSubject,
            }
            props.addTeachingTask(data)
            setIsPlus(false)
        }
    }
    //班级编辑
    const handleClickEdit = (text, item) => {
        if (text === 'name') {
            let data = {
                teacherId: currentTeamData.teacherId,
                teamId: currentTeamData.teamId,
                newTeamId: item.id,
                currentSubject,
            }
            props.editTeachingTask(data)
            setIsTeam(false)
        }
    }
    //班级删除
    const handleClickDele = () => {
        let data = {
            teacherId: currentTeamData.teacherId,
            teamId: currentTeamData.teamId,
            currentSubject,
        }
        props.deleteTeachingTask(data)
        setIsTeam(false)
    }
    //关闭弹窗
    const handleClickClose = () => {
        setIsTeam(false)
        setIsIndexTeam('')
        setIsIdTeam('')
        setIsPlus(false)
        setIsIndexPlus('')
    }
    return (
        <Container>
            {props.status === 0 && <MyTitle>当前尚未设置教学任务 请分配老师所在班级</MyTitle>}
            <MyBox>
                <MyHeader>
                    <MyUl>
                        {subjectData.map((item, index) => (
                            <MyLi key={item.id}>
                                <Button
                                    styledOptions={{
                                        width: '100px',
                                        height: '40px',
                                        size: '16px',
                                        borderColor: currentSubject === item.id ? '#3E99E6' : '#fff',
                                        bgColor: currentSubject === item.id ? '#3E99E6' : '#fff',
                                        color: currentSubject === item.id ? '#fff' : '#3E99E6',
                                        HbgColor: currentSubject === item.id ? '#3E99E6' : '#3E99E6',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleClickSubject(item, index)}
                                >
                                    {item.name}
                                </Button>
                            </MyLi>
                        ))}
                    </MyUl>
                </MyHeader>
                <MySection>
                    <MyUl1>
                        <MyLine isShowBackground={teacherData.length === 0} />
                        {teacherData.length > 0 ? (
                            teacherData.map((item, index) => (
                                <MyLi1 key={index}>
                                    <MyName>{item.teacherName}：</MyName>
                                    {item.teamArr.map((t, i) => (
                                        <TeamBox
                                            key={i}
                                            data={t}
                                            index={index}
                                            teamData={teamData}
                                            isTeam={isTeam}
                                            isIdTeam={isIdTeam}
                                            isIndexTeam={isIndexTeam}
                                            onClickPop={handleClickPop}
                                            onClickCloseMenu={handleClickClose}
                                            onClickPlus={handleClickPlus}
                                            onClickEdit={handleClickEdit}
                                            onClickDele={handleClickDele}
                                        />
                                    ))}
                                    <TeamPlus
                                        key={index}
                                        index={index}
                                        data={item}
                                        isPlus={isPlus}
                                        isIndexPlus={isIndexPlus}
                                        teamData={teamData}
                                        onClickPop={handleClickPop}
                                        onClickCloseMenu={handleClickClose}
                                        onClickPlus={handleClickPlus}
                                    />
                                </MyLi1>
                            ))
                        ) : (
                            <MyLi>展无数据</MyLi>
                        )}
                    </MyUl1>
                </MySection>
            </MyBox>
        </Container>
    )
}

const mapStateToProps = state => {
    return state.teanchingTask
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.teanchingTask, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeachingTask)
