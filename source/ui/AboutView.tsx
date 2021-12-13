import { Box, Newline, Text } from "ink"
import React, { FC } from "react"
import theme from "./common/theme"
import Logo from "./components/Logo"
import * as figures from "figures"

const AboutView: FC = () => {
	return (
		<Box flexDirection='column'>
			<Logo />

			<Box flexDirection='column' width={80}>
				<Text color={theme.mainColor} bold>作者：</Text>
				<Text>code_xia</Text>
				<Newline></Newline>
				<Text color={theme.mainColor} bold>邮箱：</Text>
				<Text>zhengwenjun1994@gmail.com</Text>
				<Newline></Newline>
				<Text color={theme.mainColor} bold>QQ：</Text>
				<Text>865738120</Text>
				<Newline></Newline>
				<Text color={theme.mainColor} bold>GitHub：</Text>
				<Text>https://github.com/qq865738120/coder-notifier</Text>
				<Newline></Newline>
				<Text color={theme.mainColor} bold>未来规划：</Text>
				<Box>
					<Box marginRight={1}>
						<Text color={theme.secondColor}>{figures.circleFilled}</Text>
					</Box>
					<Text>通知功能</Text>
				</Box>
				<Box>
					<Box marginRight={1}>
						<Text color={theme.secondColor}>{figures.circleFilled}</Text>
					</Box>
					<Text>自动启动功能</Text>
				</Box>
				<Box>
					<Box marginRight={1}>
						<Text color={theme.secondColor}>{figures.circleFilled}</Text>
					</Box>
					<Text>导入导出设置功能</Text>
				</Box>
				<Box>
					<Box marginRight={1}>
						<Text color={theme.secondColor}>{figures.circle}</Text>
					</Box>
					<Text>用户自定义定时插件功能</Text>
				</Box>
				<Newline></Newline>
				<Text color={theme.mainColor} bold>作者的话：</Text>
				<Text>
					<Text color={theme.secondColor} bold>
						coder-notifier
					</Text>
					的初衷是成为一款程
					<Text color={theme.secondColor} bold>
						序员友好型桌面端跨平台通知类软件
					</Text>
					。没有烦人的弹窗广告一次次的打扰，没有哈利呼哨的不需要的功能，有的只有简洁且强大的功能满足日常需求。且同时兼顾
					<Text color={theme.secondColor} bold>
						CLI
					</Text>
					工具的方便快捷，以及近乎
					<Text color={theme.secondColor} bold>
						GUI
					</Text>
					工具的视觉交互体验。这得益于
					<Text color={theme.secondColor} bold>
						ink
					</Text>
					强大的功能。
				</Text>
			</Box>
		</Box>
	)
}

export default AboutView
