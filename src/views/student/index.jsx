// 学生
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'
import Table from '../../components/table'
import ManagerCommon from '../../components/manager-common'
import PopUp from '../../components/manager-common/PopUp'
import Input from '../../components/input'
import Radio from '../../components/radio'
import Button from '../../components/button'
import Paging from '../../components/paging'
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

function Student(props) {
    const [isShowEdit, setIsShowEdit] = useState(false) //弹窗状态
    const [isDisabled, setIsDisabled] = useState(false) //input 禁止状态
    const [buttonOption, setButtonOption] = useState([]) //添加/保存
    const [keyword, setKeyword] = useState('') //搜索值
    const [student, setStudent] = useState({}) //老师数据
    const [current, setCurrent] = useState(1) //当前页
    const [sexOptions, setSexOptions] = useState([
        { id: 1, label: '男', value: 0, name: 'sex', sexId: 'sexId1' },
        { id: 2, label: '女', value: 1, name: 'sex', sexId: 'sexId2' },
    ])
    const [statuOptions, setStatuOptions] = useState([
        { id: 2, label: '启用', value: 1, name: 'status' },
        { id: 1, label: '禁用', value: 0, name: 'status' },
    ])
    useEffect(() => {
        let data = {
            page: 1,
            limit: 10,
            field: 'login_time',
            order: 'desc',
            period: Number(props.match.params.period),
            teamId: Number(props.match.params.teamId),
        }
        if (
            (!props.isStudent && !props.studentReady) ||
            (props.currentClassId !== Number(props.match.params.teamId) && current === 1)
        ) {
            props.getStudent(data)
        }
    }, [props.isStudent, props.studentReady, current])
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
            field: 'login_time',
            order: 'desc',
        }
        if (text === '搜索') {
            text === '搜索' && props.getStudent(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getStudent(data)
        }
    }
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            setStudent(item)
            setButtonOption([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
        } else if (text === '添加') {
            setStudent({
                realname: '',
                username: '',
                sex: 0,
                parentsName: '',
                parentsPhone: '',
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
        setStudent({
            ...student,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }

    //状态/性别
    const handleChangeRadio = (event, name) => {
        setStudent({
            ...student,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }

    //分页
    const handleChangePaging = value => {
        let data = {
            page: value,
            limit: 10,
            field: 'login_time',
            order: 'desc',
        }
        props.getStudent(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!student.username) {
            props.setMsg({
                type: 'usernameMsg',
                message: '账号不能为空',
            })
            isOk = false
        } else if (!student.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        } else if (!student.parentsName) {
            props.setMsg({
                type: 'parentsNameMsg',
                message: '家长姓名不能为空',
            })
            isOk = false
        } else if (!/^1[34578]\d{9}$/.test(student.parentsPhone)) {
            props.setMsg({
                type: 'parentsPhoneMsg',
                message: '家长号码不能为空',
            })
            isOk = false
        }
        return isOk
    }

    //保存/添加
    const handleSaveAndPush = text => {
        let data = {
            id: student.id,
            teamId: Number(props.match.params.teamId),
            period: Number(props.match.params.period),
            realname: student.realname,
            username: student.username,
            sex: Number(student.sex),
            status: Number(student.status),
            parentsName: student.parentsName,
            parentsPhone: student.parentsPhone,
            bornTime: 1552377354,
        }
        if (text === '取消') {
            clearMsg()
            setIsShowEdit(false)
        } else {
            if (checkForm()) {
                if (text === '保存') {
                    props.editStudent(data)
                } else if (text === '添加') {
                    delete data.id
                    delete data.status
                    props.addStudent(data)
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
                addText='添加学生'
                onClick={handleFunct}
                onChangeSearch={handleChangeSearch}
                keyword={keyword}
            />
            <Table data={props.studentData}>
                <Column dataIndex='username' title='账号' />
                <Column dataIndex='realname' title='姓名' />
                {/* <Column dataIndex='phone' title='级别' />
                <Column dataIndex='phone' title='班级' /> */}
                <Column dataIndex='newSex' title='性别' />
                <Column dataIndex='newStatus' title='状态' />
                <Column dataIndex='newLoginTime' title='登录时间' />
                <Column
                    title='功能'
                    render={(data, index) => (
                        <Button styledOptions={styledOptions} onClick={() => handleFunct('编辑', data)}>
                            编辑
                        </Button>
                    )}
                />
                {/* <Column
                    title='功能'
                    render={(data, index) => <button onClick={() => handleFunct('编辑', data)}>编辑</button>}
                /> */}
            </Table>
            <Paging
                onChange={handleChangePaging}
                current={current}
                total={Math.ceil(props.studentPageData.total / props.studentPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <Input
                        type='text'
                        value={student.username}
                        name='username'
                        label='学号'
                        message={props.usernameMsg}
                        onChange={event => handleChange(event, 'username')}
                    />
                    <Input
                        type='text'
                        value={student.realname}
                        name='realname'
                        label='姓名'
                        message={props.realnameMsg}
                        onChange={event => handleChange(event, 'realname')}
                    />

                    {/* <Input
                        type='text'
                        value={student.phone}
                        name='phone'
                        label='电话号码'
                        message={props.phoneMsg}
                        onChange={handleChange}
                    /> */}
                    <MySexRadio>
                        <MySpan>性别：</MySpan>
                        {sexOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={student.sex}
                                name='sex'
                                onChange={event => handleChangeRadio(event, 'sex')}
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
                                    defaultValue={student.status}
                                    name='status'
                                    onChange={event => handleChangeRadio(event, 'status')}
                                >
                                    {item.label}
                                </Radio>
                            ))}
                        </MySexRadio>
                    )}
                    <Input
                        type='text'
                        value={student.parentsName}
                        name='parentsName'
                        label='家长姓名'
                        message={props.parentsNameMsg}
                        onChange={event => handleChange(event, 'parentsName')}
                    />
                    <Input
                        type='text'
                        value={student.parentsPhone}
                        name='parentsPhone'
                        label='家长号码'
                        message={props.parentsPhoneMsg}
                        onChange={event => handleChange(event, 'parentsPhone')}
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
    return state.student
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.student, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student)
