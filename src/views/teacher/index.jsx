// 老师
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'
import dayjs from 'dayjs'
import ManagerCommon from '../../components/manager-common'
import Table from '../../components/table'
import PopUp from '../../components/manager-common/PopUp'
import Select from '../../components/select'
import Input from '../../components/Input'
import Radio from '../../components/radio'
import Paging from '../../components/paging'
import Button from '../../components/Button'
import Datepicker from '../../components/datepicker/index'
const { Column } = Table
const Container = styled.section`
    width: 100%;
`
const MySexRadio = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`
const MySpan = styled.span``
const MyFooter = styled.footer`
    display: flex;
    justify-content: center;
    :first-of-type button {
        margin-right: 10px;
    }
`

function Teacher(props) {
    const [isShowEdit, setIsShowEdit] = useState(false) //弹窗状态
    const [isDisabled, setIsDisabled] = useState(false) //input 禁止状态
    const [buttonOption, setButtonOption] = useState([]) //添加/保存
    const [keyword, setKeyword] = useState('') //搜索值
    const [teacher, setTeacher] = useState({}) //老师数据
    const [current, setCurrent] = useState(1) //当前页
    const [sexOptions, setSexOptions] = useState([{ id: 1, label: '男', value: 0 }, { id: 2, label: '女', value: 1 }])
    const [statuOptions, setStatuOptions] = useState([
        { id: 1, label: '禁用', value: 0 },
        { id: 2, label: '启用', value: 1 },
    ])
    const [subject, setSubject] = useState([
        { id: 1, name: '数学' },
        { id: 2, name: '物理' },
        { id: 3, name: '化学' },
        { id: 4, name: '生物' },
    ])
    useEffect(() => {
        if (!props.isTeacher && !props.teacherReady) {
            let data = {
                page: 1,
                limit: 10,
                field: 'entry_time',
                order: 'desc',
            }
            //账号列表
            props.getTeacher(data)
        }
    }, [props.isTeacher, props.teacherReady])
    const clearMsg = () => {
        if (props.realnameMsg) {
            props.clearMsg({
                type: 'realnameMsg',
            })
        } else if (props.usernameMsg) {
            props.clearMsg({
                type: 'usernameMsg',
            })
        } else if (props.phoneMsg) {
            props.clearMsg({
                type: 'phoneMsg',
            })
        } else if (props.entryTimeMsg) {
            props.clearMsg({
                type: 'entryTimeMsg',
            })
        } else if (props.subjectNameMsg) {
            props.clearMsg({
                type: 'subjectNameMsg',
            })
        }
    }
    //搜索
    const handleChangeSearch = text => {
        let data = {
            keyword,
            page: 1,
            limit: 10,
            field: 'entry_time',
            order: 'desc',
        }
        if (text === '搜索') {
            text === '搜索' && props.getTeacher(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getTeacher(data)
        }
    }
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            setTeacher(item)
            setButtonOption([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
        } else if (text === '添加') {
            setTeacher({
                realname: '',
                username: '',
                phone: '',
                sex: 0,
                entryTime: dayjs().format('X'),
            })
            setIsShowEdit(true)
            setIsDisabled(false)
            setButtonOption([{ id: 1, text: '添加' }, { id: 2, text: '取消' }])
        } else if (text === '关闭') {
            clearMsg()
            setIsShowEdit(false)
        }
    }
    //姓名/教师号/联系号码
    const handleChange = (event, name) => {
        setTeacher({
            ...teacher,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }

    //入职时间
    const handleChangeTime = value => {
        setTeacher({
            ...teacher,
            entryTime: value.format('X'),
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: 'entryTime' + 'Msg',
            })
        }
    }

    ///状态/性别
    const handleChangeRadio = (event, value) => {
        setTeacher({
            ...teacher,
            [value]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: value + 'Msg',
            })
        }
    }

    //学科
    const handleChangeSelect = (data, value) => {
        console.log(data, value)
        setTeacher({
            ...teacher,
            [value.name]: data.name,
            subjectId: data.id,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: value.name + 'Msg',
            })
        }
    }
    //分页
    const handleChangePaging = value => {
        let data = {
            page: value,
            limit: 10,
            field: 'entry_time',
            order: 'desc',
        }
        props.getTeacher(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!teacher.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        } else if (!teacher.username) {
            props.setMsg({
                type: 'usernameMsg',
                message: '教师号不能为空',
            })
            isOk = false
        } else if (!/^1[34578]\d{9}$/.test(teacher.phone)) {
            props.setMsg({
                type: 'phoneMsg',
                message: '输入手机号码',
            })
            isOk = false
        } else if (!teacher.entryTime) {
            props.setMsg({
                type: 'entryTimeMsg',
                message: '入职时间不能为空',
            })
            isOk = false
        } else if (!teacher.subjectName) {
            props.setMsg({
                type: 'subjectNameMsg',
                message: '执教学科不能为空',
            })
            isOk = false
        }
        return isOk
    }

    //保存/添加
    const handleSaveAndPush = text => {
        let data = {
            id: teacher.id,
            username: teacher.username,
            realname: teacher.realname,
            sex: Number(teacher.sex),
            status: Number(teacher.status),
            subjectId: teacher.subjectId,
            phone: teacher.phone,
            entryTime: teacher.entryTime,
        }
        if (text === '取消') {
            clearMsg()
            setIsShowEdit(false)
        } else {
            if (checkForm()) {
                if (text === '保存') {
                    props.editTeacher(data)
                } else if (text === '添加') {
                    delete data.status
                    props.addTeacher(data)
                }
                setIsShowEdit(false)
            }
        }
    }
    const styledOptions = {
        bgColor: '#1890ff',
        borderColor: '#1890ff',
        HbgColor: '#40a9ff',
        HborderColor: '#40a9ff',
    }
    return (
        <Container>
            <ManagerCommon
                addText='添加老师'
                onClick={handleFunct}
                onChangeSearch={handleChangeSearch}
                keyword={keyword}
            />
            <Table data={props.teacherData}>
                <Column dataIndex='realname' title='姓名' />
                <Column dataIndex='username' title='教师号' />
                <Column dataIndex='subjectName' title='执教学科' />
                <Column dataIndex='phone' title='联系号码' />
                <Column dataIndex='newSex' title='性别' />
                <Column dataIndex='newStatus' title='状态' />
                <Column dataIndex='newEntryTime' title='入职时间' />
                <Column dataIndex='newLoginTime' title='登录时间' />
                <Column
                    title='功能'
                    render={(data, index) => (
                        <Button styledOptions={styledOptions} onClick={() => handleFunct('编辑', data)}>
                            编辑
                        </Button>
                    )}
                />
            </Table>
            <Paging
                onChange={handleChangePaging}
                current={current}
                total={Math.ceil(props.teacherPageData.total / props.teacherPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <Input
                        type='text'
                        value={teacher.realname}
                        name='realname'
                        label='姓名'
                        message={props.realnameMsg}
                        onChange={event => handleChange(event, 'realname')}
                    />
                    <Input
                        type='text'
                        value={teacher.username}
                        name='username'
                        label='教师号'
                        message={props.usernameMsg}
                        onChange={event => handleChange(event, 'username')}
                    />
                    <Input
                        type='text'
                        value={teacher.phone}
                        name='phone'
                        label='联系号码'
                        message={props.phoneMsg}
                        onChange={event => handleChange(event, 'phone')}
                    />
                    <MySexRadio>
                        <MySpan>入职时间：</MySpan>
                        <Datepicker
                            onChange={handleChangeTime}
                            defaultValue={dayjs(teacher.entryTime * 1000).format('YYYY/MM/DD')}
                        />
                    </MySexRadio>
                    <MySexRadio>
                        <MySpan>性别：</MySpan>
                        {sexOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={teacher.sex}
                                name='sex'
                                onChange={event => handleChangeRadio(event, 'sex', item.value)}
                            >
                                {item.label}
                            </Radio>
                        ))}
                    </MySexRadio>
                    {isDisabled && (
                        <MySexRadio>
                            <MySpan>状态：</MySpan>
                            {statuOptions.map((item, index) => (
                                <Radio
                                    key={item.id}
                                    value={item.value}
                                    defaultValue={teacher.status}
                                    name='status'
                                    onChange={event => handleChangeRadio(event, 'status', item.value)}
                                >
                                    {item.label}
                                </Radio>
                            ))}
                        </MySexRadio>
                    )}
                    <Select
                        options={subject}
                        onChange={handleChangeSelect}
                        name='subjectName'
                        text='执教学科：'
                        leftNumber={56}
                        value={teacher.subjectName}
                        message={props.subjectNameMsg}
                    />
                    <MyFooter>
                        {buttonOption.map((item, index) => (
                            <Button
                                key={item.id}
                                styledOptions={styledOptions}
                                onClick={() => handleSaveAndPush(item.text)}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </MyFooter>
                </PopUp>
            )}
        </Container>
    )
}

const mapStateToProps = state => {
    return state.teacher
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.teacher, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teacher)
