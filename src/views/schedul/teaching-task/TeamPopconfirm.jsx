import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../components/button'

const Container = styled.div`
    width: 260px;
    height: 210px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 40px;
    z-index: 1;
    transform: translateX(-125px);
    border-radius: 6px;
    box-shadow: -1px -1px 12px 0px rgba(0, 91, 167, 0.14);
`
const MyTriangle = styled.div`
    width: 0;
    height: 0;
    border-bottom: 20px solid #fff;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-20px);
`
const MyBox = styled.div``
const MyDeleted = styled.div`
    margin: 8px;
    display: flex;
    justify-content: flex-end;
    svg {
        margin-right: 4px;
    }
`
const MyTeam = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 16px 0 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
`
const MySegmentName = styled.div`
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    background-color: ${props => props.styledOption.bgColor || '#fff'};
    color: ${props => props.styledOption.color || '#333'};
    padding: 0 8px;
    margin-left: 4px;
    margin-top: 4px;
    border-radius: 4px;
    &:hover {
        background-color: #3e99e6;
        color: #fff;
    }
`
const MyLine = styled.div`
    width: 140px;
    height: 1px;
    background-color: rgba(49, 49, 49, 1);
    opacity: 0.14;
    margin: 14px auto 8px auto;
`

const MyUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0 16px 0 16px;
`
const MyLi = styled.li``
const MyNameSpan = styled.span`
    box-sizing: border-box;
    display: inline-block;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    padding: 0 6px;
    margin-left: 4px;
    margin-top: 4px;
    color: ${props => props.styledOption.color || '#333'};
    background-color: ${props => props.styledOption.bgColor || '#fff'};
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #3e99e6;
        color: #fff;
    }
`

function TeamPopconfirm(props) {
    const [currentIndex, setCurrentIndex] = useState(props.isTeam === undefined ? 0 : '')
    const [currentNameIndex, setCurrentNameIndex] = useState('')
    const [currentData, setCurrentData] = useState(props.currentTeamData)
    TeamPopconfirm.handleClickOutside = (event, index) => {
        if (event.target === props.tagRef.current) {
            return
        }
        if (
            event.target.parentNode.classList[0] === props.tagRef.current.classList[0] ||
            (props.tagRef.current.children[0] && props.tagRef.current.children[0].classList[0]) ===
                event.target.parentNode.classList[0]
        ) {
            return
        }
        props.onClickCloseMenu(props.data)
    }
    //年级/班级
    const handleClickStatus = (text, item, index) => {
        if (props.isTeam) {
            props.onClickEdit(text, item, index)
        } else {
            props.onClickPlus(text, item, index)
        }
        if (text === 'segment') {
            setCurrentIndex(index)
            setCurrentNameIndex('')
            setCurrentData({
                ...currentData,
                segmentName: '',
            })
        } else if (text === 'name') {
            setCurrentNameIndex(index)
            setCurrentData({})
        }
    }
    const segmentName = (item, index) => {
        if (currentData.segmentName === item) {
            setCurrentIndex(index)
            return true
        } else {
            return false
        }
    }
    const handleClickDeleted = () => {
        props.onClickDele()
    }
    const styledOptions = {
        bgColor: '#F27A59',
        borderColor: '#F27A59',
        HbgColor: '#F27A59',
        HborderColor: '#F27A59',
    }
    return (
        <Container styled={props.isTeam}>
            <MyTriangle />
            <MyBox>
                {props.isTeam && (
                    <MyDeleted>
                        <Button styledOptions={styledOptions} onClick={handleClickDeleted}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            删除
                        </Button>
                    </MyDeleted>
                )}
                <MyTeam>
                    {props.teamData.map((item, index) => (
                        <MySegmentName
                            key={item.id}
                            styledOption={{
                                bgColor:
                                    currentIndex === index
                                        ? '#3E99E6'
                                        : currentData && segmentName(item.segmentName, index)
                                        ? '#3E99E6'
                                        : '#fff',
                                color:
                                    currentIndex === index
                                        ? '#fff'
                                        : currentData && segmentName(item.segmentName, index)
                                        ? '#fff'
                                        : '#333',
                            }}
                            onClick={() => handleClickStatus('segment', item, index)}
                        >
                            {item.newSegmentName}
                        </MySegmentName>
                    ))}
                </MyTeam>
                <MyLine />
                <MyUl>
                    {props.teamData[currentIndex] &&
                        props.teamData[currentIndex].teamArr.map((item, index) => (
                            <MyLi key={index}>
                                <MyNameSpan
                                    styledOption={{
                                        bgColor:
                                            currentNameIndex === index
                                                ? '#3E99E6'
                                                : currentData && currentData.teamId === item.id
                                                ? '#3E99E6'
                                                : '#fff',
                                        color:
                                            currentNameIndex === index
                                                ? '#fff'
                                                : currentData && currentData.teamId === item.id
                                                ? '#fff'
                                                : '#333',
                                    }}
                                    onClick={() => handleClickStatus('name', item, index)}
                                >
                                    {item.name}
                                </MyNameSpan>
                            </MyLi>
                        ))}
                </MyUl>
            </MyBox>
        </Container>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => TeamPopconfirm.handleClickOutside,
}

export default onClickOutside(TeamPopconfirm, clickOutsideConfig)
