import chalk from "chalk"
import theme from "../ui/common/theme"

const title = (str: string) => chalk.hex(theme.mainColor).bold(str)
const name = chalk.hex(theme.secondColor)(`coder-notifier`)
const prompt = chalk.gray("$")
const label = (str: string) => chalk.hex(theme.secondColor)(str)

export default `
${title("使用：")}
  ${prompt} ${name} ${chalk.gray('[--version|--v] [--help|--h] <command> [<args>]')}

${title("例子：")}
  ${prompt} ${name} ${chalk.hex(theme.lastColor)("set")}

${title("参数：")}
  ${label("help | h ")}     ${chalk.gray('查看帮助文档')}
  ${label("version | v")}   ${chalk.gray('查看版本号')}

${title("命令：")}
  ${label("set")}           ${chalk.gray('设置。使用该命令可以设置一些通知。')}
  ${label("start")}         ${chalk.gray('启动。该命令是一次性的，启动后关闭控制台或者关闭电脑都会停止通知。')}
  ${label("save")}          ${chalk.gray('保存启动脚本。使用该命令可以让coder-notifier持久运行，电脑重启后也会自动启动。')}
  ${label("stop")}          ${chalk.gray('停止。该命令可以退出coder-notifier持久运行。使用该命令后，coder-notifier将会永久退出不会开机启动。')}
  ${label("about")}         ${chalk.gray('关于我们。')}
`
