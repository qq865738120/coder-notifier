import React, { FC, useEffect, useRef, useState } from "react"
import { Box } from "ink"
import Logo from "./components/Logo"
import SetForm, { ISetForm } from "./components/SetForm"
import Select from "./components/Select"
import Tips, { ITipsProps } from "./components/Tips"
import { readSetting, saveSetting } from "./common/settingHelper"
import MyTable from "./components/MyTable"
import ImportSet from "./components/ImportSet"
import { checkSetting } from "./common/utils"
import SyntaxHighlight from "ink-syntax-highlight"
import theme from "./common/theme"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ncp = require("copy-paste");

const SetView: FC = () => {
	// 步骤
	const [setup, setSetup] = useState(0)
	// 操作类型
	const [actionType, setActionType] = useState("add")
	// 设置
	const [setting, setSetting] = useState<{ list?: ISetForm[] }>({})
	// 更新的通知索引
	const [updateIndex, setUpdateIndex] = useState<number>()
	// 导入配置
	const [importText, setImportText] = useState("")
	// 提示
	const [tips, setTips] = useState<ITipsProps>({
		isShow: false,
		type: "success",
		message: "",
	})
	const tipsRef = useRef<any>()

	useEffect(() => {
		setSetting(readSetting() || {})
	}, [])

	const onSelectAction = (item: any) => {
		setActionType(item.value)
		if (item.value === "add") {
			setSetup(2)
		} else if (["delete", "update"].includes(item.value)) {
			setSetup(1)
		} else if (["import"].includes(item.value)) {
			setSetup(3)
		} else if (item.value === "export") {
			setSetup(3)
			ncp.copy(JSON.stringify(setting), () => {
				setTips({
					isShow: true,
					type: "success",
					message: "导出成功，已经帮您复制到剪切板。",
				})
			})
		} else if (item.value === "query") {
			setSetup(3)
			if ((setting.list || []).length === 0) {
				setTips({
					isShow: true,
					type: "info",
					message: "您还没有设置通知，请先添加一条通知吧。",
				})
			}
		}
	}

	const onSetFormConfirm = (form: ISetForm) => {
		if (actionType === "add") {
			tipsRef.current.clear()
			const settings = setting?.list || []
			settings.push(form)
			setting.list = settings
			setSetting(setting)
			saveSetting(setting)
			setTips({
				isShow: true,
				type: "success",
				message: "新增成功",
			})
		} else if (actionType === "update") {
			tipsRef.current.clear()
			// eslint-disable-next-line @typescript-eslint/no-extra-semi
			;(setting?.list || [])[updateIndex || 0] = form
			setSetting(setting)
			saveSetting(setting)
			setTips({
				isShow: true,
				type: "success",
				message: "修改成功",
			})
		}
	}

	const onSetFormError = (errorMsg: string) => {
		setTips({
			isShow: true,
			type: "error",
			message: errorMsg,
		})
	}

	const onSetFormInfo = (infoMsg: string) => {
		setTips({
			isShow: true,
			type: "info",
			message: infoMsg,
		})
	}

	const onSelectSetting = (item: any) => {
		if (actionType === "delete") {
			// eslint-disable-next-line @typescript-eslint/no-extra-semi
			;(setting?.list || []).splice(item.value, 1)
			setSetting(setting)
			saveSetting(setting)
			setSetup(-1)
			setTips({
				isShow: true,
				type: "success",
				message: "删除成功",
			})
		} else if (actionType === "update") {
			setUpdateIndex(item.value)
			setSetup(2)
		}
	}

	const onImportConfirm = (value: string) => {
		setImportText(value)
		setSetup(-1)
		try {
			const settingObj = JSON.parse(value)
			if (checkSetting(settingObj)) {
				setSetting(settingObj)
				setTips({
					isShow: true,
					type: "success",
					message: "导入成功",
				})
				saveSetting(settingObj)
			} else {
				setTips({
					isShow: true,
					type: "error",
					message: "导入失败，请检查设置是否正确。",
				})
			}
		} catch (error) {
			console.error(error);
			setTips({
				isShow: true,
				type: "error",
				message: "导入失败，请检查设置是否正确。",
			})
		}
	}

	return (
		<Box flexDirection='column'>
			<Logo />

			{setup === 0 && (
				<Select
					label='您要怎么操作通知？'
					items={[
						{
							label: "新增",
							value: "add",
						},
						{
							label: "修改",
							value: "update",
						},
						{
							label: "删除",
							value: "delete",
						},
						{
							label: "查看",
							value: "query",
						},
						{
							label: "导入",
							value: "import",
						},
						{
							label: "导出",
							value: "export",
						},
					]}
					onConfirm={onSelectAction}
				/>
			)}

			{setup === 1 && (
				<Select
					label={`您要${actionType === "update" ? "修改" : "删除"}哪个通知？`}
					items={(setting.list || []).map((item, index) => {
						return {
							label: item.title,
							value: index,
						}
					})}
					onConfirm={onSelectSetting}
				/>
			)}

			{setup === 2 && (actionType === "add" || actionType === "update") && (
				<SetForm
					initForm={
						actionType === "update"
							? (setting?.list || [])[updateIndex || 0]
							: undefined
					}
					onConfirm={onSetFormConfirm}
					onError={onSetFormError}
					onHideError={() => setTips({ isShow: false })}
					onInfo={onSetFormInfo}
				></SetForm>
			)}

			{setup === 3 &&
				actionType === "query" &&
				((setting.list || []).length > 0 ? (
					<MyTable
						title='通知配置列表'
						data={(setting.list || []) as any}
					></MyTable>
				) : null)}

			{setup === 3 && actionType === "import" && (
				<ImportSet
					initValue={importText}
					onConfirm={onImportConfirm}
				></ImportSet>
			)}

			{setup === 3 && actionType === "export" && (
				<Box marginTop={1} borderStyle="classic" borderColor={theme.mainColor} padding={1}>
					<SyntaxHighlight code={JSON.stringify(setting)} language='JSON' />
				</Box>
			)}

			<Tips ref={tipsRef} {...tips}></Tips>
		</Box>
	)
}

export default SetView
