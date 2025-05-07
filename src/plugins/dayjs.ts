import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isLeapYear from "dayjs/plugin/isLeapYear";

export function useDayjsPlugin() {
    dayjs.extend(relativeTime);
    dayjs.extend(isLeapYear); // 使用插件
    dayjs.locale('zh-cn'); // 使用本地化语言
}
