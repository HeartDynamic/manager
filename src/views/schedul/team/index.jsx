//更改班级
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import Tag from '../../../components/tag'

const Container = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 2px 16px 32px 0px rgba(0, 91, 167, 0.16);
    border-radius: 23px;
`
const MyBox = styled.div`
    width: 250px;
    margin: 20px 0px 20px 20px;
`
const MyBox1 = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

const MyName = styled.span`
    height: 30px;
    text-align: center;
    line-height: 28px;
    padding: 0 12px;
    border-radius: 8px;
    color: ${props => (props.isShowClass ? '#fff' : '#333')};
    background-color: ${props => (props.isShowClass ? '#3f9ae6' : '#fff')};
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    :hover {
        color: #fff;
        background-color: #3f9ae6;
    }
`

function Team(props) {
    const [teamData, setTeamData] = useState([])
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

    //班级
    const handleClickName = data => {
        props.getRowLesson({ teamId: data.id })
        props.setTeamAll(data)
        props.onClickSwitch(data)
    }

    const styleOption = {
        color: '#000',
        borderColor: '#000',
        size: '20px',
    }
    return (
        <Container>
            {teamData.map((item, index) => (
                <MyBox key={item.id}>
                    <Tag styleOption={styleOption}>{item.newSegmentName}</Tag>
                    <MyBox1>
                        {item.teamArr.map((t, i) => (
                            <MyName
                                key={i}
                                isShowClass={props.currentTeamAllData.id === t.id}
                                onClick={() => handleClickName(t)}
                            >
                                {t.name}
                            </MyName>
                        ))}
                    </MyBox1>
                </MyBox>
            ))}
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
)(Team)
