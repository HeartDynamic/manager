// 课程表
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import AdvancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(AdvancedFormat)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditInput from './EditInput'
import ShutDown from '../../../components/shut-down'
import Datepicker from '../../../components/datepicker'
import Button from '../../../components/button'
import PopUp from './PopUp'

const MyHeader = styled.header`
    box-sizing: border-box;
    width: 100%;
    height: 68px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #fff;
    border-radius: 11px;
    padding: 0 20px;
    background-color: #3a93df;
`
const MyLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    position: relative;
`
const MyName = styled.div`
    width: 100%;
    height: 40px;
    line-height: 40px;
`
const MyFontWrap = styled.div`
    height: 25px;
    width: 25px;
    text-align: center;
    position: absolute;
    z-index: 2;
    right: 0;
    cursor: pointer;
`
const MyFontWrapEdit = styled.div``

const MyRight = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const MyNameWrap = styled.div`
    display: flex;
    align-items: center;
`
const MyDelete = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    position: relative;
    svg {
        cursor: pointer;
    }
`
const MyInputWrap = styled.div`
    margin-left: 20px;
`

let name = ''
function TimeHeader(props) {
    const [courseTimeData, setCourseTimeData] = useState(props.data)
    const [isEdit, setIsEdit] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)
    const tagRef = useRef(null)
    const deleteRef = useRef(null)
    useEffect(() => {
        setCourseTimeData(props.data)
    }, [props.data])
    const handleClickEdit = () => {
        setIsEdit(!isEdit)
    }
    //标题
    const handleChangeTitle = () => {
        name = event.target.value
        setCourseTimeData({ ...courseTimeData, name: event.target.value })
    }
    const handleClickInputMenu = () => {
        setIsEdit(false)
        if (name === '') {
            name = courseTimeData.name
        }
        if (!name || name === courseTimeData.name) return
        props.editCourseTime({
            id: props.data.id,
            name,
            initialTime: props.data.initialTime,
        })
    }

    const handleClickDelete = () => {
        setIsShowDelete(!isShowDelete)
    }

    const handleClickDeleteMenu = () => {
        setIsShowDelete(false)
    }

    //修改初始周
    const handleChange = date => {
        props.editCourseTime({
            id: props.data.id,
            name: props.data.name,
            initialTime: Number(date.format('X')),
        })
    }

    //删除时间模板
    const handleClickIsSHowDelete = text => {
        setIsShowDelete(false)
        if (text === '删除') {
            props.onClickDelete()
        }
    }

    //选择模板
    const handleClickSelect = () => {
        props.editCourseTimeState({ id: courseTimeData.id })
    }

    const styledOptions = {
        color: '#40a9ff',
        radius: '29px',
        HColor: '#fff',
        HbgColor: '#40a9ff',
        HborderColor: '#40a9ff',
    }
    const styledOptions1 = {
        bgColor: '#F25858',
        borderColor: '#F25858',
        HbgColor: '#e05858',
        HborderColor: '#e05858',
        bgColor1: '#999',
        borderColor1: '#999',
        HbgColor1: '#b5b4b4',
        HborderColor1: '#b5b4b4',
        top: '62px',
        left: '-130px',
    }
    return (
        <MyHeader>
            <MyLeft>
                {isEdit ? (
                    <EditInput
                        tagRef={tagRef}
                        value={courseTimeData.name}
                        onChange={handleChangeTitle}
                        onClickCloseMenu={handleClickInputMenu}
                        isStyled={true}
                        type='text'
                    />
                ) : (
                    <>
                        <MyName>{courseTimeData.name}</MyName>
                        <MyFontWrapEdit title='修改标题'>
                            <MyFontWrap onClick={handleClickEdit} ref={tagRef} />
                            <FontAwesomeIcon icon={faEdit} />
                        </MyFontWrapEdit>
                    </>
                )}
            </MyLeft>
            <MyRight>
                <MyNameWrap>
                    <MyName>设置初始周</MyName>
                    <MyInputWrap>
                        <Datepicker
                            onChange={handleChange}
                            defaultValue={dayjs(courseTimeData.initialTime * 1000).format('YYYY/MM/DD')}
                        />
                    </MyInputWrap>
                </MyNameWrap>
                {courseTimeData.state ? (
                    <Button styledOptions={styledOptions}>已选择此模板</Button>
                ) : (
                    <Button styledOptions={styledOptions} onClick={handleClickSelect}>
                        选择模板
                    </Button>
                )}
                <MyDelete>
                    {props.index !== 0 && (
                        <MyFontWrap title='删除模板'>
                            <MyFontWrap onClick={handleClickDelete} ref={deleteRef} />
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </MyFontWrap>
                    )}
                    {isShowDelete && (
                        <ShutDown tagRef={deleteRef} onClickCloseMenu={handleClickDeleteMenu}>
                            <PopUp
                                textData={{ name: '删除该模板', text: '删除', text1: '取消' }}
                                styledOptions={styledOptions1}
                                onClickFunct={handleClickIsSHowDelete}
                            />
                        </ShutDown>
                    )}
                </MyDelete>
            </MyRight>
        </MyHeader>
    )
}

export default TimeHeader
