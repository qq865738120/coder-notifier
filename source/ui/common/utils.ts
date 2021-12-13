const settingKeys = ["list"]
const settingListType = {
	title: (value: string) => typeof value === "string",
	message: (value: string) => typeof value === "string",
	cycle: (value: string) => ["day", "week", "custom"].includes(value),
	week: (value: number) => [1, 2, 3, 4, 5, 6, 7].includes(value),
	time: (value: string) => /([0-1]\d|2[0-4]):[0-5]\d:[0-5]\d/.test(value),
	isTurnOn: (value: boolean) => typeof value === "boolean",
}

const checkSetting = (obj: any) => {
	let result = true
	const keys = Object.keys(obj)
	settingKeys.map(key => {
		if (!keys.includes(key)) {
			result = false
		} else {
			if (key === "list") {
				// eslint-disable-next-line @typescript-eslint/no-extra-semi
				;(obj[key] || []).map((item: any) => {
					const settingListKey = Object.keys(settingListType)
					settingListKey.map(listKey => {
						if (!(settingListType as any)[listKey](item[listKey])) {
							result = false
						}
					})
				})
			}
		}
	})
	return result
}

export { checkSetting }
