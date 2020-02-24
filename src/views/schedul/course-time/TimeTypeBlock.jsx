import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import EditInput from './EditInput'
import ShutDown from '../../../components/shut-down'
import PopUp from './PopUp'
const MyTimeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    position: absolute;
    top: -25px;
    ::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 1px;
        background-color: #58d8e0;
        flex: 1;
    }
    ::after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 1px;
        background-color: #58d8e0;
        flex: 1;
    }
`
const MyBigBox = styled.div`
    position: relative;
    min-width: 110px;
`
const MyTimeLength = styled.div`
    width: 58px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: #1d2088;
    cursor: pointer;
`
const MyFontWrap = styled.div`
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;
`
const MyWrap = styled.div`
    height: 20px;
    width: 20px;
    text-align: center;
    position: absolute;
    cursor: pointer;
`

const MyTimeDuration = styled.div`
    position: relative;
    top: -52px;
    font-size: 12px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: #1d2088;
    cursor: pointer;
`
const Wrap = styled.div`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 10px;
`
const MyBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
`
const MyEditWrap = styled.div``
const MyNameWrap = styled.div`
    padding: 0 8px;
`
const MyName = styled.span`
    display: inline-block;
    min-width: 58px;
    min-height: 17px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: #1d2088;
`
const MyShowTimes = styled.div`
    position: absolute;
    top: 2px;
    right: 14px;
    z-index: 2;
    svg {
        color: #f26565;
        cursor: pointer;
    }
`

