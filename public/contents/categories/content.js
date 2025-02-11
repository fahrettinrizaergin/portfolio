import { tr as databaseTr, en as databaseEn } from "./database/database.js"
import { tr as javascriptTr, en as javascriptEn } from "./javascript/javascript.js"
import { tr as reactTr, en as reactEn } from "./reactjs/reactjs.js"
import { tr as softwareTr, en as softwareEn } from "./software/software.js"

export default {
    tr: [
        ...softwareTr,
        ...javascriptTr,
        ...reactTr,
        ...databaseTr,
    ],
    en: [
        ...softwareEn,
        ...javascriptEn,
        ...reactEn,
        ...databaseEn,
    ]
}