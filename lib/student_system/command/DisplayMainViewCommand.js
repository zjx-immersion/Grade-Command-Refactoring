/**
 * Created by jxzhong on 3/31/17.
 */

const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`
const COMMAND = 'MENU_COMMAND'
class DisplayMainCommand {
    constructor() {
    }

    exec() {
        return {msg: COMMAND_MSG, status: COMMAND}
    }
}

module.exports = DisplayMainCommand