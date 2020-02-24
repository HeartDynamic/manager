// 教务
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'
import ManagerCommon from '../../components/manager-common'
import Table from '../../components/table'
import PopUp from '../../components/manager-common/PopUp'
import Input from '../../components/Input'
import Radio from '../../components/Radio'
import Paging from '../../components/paging'
import Button from '../../components/Button'
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

function Teaching(props) {
    const [isShowEdit, setIsShowEdit] = useState(false) //弹窗状态
    const [isDisabled, setIsDisabled] = useState(false) //input 禁止状态
    const [buttonOption, setButtonOption] = useState([]) //添加/保存
    const [keyword, setKeyword] = useState('') //搜索值
    const [teaching, setTeaching] = useState({}) //教务数据
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
        if (!props.isTeaching && !props.teachingReady) {
            let data = {
                page: 1,
                limit: 10,
                field: 'create_time',
                order: 'desc',
            }
            //账号列表
            props.getTeaching(data)
        }
    }, [props])

    const clearMsg = () => {
        if (props.realnameMsg) {
            props.clearMsg({
                type: 'realnameMsg',
            })
        } else if (props.usernameMsg) {
            props.clearMsg({
                type: 'usernameMsg',
            })
        }
    }
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            setTeaching(item)
            setButtonOption([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
        } else if (text === '添加') {
            setTeaching({
                realname: '',
                username: '',
                sex: 0,
            })
            setIsShowEdit(true)
            setIsDisabled(false)
            setButtonOption([{ id: 1, text: '添加' }, { id: 2, text: '取消' }])
        } else if (text === '关闭') {
            clearMsg()
            setIsShowEdit(false)
        }
    }
    //账号/姓名
    const handleChange = (event, name) => {
        setTeaching({
            ...teaching,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }
    //性别/状态
    const handleChangeRadio = (event, name) => {
        setTeaching({
            ...teaching,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }
    //搜索
    const handleChangeSearch = text => {
        let data = {
            keyword,
            page: 1,
            limit: 10,
            field: 'create_time',
            order: 'desc',
        }
        if (text === '搜索') {
            text === '搜索' && props.getTeaching(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getTeaching(data)
        }
    }
    //分页
    const handleChangePaging = value => {
        let data = {
            page: value,
            limit: 10,
            field: 'create_time',
            order: 'desc',
        }
        props.getTeaching(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!teaching.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        } else if (!/^1[34578]\d{9}$/.test(teaching.username)) {
            props.setMsg({
                type: 'usernameMsg',
                message: '账号输入手机号码',
            })
            isOk = false
        }
        return isOk
    }
    //保存/添加
    const handleSaveAndPush = text => {
        let data = {
            id: teaching.id,
            realname: teaching.realname,
            username: teaching.username,
            sex: Number(teaching.sex),
            status: Number(teaching.status),
            schoolId: teaching.schoolId,
        }
        if (text === '取消') {
            clearMsg()
            setIsShowEdit(false)
        } else {
            if (checkForm()) {
                if (text === '保存') {
                    props.editTeaching(data)
                } else if (text === '添加') {
                    delete data.id
                    delete data.status
                    props.addTeaching(data)
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
                addText='添加教务'
                onClick={handleFunct}
                onChangeSearch={handleChangeSearch}
                keyword={keyword}
            />
            <Table data={props.teachingData} onClick={handleFunct}>
                <Column dataIndex='realname' title='姓名' />
                <Column dataIndex='schoolName' title='学校' />
                <Column dataIndex='username' title='账号' />
                <Column dataIndex='newSex' title='性别' />
                <Column dataIndex='newStatus' title='状态' />
                <Column dataIndex='newLoginTime' title='登录时间' />
                <Column dataIndex='newCreateTime' title='创建时间' />
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
                total={Math.ceil(props.teachingPageData.total / props.teachingPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <Input
                        type='text'
                        value={teaching.realname}
                        name='realname'
                        label='姓名'
                        message={props.realnameMsg}
                        onChange={event => handleChange(event, 'realname')}
                    />
                    <Input
                        type='text'
                        value={teaching.username}
                        name='username'
                        label='账号'
                        message={props.usernameMsg}
                        onChange={event => handleChange(event, 'username')}
                        isDisabled={isDisabled}
                    />
                    <MySexRadio>
                        <MySpan>性别：</MySpan>
                        {sexOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={teaching.sex}
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
                                    defaultValue={teaching.status}
                                    name='status'
                                    onChange={event => handleChangeRadio(event, 'status', item.value)}
                                >
                                    {item.label}
                                </Radio>
                            ))}
                        </MySexRadio>
                    )}
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
    return state.teaching
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.teaching, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teaching)
