import { Box } from "ink"
import React, { FC, useEffect, useState } from "react"
import Logo from "./components/Logo"
import Tips, { ITipsProps } from "./components/Tips"
import { readSetting } from "./common/settingHelper"
import { ISetForm } from "./components/SetForm"
// import { ISetForm } from "./components/SetForm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notifier = require("node-notifier")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const schedule = require("node-schedule")

const setting = readSetting() || {}

const StartView: FC = () => {
	// 提示
	const [tips, setTips] = useState<ITipsProps>({
		isShow: false,
		type: "success",
		message: "",
	})

	useEffect(() => {
		doStart()
	}, [])

	const doStart = () => {
		// eslint-disable-next-line @typescript-eslint/no-extra-semi
		;(setting.list || [])
			.filter((set: ISetForm) => set.isTurnOn)
			.map((set: ISetForm) => {
				let scheduleStr = ""
				if (set.cycle === "day") {
					scheduleStr = `${set.time.split(":").reverse().join(" ")} * * *`
				} else if (set.cycle === "week") {
					scheduleStr = `${set.time.split(":").reverse().join(" ")} ? * ${
						set.week
					}`
				} else if (set.cycle === 'custom') {
					scheduleStr = set.schedule
				}
				schedule.scheduleJob(scheduleStr, async () => {
					notifier.notify(
						{
							title: set.title,
							message: set.message,
							icon: path.join(__dirname, "../../assets/icon.jpeg"),
							sound: true,
							wait: true,
						},
						(error: any) => {
							if (error) {
								setTips({
									isShow: true,
									type: "error",
									message: "发送通知出错",
								})
							} else {
								setTips({
									isShow: true,
									type: "success",
									message: "发送通知成功",
								})
							}
						}
					)
				})
			})

		setTips({
			isShow: true,
			type: "success",
			message: "启动成功",
		})
	}

	return (
		<Box flexDirection='column'>
			<Logo />
			<Tips {...tips}></Tips>
		</Box>
	)
}

export default StartView
