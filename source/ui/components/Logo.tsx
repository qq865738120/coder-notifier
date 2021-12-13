import React, { FC } from "react"
import Gradient from "ink-gradient"
import BigText from "ink-big-text"
import Divider from "ink-divider"
import { Box, Static, Text } from "ink"
// import pkg from '../../../package.json'

export interface ILogoProps {
	title?: string
}

const Logo: FC<ILogoProps> = () => {
	return (
		<Static items={['v0.0.1-alpha.1']}>
			{(item) => (
				<Box key={item} flexDirection='column' marginBottom={2}>
					<Gradient name='rainbow'>
						<BigText text='coder-notifier' />
					</Gradient>
					<Box marginTop={1} marginBottom={1}>
						<Text color='gray'>长时间写代码容易疲劳，记得多喝水多休息哦！</Text>
					</Box>
					<Divider title={item} padding={0} />
				</Box>
			)}
		</Static>
	)
}

export default Logo
