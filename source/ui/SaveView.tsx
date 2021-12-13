import { Box } from "ink"
import React, { FC, useEffect, useState } from "react"
import Logo from "./components/Logo"
import Tips, { ITipsProps } from "./components/Tips"
import shell from "shelljs"
import pm2 from "pm2"
import MyTable from "./components/MyTable"
import Loading from "./components/Loading"
import { readSetting } from "./common/settingHelper"

const setting = readSetting() || {}

const SaveView: FC = () => {
	// 提示
	const [tips, setTips] = useState<ITipsProps>({
		isShow: false,
		type: "success",
		message: "",
	})
	// pm2进程表格
	const [pm2List, setPm2List] = useState<any>([])
	const [loadingOption, setLoadingOption] = useState({
		isLoading: true,
		text: "正在安装pm2",
	})

	useEffect(() => {
		if ((setting.list || []).length === 0) {
			setLoadingOption({ isLoading: false, text: "" })
			setTips({
				isShow: true,
				type: "info",
				message: "没有发现通知，请先设置通知。",
			})
		} else {
			const result = shell.exec("npm install pm2 -g", {
				silent: true,
			})
			setLoadingOption({ isLoading: false, text: "" })
			if (result.code === 0) {
				setTips({
					isShow: true,
					type: "success",
					message: "安装pm2成功",
				})
			} else {
				setTips({
					isShow: true,
					type: "error",
					message: "安装pm2失败",
				})
				setTimeout(() => {
					process.exit(1)
				}, 0)
			}
			pm2.connect(err => {
				if (err) {
					setTips({
						isShow: true,
						type: "error",
						message: "连接pm2失败",
					})
					setTimeout(() => {
						process.exit(1)
					}, 0)
				}
				pm2.start(
					{
						name: "coder-notifier",
						script: "coder-notifier",
						args: "start",
						log_date_format: "YYYY-MM-DD HH:mm Z",
					},
					err => {
						if (err) {
							setTips({
								isShow: true,
								type: "error",
								message: "启动coder-notifier进程失败，请检查是否安装成功。",
							})
							setTimeout(() => {
								process.exit(1)
							}, 0)
						} else {
							setTips({
								isShow: true,
								type: "success",
								message: "启动coder-notifier进程成功",
							})
							const result = shell.exec("pm2 startup", {
								silent: true,
							})
							shell.exec(result.stdout.replace("sudo", ""), {
								silent: true,
							})
							shell.exec("pm2 save --force", {
								silent: true,
							})
							pm2.list((err, list) => {
								if (!err) {
									const tableData = list.map(item => {
										return {
											id: item.pm_id,
											name: item.name,
											status: item.pm2_env?.status,
										}
									})
									setPm2List(tableData)
									setTips({
										isShow: true,
										type: "success",
										message: "完成",
									})
									setTimeout(() => {
										process.exit(0)
									}, 0)
								} else {
									setTips({
										isShow: true,
										type: "info",
										message: "获取进程列表失败",
									})
									setTimeout(() => {
										process.exit(1)
									}, 0)
								}
							})
						}
					}
				)
			})
		}
	}, [])

	return (
		<Box flexDirection='column'>
			<Logo />

			{loadingOption.isLoading && <Loading>{loadingOption.text}</Loading>}

			{pm2List.length > 0 && (
				<MyTable title='pm2进程列表' data={(pm2List || []) as any}></MyTable>
			)}

			<Tips {...tips}></Tips>
		</Box>
	)
}

export default SaveView
