import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Tag from '../../../components/tag'
import Select from '../../../components/select'
import ShutDown from '../../../components/shut-down'
import PopUp from './PopUp'
import TimeTypeBlock from './TimeTypeBlock'

const Container = styled.div`
    height: 250px;
`
const MyHeader = styled.header`
    display: flex;
    align-items: center;
`
const MyText = styled.span`
    font-size: 16px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: #333;
    margin-right: 20px;
`
const MySelectWrap = styled.div``
const MyInitTime = styled.div`
    display: flex;
    align-items: center;
    margin-left: 46px;
`
const MyUlWrap = styled.div`
    height: 160px;
    display: flex;
    align-items: center;
`
const MyUl = styled.ul`
    height: 70px;
    display: flex;
    border-radius: 8px;
    background-color: #3a93df;
    border-radius: 8px;
`
const MyLi = styled.li`
    display: flex;
`
const MyFontWrap = styled.div`
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;
    background-color: #3a93df;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`

const MyWrap = styled.div`
    height: 20px;
    width: 20px;
    position: absolute;
    cursor: pointer;
    text-align: center;
`

function TimeClass(props) {
    const [isType, setIsType] = useState(false)
    const tagRef = useRef(null)

    const handleClickType = () => {
        setIsType(!isType)
    }
    const handleClickTypeMenu = () => {
        setIsType(false)
    }

    const styleOption = {
        color: props.text === '上午' ? '#20666A' : props.text === '下午' ? '#CFA972' : '#CF594D',
        size: '14px',
        borderColor: props.text === '上午' ? '#58D8E0' : props.text === '下午' ? '#CFA972' : '#CF594D',
    }
    const styledOptions = {
        bgColor: '#4642F1',
        borderColor: '#4642F1',
        HbgColor: '#5c59f3',
        HborderColor: '#5c59f3',
        bgColor1: '#1890ff',
        borderColor1: '#1890ff',
        HbgColor1: '#40a9ff',
        HborderColor1: '#40a9ff',
    }

    const handleClickPlus = (text, index) => {
        setIsType(false)
        let data = {
            type: text === '正课' ? 2 : 1,
            timeState: props.text === '上午' ? 1 : props.text === '下午' ? 2 : 3,
            courseTimeId: props.timeClass[0].courseTimeId,
            index: index + 1,
            initTime: props.timeClass[0].startTime,
        }
        props.addCourseDetailCreate(data)
    }
    return (
        <Container>
            <MyHeader>
                <Tag styleOption={styleOption}>{props.text}</Tag>
                <MyInitTime>
                    <MyText>上课时间</MyText>
                    <MySelectWrap>
                        <Select
                            options={props.timeOptions}
                            onChange={props.onChangeTime}
                            name={props.name}
                            leftNumber={56}
                            value={props.startTime}
                        />
                    </MySelectWrap>
                </MyInitTime>
            </MyHeader>
            <MyUlWrap>
                <MyUl>
                    {props.timeClass.map((item, index) => (
                        <MyLi key={index}>
                            <TimeTypeBlock index={index} data={item} length={props.timeClass.length} />
                            {props.timeClass.length === index + 1 && (
                                <MyFontWrap>
                                    {props.timeClass.length !== 6 && (
                                        <MyWrap>
                                            <MyWrap onClick={handleClickType} ref={tagRef} />
                                            <FontAwesomeIcon icon={faPlus} />
                                        </MyWrap>
                                    )}
                                    {isType && (
                                        <ShutDown tagRef={tagRef} onClickCloseMenu={handleClickTypeMenu}>
                                            <PopUp
                                                textData={{
                                                    name: '添加时间类型',
                                                    text: '自定义',
                                                    text1: '正课',
                                                    index,
                                                }}
                                                styledOptions={styledOptions}
                                                onClickFunct={handleClickPlus}
                                            />
                                        </ShutDown>
                                    )}
                                </MyFontWrap>
                            )}
                        </MyLi>
                    ))}
                </MyUl>
            </MyUlWrap>
        </Container>
    )
}

export default TimeClass
