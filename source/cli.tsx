#!/usr/bin/env node
import meow from "meow"
import about from "./cli/about"
import help from "./cli/help"
import save from "./cli/save"
import set from "./cli/set"
import start from "./cli/start"
import stop from "./cli/stop"

const cli = meow(help, {
	flags: {
		help: {
			type: "boolean",
			default: false,
			alias: "h",
		},
		version: {
			type: "boolean",
			default: false,
			alias: "v",
		},
	},
})

switch (cli.input[0]) {
	case "set":
		set()
		break
	case "start":
		start()
		break
	case "save":
		save()
		break
	case "stop":
		stop()
		break
	case "about":
		about()
		break
	default:
		cli.showHelp()
		break
}
