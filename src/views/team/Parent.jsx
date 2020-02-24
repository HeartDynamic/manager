//班级
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import ManagerCommon from '../../components/manager-common'
import Table from '../../components/table'
import PopUp from '../../components/manager-common/PopUp'
import Input from '../../components/input'
import Select from '../../components/select'
import Radio from '../../components/radio'
import Paging from '../../components/paging'
import Button from '../../components/Button'

const { Column } = Table

const Container = styled.section`
    width: 100%;
`
const MyDiv = styled.div``
const MyBox = styled.div`
    width: 280px;
    display: flex;
`
const MySexRadio = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`
const MySpan = styled.span``
const MyClass = styled.span`
    padding: 0 10px;
`
const MySelect = styled.div`
    margin-bottom: 20px;
`
const MyDelete = styled.div`
    width: 114px;
    height: 28px;
    line-height: 28px;
    display: flex;
`
const MyDeleteButton = styled.button`
    width: 40px;
    height: 28px;
`
const MyAddButton = styled.button`
    height: 28px;
`
const MyFooter = styled.footer`
    display: flex;
    justify-content: center;
    button:first-child {
        margin-right: 10px;
        color: #fff;
    }
`

function Parent(props) {
    let date = new Date()
    let year = date.getFullYear()
    const [isShowEdit, setIsShowEdit] = useState(false) //弹窗状态
    const [isDisabled, setIsDisabled] = useState(false) //input 禁止状态
    const [buttonOption, setButtonOption] = useState([]) //添加/保存
    const [keyword, setKeyword] = useState('') //搜索值
    const [team, setTeam] = useState({}) //教务数据
    const [current, setCurrent] = useState(1) //当前页
    const [segmentNameOptions, setSegmentNameOptions] = useState([
        { id: 1, label: '小学', value: 1 },
        { id: 2, label: '初中', value: 2 },
        { id: 3, label: '高中', value: 3 },
    ])
    const [periodOptions, setPeriodOptions] = useState([
        { id: 1, label: year - 3, value: year - 3, name: year - 3 },
        { id: 2, label: year - 2, value: year - 2, name: year - 2 },
        { id: 3, label: year - 1, value: year - 1, name: year - 1 },
        { id: 4, label: year, value: year, name: year },
    ])
    const [nameOptions, setNameOptions] = useState([{ id: 1, value: '' }])
    const [statuOptions, setStatuOptions] = useState([
        { id: 2, label: '启用', value: 1, name: 'status' },
        { id: 1, label: '禁用', value: 0, name: 'status' },
    ])
    useEffect(() => {
        if (!props.isTeam && !props.teamReady) {
            let data = {
                page: 1,
                limit: 10,
            }
            //列表
            props.getTeam(data)
        }
    }, [props.isTeam, props.teamReady])
    const clearMsg = () => {
        if (props.periodMsg) {
            props.clearMsg({
                type: 'periodMsg',
            })
        } else if (props.nameMsg) {
            props.clearMsg({
                type: 'nameMsg',
            })
        }
    }
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            setTeam(item)
            setButtonOption([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
        } else if (text === '添加') {
            setTeam({
                segment: 1,
                segmentName: 1,
                period: '请选择',
                name: '',
            })
            setIsShowEdit(true)
            setIsDisabled(false)
            setButtonOption([{ id: 1, text: '添加' }, { id: 2, text: '取消' }])
        } else if (text === '关闭') {
            clearMsg()
            setIsShowEdit(false)
        }
    }
    //学段/状态
    const handleChangeRadio = (event, name) => {
        setTeam({
            ...team,
            [name]: event.target.value,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }
    //级数
    const handleChangeSelect = (event, value) => {
        setTeam({
            ...team,
            [value.name]: event.name,
        })
        if (props.value + 'Msg') {
            props.clearMsg({
                type: value.name + 'Msg',
            })
        }
    }
    //班名
    const handleChangeClassName = (event, value) => {
        if (value === '编辑') {
            setTeam({
                ...team,
                name: event.target.value,
            })
        } else {
            setNameOptions(
                nameOptions.map(item => {
                    if (item.id === value.id) {
                        item.value = event.target.value
                        if (props.nameMsg) {
                            props.clearMsg({
                                type: 'nameMsg',
                            })
                        }
                    }
                    return item
                })
            )
        }
    }
    //班名删除/添加
    const handleDeleAndPush = (text, value) => {
        if (text === '增加') {
            setNameOptions([
                ...nameOptions,
                {
                    id: nameOptions.length + 1,
                    value: '',
                },
            ])
        } else {
            nameOptions.map((item, index) => {
                if (item.id === value.id) {
                    nameOptions.splice(index, 1)
                    setNameOptions([...nameOptions])
                }
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
            text === '搜索' && props.getTeam(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getTeam(data)
        }
    }
    //分页
    const handleChangePaging = value => {
        let data = {
            page: value,
            limit: 10,
        }
        props.getTeam(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = names => {
        let isNames = ''
        if (isDisabled) {
            isNames = team.name === '' ? false : true
        } else {
            isNames = names.every(item => item.statu === false)
        }
        let isOk = true
        if (typeof team.period !== 'number') {
            props.setMsg({
                type: 'periodMsg',
                message: '级数不能为空',
            })
            isOk = false
        } else if (!isNames) {
            props.setMsg({
                type: 'nameMsg',
                message: '班名不能为空',
            })
            isOk = false
        }
        return isOk
    }
    //保存/添加/取消
    const handleSaveAndPush = text => {
        let names = []
        let names1 = []
        nameOptions.map(item => {
            if (item.value === '') {
                names.push({
                    value: item.value,
                    statu: true,
                })
            } else {
                names.push({
                    value: item.value,
                    statu: false,
                })
            }
            names1.push(item.value)
        })

        let data = {
            id: team.id,
            segment: Number(team.segmentName),
            names: names1,
            period: team.period,
            status: Number(team.status),
        }
        if (text === '取消') {
            clearMsg()
            setIsShowEdit(false)
        } else if (checkForm(names)) {
            if (text === '保存') {
                data.name = team.name
                data.segment = team.segment
                delete data.names
                props.editTeam(data)
            } else if (text === '添加') {
                delete data.id
                delete data.status
                props.addTeam(data)
            }
            setIsShowEdit(false)
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
                addText='添加班级'
                onClick={handleFunct}
                onChangeSearch={handleChangeSearch}
                keyword={keyword}
            />
            <Table data={props.teamData}>
                <Column dataIndex='newName' title='班' />
                <Column dataIndex='segmentName' title='班级' />
                <Column dataIndex='newPeriod' title='级别' />
                <Column dataIndex='newSegment' title='学段' />
                <Column dataIndex='newStudentCount' title='学生人数' />
                <Column dataIndex='newStatus' title='状态' />
                <Column
                    title='功能'
                    render={(data, index) => (
                        <MyFooter>
                            <Button styledOptions={styledOptions} onClick={() => handleFunct('编辑', data)}>
                                编辑
                            </Button>
                            <Link to={`/team/${data.period}/${data.id}`}>
                                <Button styledOptions={styledOptions} onClick={() => handleFunct('查看', data)}>
                                    学生管理
                                </Button>
                            </Link>
                        </MyFooter>
                    )}
                />
            </Table>
            <Paging
                onChange={handleChangePaging}
                current={current}
                total={Math.ceil(props.teamPageData.total / props.teamPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <MySexRadio>
                        <MySpan>学段：</MySpan>
                        {segmentNameOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={team.segment}
                                name='segmentName'
                                disabled={isDisabled}
                                onChange={event => handleChangeRadio(event, 'segmentName', item.value)}
                            >
                                {item.label}
                            </Radio>
                        ))}
                    </MySexRadio>
                    <MySelect>
                        <Select
                            options={periodOptions}
                            onChange={handleChangeSelect}
                            name='period'
                            text='级数：'
                            value={team.period}
                            leftNumber={28}
                            message={props.periodMsg}
                            isDisabled={isDisabled}
                        />
                    </MySelect>
                    {isDisabled ? (
                        <MyBox>
                            <Input
                                type='text'
                                value={team.name}
                                name='name'
                                label='班名'
                                message={props.nameMsg}
                                onChange={() => handleChangeClassName(event, '编辑')}
                            />
                            <MyDelete>
                                <MyClass>班</MyClass>
                            </MyDelete>
                        </MyBox>
                    ) : (
                        nameOptions.map((item, index) => (
                            <MyDiv key={item.id}>
                                <MyBox>
                                    <Input
                                        type='text'
                                        value={item.value}
                                        name='name'
                                        label='班名'
                                        message={props.nameMsg}
                                        onChange={() => handleChangeClassName(event, item)}
                                    />
                                    <MyDelete>
                                        <MyClass>班</MyClass>
                                        {index !== 0 && (
                                            <MyDeleteButton onClick={() => handleDeleAndPush('删除', item)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </MyDeleteButton>
                                        )}
                                    </MyDelete>
                                </MyBox>
                                {index === nameOptions.length - 1 && (
                                    <MyAddButton onClick={() => handleDeleAndPush('增加', item)}>增加</MyAddButton>
                                )}
                            </MyDiv>
                        ))
                    )}
                    {isDisabled && (
                        <MySexRadio>
                            <MySpan>状态：</MySpan>
                            {statuOptions.map((item, index) => (
                                <Radio
                                    key={item.id}
                                    value={item.value}
                                    defaultValue={team.status}
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
    return state.team
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.team, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Parent)
