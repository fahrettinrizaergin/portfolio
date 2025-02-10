import { tr as databaseTr, en as databaseEn } from "./database/database.js"
import { tr as javascriptTr, en as javascriptEn } from "./javascript/javascript.js"
import { tr as reactTr, en as reactEn } from "./reactjs/reactjs.js"

export default {
    tr: [
        ...javascriptTr,
        ...reactTr,
        ...databaseTr
    ],
    en: [
        ...javascriptEn,
        ...reactEn,
        ...databaseEn
    ]
}