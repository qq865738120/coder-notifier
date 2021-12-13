// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsPath = require("fs-path")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

const filePath = path.join(__dirname, `../../../../.cache/coder-notifier/setting.json`)

const saveSetting = (obj: any) => {
	fsPath.writeFileSync(filePath, JSON.stringify(obj))
}

const readSetting = () => {
	return fs.existsSync(filePath)
		? JSON.parse(fs.readFileSync(filePath).toString())
		: null
}

export { saveSetting, readSetting }
