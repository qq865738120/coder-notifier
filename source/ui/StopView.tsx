import { Box } from "ink"
import React, { FC, useEffect, useState } from "react"
import Logo from "./components/Logo"
import Tips, { ITipsProps } from "./components/Tips"
import pm2 from "pm2"
import shell from "shelljs"

const StopView: FC = () => {
	// 提示
	const [tips, setTips] = useState<ITipsProps>({
		isShow: false,
		type: "success",
		message: "",
	})

	useEffect(() => {
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

		return () => {
			return pm2.disconnect()
		}
	}, [])

	return (
		<Box flexDirection='column'>
			<Logo />
			<Tips {...tips}></Tips>
		</Box>
	)
}

export default StopView