const MyStartTime = styled.span`
    position: absolute;
    left: -16px;
    bottom: -54px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333;
`
const MyEndTime = styled.span`
    position: absolute;
    right: -16px;
    bottom: -54px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333;
`
const MyLineLeft = styled.div`
    width: 1px;
    height: 106px;
    border-left: 2px dashed #58d8e0;
    position: absolute;
    left: 4px;
    top: -18px;
`
const MyDashed = styled.div`
    display: inline-block;
    width: 10px;
    height: 8px;
    background-color: #fff;
    border: 2px solid #58d8e0;
    border-radius: 50%;
    position: absolute;
    bottom: -30px;
    right: -3px;
`
const MyDashed1 = styled(MyDashed)`
    left: -2px;
`
const MyDashed2 = styled(MyDashed)``
const MyLineRight = styled.div`
    width: 1px;
    height: 106px;
    border-left: 2px dashed #58d8e0;
    position: absolute;
    right: 2px;
    top: -18px;
    z-index: 1;
`
let valueData = {
    name: '',
    value: '',
}
function TimeTypeBlock(props) {
    const [courseTimeData, setCourseTimeData] = useState(props.data)
    const [isType, setIsType] = useState(false)
    const [isShowTimes, setIsShowTimes] = useState(false)
    const [isDuration, setIsDuration] = useState(false)
    const [isInputTagName, setIsInputTagName] = useState('')
    const tagRef = useRef(null)
    const inputTagRef = useRef(null)
    const addTagRef = useRef(null)
    const deleteTagRef = useRef(null)

    useEffect(() => {
        setCourseTimeData(props.data)
    }, [props.data])
    const handleChange = value => {
        valueData.value = value
        setCourseTimeData({
            ...courseTimeData,
            [isInputTagName]: value,
        })
    }

    const handleChangeName = event => {
        valueData.value = event.target.value
        setCourseTimeData({
            ...courseTimeData,
            [isInputTagName]: event.target.value,
        })
    }

    const handleClickType = () => {
        setIsType(!isType)
    }
    const handleClickTypeMenu = () => {
        setIsType(false)
    }
    const handleClickInputMenu = () => {
        setIsDuration(false)
        if (valueData.name !== 'name') {
            valueData.value = Number(valueData.value)
            setCourseTimeData({
                ...courseTimeData,
                [valueData.name]: Number(courseTimeData[valueData.name]),
            })
            if (valueData.value > 100) {
                valueData.value = 100
            }
            if (valueData.value < 1) {
                valueData.value = 1
            }
        }
        let data = {
            id: props.data.id,
            [valueData.name]: valueData.value,
        }
        if (!valueData.value || valueData.value === courseTimeData[valueData.name]) return
        props.editCourseDetail(data)
    }
    //删除
    const handleClickDeleteMenu = text => {
        setIsShowTimes(false)
        if (text === '删除') {
            props.deleteCourseDetail({
                courseTimeId: courseTimeData.courseTimeId,
                courseDetailId: courseTimeData.id,
            })
        }
    }

    const handleClickEdit = (text, value) => {
        valueData.name = text
        valueData.value = value
        if (text == 'name') {
            if (courseTimeData.type === 1) {
                setIsDuration(true)
                setIsInputTagName(text)
            } else if (courseTimeData.type === 2) {
                setIsShowTimes(!isShowTimes)
            }
        } else {
            setIsDuration(true)
            setIsInputTagName(text)
        }
    }
    const handleClickPlus = (text, index) => {
        setIsType(!isType)
        let data = {
            type: text === '正课' ? 2 : 1,
            timeState: courseTimeData.timeState,
            courseTimeId: courseTimeData.courseTimeId,
            index: index,
            initTime: courseTimeData.initTime,
        }
        props.addCourseDetailCreate(data)
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
    return (
        <>
            <MyFontWrap>
                {props.length !== 6 && (
                    <MyWrap>
                        <MyWrap onClick={handleClickType} ref={addTagRef} />
                        <FontAwesomeIcon icon={faPlus} />
                    </MyWrap>
                )}
                {Number(props.index) !== 0 &&
                    (isDuration && isInputTagName === 'duration' ? (
                        <EditInput
                            tagRef={inputTagRef}
                            value={courseTimeData.duration}
                            onChange={handleChange}
                            onClickCloseMenu={handleClickInputMenu}
                            statu={true}
                            type='number'
                        />
                    ) : (
                        <MyTimeDuration
                            onClick={() => handleClickEdit('duration', courseTimeData.duration)}
                            ref={tagRef}
                        >
                            {courseTimeData.duration}min
                        </MyTimeDuration>
                    ))}
                {isType && (
                    <ShutDown tagRef={addTagRef} onClickCloseMenu={handleClickTypeMenu}>
                        <PopUp
                            textData={{ name: '添加时间类型', text: '自定义', text1: '正课', index: props.index }}
                            styledOptions={styledOptions}
                            onClickFunct={handleClickPlus}
                        />
                    </ShutDown>
                )}
            </MyFontWrap>
            <MyBigBox>
                <MyTimeBox>
                    {isDuration && isInputTagName === 'timeLength' ? (
                        <EditInput
                            tagRef={inputTagRef}
                            value={courseTimeData.timeLength}
                            onChange={handleChange}
                            onClickCloseMenu={handleClickInputMenu}
                            statu={false}
                            type='number'
                        />
                    ) : (
                        <MyTimeLength
                            onClick={() => handleClickEdit('timeLength', courseTimeData.timeLength)}
                            ref={tagRef}
                        >
                            {courseTimeData.timeLength}min
                        </MyTimeLength>
                    )}
                </MyTimeBox>
                <Wrap>
                    <MyLineLeft />
                    <MyDashed1 />
                    <MyBox>
                        {isDuration && isInputTagName === 'name' ? (
                            <MyEditWrap>
                                <EditInput
                                    length={props.length}
                                    tagRef={inputTagRef}
                                    value={courseTimeData.name}
                                    onChange={handleChangeName}
                                    onClickCloseMenu={handleClickInputMenu}
                                    onClickDelete={() => handleClickDeleteMenu('删除')}
                                    statu={false}
                                    isDelete={true}
                                    type='text'
                                />
                            </MyEditWrap>
                        ) : (
                            <MyNameWrap>
                                <MyName onClick={() => handleClickEdit('name', courseTimeData.name)} ref={deleteTagRef}>
                                    {courseTimeData.name}
                                </MyName>
                                {props.length > 1 && isShowTimes && (
                                    <ShutDown tagRef={deleteTagRef} onClickCloseMenu={handleClickDeleteMenu}>
                                        <MyShowTimes onClick={() => handleClickDeleteMenu('删除')}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </MyShowTimes>
                                    </ShutDown>
                                )}
                            </MyNameWrap>
                        )}
                    </MyBox>
                    <MyLineRight />
                    <MyDashed2 />
                </Wrap>
                <MyStartTime>{courseTimeData.startTimeString}</MyStartTime>
                <MyEndTime>{courseTimeData.endTimeString}</MyEndTime>
            </MyBigBox>
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
)(TimeTypeBlock)
