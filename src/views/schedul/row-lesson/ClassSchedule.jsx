//课程表
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import FestivalName from './FestivalName'
import ThHeader from './ThHeader'

const MyText = styled.div`
    height: 28px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(58, 147, 223, 1);
`
const MySection = styled.div`
    padding: 10px;
    box-shadow: -1px 2px 5px 0px rgba(0, 91, 167, 0.11);
`

const MyBox = styled.div``
const MyNameBox = styled.div`
    height: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const MyName = styled.div`
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    color: #333;
`

const MyName2 = styled(MyName)`
    font-weight: 600;
    cursor: pointer;
    :hover {
        color: #3a93df;
    }
`
const MyTabel = styled.div`
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
`
const MyThead = styled.header`
    flex-grow: 1;
    display: grid;
    grid-template-rows: 30px 1fr;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 1px;
    background-color: #ccc;
`
const MyTh = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MySpan = styled.span``
const MyTBody = styled.section`
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    grid-column-gap: 1px;
    background-color: #ccc;
`
const MyTR = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 1px;
    background-color: #ccc;
    border-bottom: ${props => (props.isShowBorder ? '2px solid #3F9AE6' : '')};
`
function ClassSchedule(props) {
    const [newRowLessonData, setNewRowLessonData] = useState(props.rowLessonData)
    const [weekData, setWeekData] = useState([
        {
            id: 8,
            name: '节数',
        },
        {
            id: 1,
            name: '星期一',
        },
        {
            id: 2,
            name: '星期二',
        },
        {
            id: 3,
            name: '星期三',
        },
        {
            id: 4,
            name: '星期四',
        },
        {
            id: 5,
            name: '星期五',
        },
        {
            id: 6,
            name: '星期六',
        },
        {
            id: 7,
            name: '星期日',
        },
    ])

    useEffect(() => {
        setNewRowLessonData(props.rowLessonData)
    }, [props.rowLessonData])

    //添加/编辑
    const handleClickPlusAndEdit = (value, data) => {
        let datas = {
            teamId: props.currentTeamAllData.id,
            subjectId: value.id,
            type: data.typeName === 'amClass' ? 1 : data.typeName === 'pmClass' ? 2 : 3,
            examType: 4,
            section: data.index,
            weekDay: data.id,
            courseTimeId: props.setCourseTimeData.id,
        }
        if (value.name === data.name || (value.name === '无' && !data.name)) return
        if (data.name === '') {
            //添加
            props.addRowLesson(datas)
        } else {
            //编辑
            props.editRowLesson(datas)
        }
    }
    return (
        <MySection>
            <MyBox>
                <MyNameBox>
                    <MyText>作息时间：{props.setCourseTimeData.name}</MyText>&nbsp;&nbsp;&nbsp;
                    <MyName2 onClick={props.onClickSwitch}>
                        {props.currentTeamAllData.newSegmentName}
                        {props.currentTeamAllData.name}班
                    </MyName2>
                </MyNameBox>
                <MyTabel>
                    <MyThead>
                        {weekData.map((item, index) => (
                            <MyTh key={item.id}>
                                <MySpan>{item.name}</MySpan>
                            </MyTh>
                        ))}
                    </MyThead>
                    <MyTBody>
                        {newRowLessonData.courseTimeDTO &&
                            newRowLessonData.courseTimeDTO.amClass.map((item, index) => (
                                <MyTR
                                    key={index}
                                    isShowBorder={newRowLessonData.courseTimeDTO.amClass.length - 1 === index}
                                >
                                    <ThHeader data={item} />
                                    {item.weekDayArr.map((t, i) => (
                                        <FestivalName
                                            key={t.id}
                                            index={i}
                                            borderIdx={i === item.weekDayArr.length - 1 ? true : false}
                                            data={{ ...t, type: item.type, index, typeName: 'amClass' }}
                                            onClickPlusAndEdit={handleClickPlusAndEdit}
                                        />
                                    ))}
                                </MyTR>
                            ))}
                        {newRowLessonData.courseTimeDTO &&
                            newRowLessonData.courseTimeDTO.pmClass.map((item, index) => (
                                <MyTR
                                    key={index}
                                    isShowBorder={newRowLessonData.courseTimeDTO.pmClass.length - 1 === index}
                                >
                                    <ThHeader data={item} />
                                    {item.weekDayArr.map((t, i) => (
                                        <FestivalName
                                            key={t.id}
                                            index={i}
                                            borderIdx={i === item.weekDayArr.length - 1 ? true : false}
                                            data={{ ...t, type: item.type, index, typeName: 'pmClass' }}
                                            onClickPlusAndEdit={handleClickPlusAndEdit}
                                        />
                                    ))}
                                </MyTR>
                            ))}
                        {newRowLessonData.courseTimeDTO &&
                            newRowLessonData.courseTimeDTO.nightClass.map((item, index) => (
                                <MyTR key={index}>
                                    <ThHeader data={item} />
                                    {item.weekDayArr.map((t, i) => (
                                        <FestivalName
                                            key={t.id}
                                            index={i}
                                            borderIdx={i === item.weekDayArr.length - 1 ? true : false}
                                            data={{ ...t, type: item.type, index, typeName: 'nightClass' }}
                                            onClickPlusAndEdit={handleClickPlusAndEdit}
                                        />
                                    ))}
                                </MyTR>
                            ))}
                    </MyTBody>
                </MyTabel>
            </MyBox>
        </MySection>
    )
}
const mapStateToProps = state => {
    return {
        ...state.rowLesson,
        setCourseTimeData: state.courseTime.setCourseTimeData,
        currentTeamAllData: state.teanchingTask.currentTeamAllData,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.rowLesson, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassSchedule)
