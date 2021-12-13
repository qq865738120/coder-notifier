import { Box } from "ink"
import React, { FC, useEffect, useState } from "react"
import Logo from "./components/Logo"
import Tips, { ITipsProps } from "./components/Tips"
import pm2 from "pm2"
import shell from "shelljs"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wincmd = require('node-windows');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const StopView: FC = () => {
	// 提示
	const [tips, setTips] = useState<ITipsProps>({
		isShow: false,
		type: "success",
		message: "",
	})

	useEffect(() => {
		if (process.platform === 'darwin') {
			stopToOSX()
		} else if (process.platform === 'win32') {
			stopToWin()
		} else {
			setTips({
				isShow: true,
				type: "error",
				message: "暂时不支持该系统。",
			})
		}

		return () => {
			return pm2.disconnect()
		}
	}, [])

	const stopToOSX = () => {
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
			pm2.stop("coder-notifier", err => {
				if (err) {
					setTips({
						isShow: true,
						type: "error",
						message: "停止coder-notifier进程失败，请检查是否启动过coder-notifier",
					})
					setTimeout(() => {
						process.exit(1)
					}, 0)
				} else {
					setTips({
						isShow: true,
						type: "success",
						message: "停止coder-notifier进程成功",
					})
					pm2.delete("coder-notifier", err => {
						if (err) {
							setTips({
								isShow: true,
								type: "error",
								message: "删除coder-notifier进程失败",
							})

							setTimeout(() => {
								process.exit(1)
							}, 0)
						} else {
							setTips({
								isShow: true,
								type: "success",
								message: "删除coder-notifier进程成功",
							})
							shell.exec("pm2 save --force", {
								silent: true,
							})
							setTips({
								isShow: true,
								type: "success",
								message: "完成",
							})
							setTimeout(() => {
								process.exit(0)
							}, 0)
						}
					})
				}
			})
		})
	}

	const stopToWin = () => {
		wincmd.isAdminUser((isAdmin: any) => {
			if (isAdmin) {
				const batLinkPath = path.join("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\win-save-link.vbs")
				if (fs.existsSync(batLinkPath)) {
					fs.rmSync(batLinkPath)
					setTips({
						isShow: true,
						type: "success",
						message: "删除开机启动项成功",
					})
				}
				shell.exec('taskkill /im node.exe /f', {
					silent: true,
				})
				setTips({
					isShow: true,
					type: "success",
					message: "退出成功",
				})
				setTimeout(() => {
					process.exit(0)
				}, 10)
			} else {
				setTips({
					isShow: true,
					type: "error",
					message: "请使用管理员身份运行",
				})
				setTimeout(() => {
					process.exit(1)
				}, 10)
			}
		});
	}

	return (
		<Box flexDirection='column'>
			<Logo />
			<Tips {...tips}></Tips>
		</Box>
	)
}

export default StopView
