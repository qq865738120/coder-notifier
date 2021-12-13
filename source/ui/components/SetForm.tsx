import React, { FC, useState } from "react"
import { Box } from "ink"
import Input from "./Input"
import Select from "./Select"

export interface ISetForm {
	title: string
	message: string
	cycle: "day" | "week" | "custom"
	week: 1 | 2 | 3 | 4 | 5 | 6 | 7
	time: string
	schedule: string
	isTurnOn: boolean
	remark: string
}

export interface ISetFormProps {
	initForm?: ISetForm
	onConfirm: (form: ISetForm) => any
	onError: (errorMsg: string) => any
	onHideError: () => any
	onInfo: (infoMsg: string) => any
}

const SetForm: FC<ISetFormProps> = ({
	initForm,
	onError,
	onConfirm,
	onHideError,
	onInfo,
}) => {
	const [setup, setSetup] = useState(0)
	const [title, setTitle] = useState(initForm?.title || "")
	const [message, setMessage] = useState(initForm?.message || "")
	const [cycle, setCycle] = useState(initForm?.cycle || "day")
	const [week, setWeek] = useState(initForm?.week || 1)
	const [time, setTime] = useState(initForm?.time || "")
	const [isTurnOn, setIsTurnOn] = useState(initForm?.isTurnOn || true)
	const [remark, setRemark] = useState(initForm?.remark || "")
	const [schedule, setSchedule] = useState(initForm?.schedule || "")

	const weekList = [
		{
			label: "周一",
			value: 1,
		},
		{
			label: "周二",
			value: 2,
		},
		{
			label: "周三",
			value: 3,
		},
		{
			label: "周四",
			value: 4,
		},
		{
			label: "周五",
			value: 5,
		},
		{
			label: "周六",
			value: 6,
		},
		{
			label: "周日",
			value: 7,
		},
	]

	const cycleList = [
		{
			label: "每天",
			value: "day",
		},
		{
			label: "每周",
			value: "week",
		},
		{
			label: "自定义",
			value: "custom",
		},
	]

	const isTurnList = [
		{
			label: "是",
			value: true,
		},
		{
			label: "否",
			value: false,
		},
	]

	const onTitleConfirm = (value: string) => {
		if (value) {
			setTitle(value)
			setSetup(1)
			onHideError()
		} else {
			onError("标题不能为空")
		}
	}

	const onMessageConfirm = (value: string) => {
		if (value) {
			setMessage(value)
			setSetup(2)
			onHideError()
		} else {
			onError("信息不能为空")
		}
	}

	const onSelectCycle = (item: any) => {
		onHideError()
		setCycle(item.value)
		switch (item.value) {
			case "day":
				setSetup(4)
				break
			case "week":
				setSetup(3)
				break
			case "custom":
				setSetup(7)
				onInfo(
					"不会写？举个栗子：每30分钟通知一次（0 0/30 * * * ?）。还是不会？在线生成Cron表达式（ https://www.bejson.com/othertools/cron ）"
				)
				break
			default:
				break
		}
	}

	const onSelectWeek = (item: any) => {
		setWeek(item.value)
		setSetup(4)
		onHideError()
	}

	const onTimeConfirm = (value: string) => {
		if (/([0-1]\d|2[0-4]):[0-5]\d:[0-5]\d/.test(value)) {
			onHideError()
			setTime(value)
			setSetup(5)
		} else {
			onError("时间格式不正确")
		}
	}

	const onSelectIsTurnOn = (item: any) => {
		onHideError()
		setIsTurnOn(item.value)
		setSetup(6)
	}

	const onRemarkConfirm = (value: string) => {
		onHideError()
		setRemark(value)
		setSetup(-1)
		onConfirm({
			title,
			message,
			cycle,
			week,
			time,
			schedule,
			isTurnOn,
			remark: value,
		})
	}

	const onScheduleConfirm = (value: string) => {
		if (value) {
			if (
				new RegExp(
					`(((^([0-9]|[0-5][0-9])(\\,|\\-|\\/){1}([0-9]|[0-5][0-9]) )|^([0-9]|[0-5][0-9]) |^(\\* ))((([0-9]|[0-5][0-9])(\\,|\\-|\\/){1}([0-9]|[0-5][0-9]) )|([0-9]|[0-5][0-9]) |(\\* ))((([0-9]|[01][0-9]|2[0-3])(\\,|\\-|\\/){1}([0-9]|[01][0-9]|2[0-3]) )|([0-9]|[01][0-9]|2[0-3]) |(\\* ))((([0-9]|[0-2][0-9]|3[01])(\\,|\\-|\\/){1}([0-9]|[0-2][0-9]|3[01]) )|(([0-9]|[0-2][0-9]|3[01]) )|(\\? )|(\\* )|(([1-9]|[0-2][0-9]|3[01]) )|([1-7] )|( )|([1-7]\\#[1-4] ))((([1-9]|0[1-9]|1[0-2])(\\,|\\-|\\/){1}([1-9]|0[1-9]|1[0-2]) )|([1-9]|0[1-9]|1[0-2]) |(\\* ))(([1-7](\\,|\\-|\\/){1}[1-7])|([1-7])|(\\?)|(\\*)|(([1-7])|([1-7]\\#[1-4]))))|(((^([0-9]|[0-5][0-9])(\\,|\\-|\\/){1}([0-9]|[0-5][0-9]) )|^([0-9]|[0-5][0-9]) |^(\\* ))((([0-9]|[0-5][0-9])(\\,|\\-|\\/){1}([0-9]|[0-5][0-9]) )|([0-9]|[0-5][0-9]) |(\\* ))((([0-9]|[01][0-9]|2[0-3])(\\,|\\-|\\/){1}([0-9]|[01][0-9]|2[0-3]) )|([0-9]|[01][0-9]|2[0-3]) |(\\* ))((([0-9]|[0-2][0-9]|3[01])(\\,|\\-|\\/){1}([0-9]|[0-2][0-9]|3[01]) )|(([0-9]|[0-2][0-9]|3[01]) )|(\\? )|(\\* )|(([1-9]|[0-2][0-9]|3[01]) )|([1-7] )|( )|([1-7]\\#[1-4] ))((([1-9]|0[1-9]|1[0-2])(\\,|\\-|\\/){1}([1-9]|0[1-9]|1[0-2]) )|([1-9]|0[1-9]|1[0-2]) |(\\* ))(([1-7](\\,|\\-|\\/){1}[1-7] )|([1-7] )|(\\? )|(\\* )|(([1-7] )|([1-7]\\#[1-4]) ))((19[789][0-9]|20[0-9][0-9])\\-(19[789][0-9]|20[0-9][0-9])))`
				).test(value)
			) {
				setSchedule(value)
				setSetup(5)
			} else {
				onError("日程格式不正确")
			}
		} else {
			onError("日程不能为空")
		}
	}

	return (
		<Box flexDirection='column'>
			{setup === 0 && (
				<Input
					label='标题'
					initValue={title}
					placeholder='请输入通知标题'
					onConfirm={onTitleConfirm}
				></Input>
			)}
			{setup === 1 && (
				<Input
					label='信息'
					initValue={message}
					placeholder='请输入通知信息'
					onConfirm={onMessageConfirm}
				></Input>
			)}
			{setup === 2 && (
				<Select
					label='您想多久通知您一次？'
					placeholder='通知周期'
					initialIndex={
						cycle ? cycleList.findIndex(item => item.value === cycle) : 0
					}
					items={cycleList}
					onConfirm={onSelectCycle}
				/>
			)}
			{setup === 3 && cycle === "week" && (
				<Select
					label='您想周几通知您？'
					initialIndex={
						week ? weekList.findIndex(item => item.value === week) : 0
					}
					items={weekList}
					onConfirm={onSelectWeek}
				/>
			)}
			{setup === 4 && (
				<Input
					label='时间'
					initValue={time}
					placeholder='请输入时间，格式为（时:分:秒），例如：09:10:59'
					onConfirm={onTimeConfirm}
				></Input>
			)}
			{setup === 5 && (
				<Select
					label='您要启用这个通知吗？'
					initialIndex={isTurnOn ? 0 : 1}
					items={isTurnList}
					onConfirm={onSelectIsTurnOn}
				/>
			)}
			{setup === 6 && (
				<Input
					label='备注'
					initValue={remark}
					placeholder='请输入备注'
					onConfirm={onRemarkConfirm}
				></Input>
			)}
			{setup === 7 && (
				<Input
					label='日程'
					initValue={schedule}
					placeholder='请输入日程'
					onConfirm={onScheduleConfirm}
				></Input>
			)}
		</Box>
	)
}

export default SetForm
