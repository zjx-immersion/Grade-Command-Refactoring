/**
 * Created by jxzhong on 3/31/17.
 */
const GOODBYE = `see you`;
const TERMINATE = 'TERMINATE'
class CloseCommand {
    constructor() {

    }

    exec() {
        return {msg: GOODBYE, status: TERMINATE}
    }
}

module.exports = CloseCommand