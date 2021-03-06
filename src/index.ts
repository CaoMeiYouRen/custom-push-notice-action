import { runPushAllInOne } from './push'
import { error, timeFormat } from './help'
import { ajax } from './ajax'
import { ChinaDayAdd } from './models/chinaDayAdd'
import { ChinaDay } from './models/chinaDay'
// 腾讯新冠肺炎最新疫情接口
const url = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
async function run(): Promise<void> {
    try {
        const resp = await ajax({
            url,
            method: 'GET',
        })
        const { ret, data } = resp.data
        if (ret !== 0) {
            error(resp.data)
            return
        }
        const { chinaDayAddList, chinaDayList } = data as { chinaDayAddList: ChinaDayAdd[], chinaDayList: ChinaDay[] }
        const latestDayAdd = chinaDayAddList[chinaDayAddList.length - 1]
        const latestDay = chinaDayList[chinaDayList.length - 1]
        const title = '国内疫情每日通报'
        let desp = `本土现存确诊：${latestDay.localConfirm}\n`
        desp += `现存确诊：${latestDay.nowConfirm}\n`
        desp += `累计确诊：${latestDay.confirm}\n`
        desp += `累计无症状感染者：${latestDay.noInfect}\n`
        desp += `累计境外输入：${latestDay.importedCase}\n`
        desp += `累计死亡：${latestDay.dead}\n`

        // desp += `新增本土确诊：${latestDayAdd.localConfirmadd}\n`
        desp += `新增确诊：${latestDayAdd.confirm}\n`
        desp += `新增无症状感染者：${latestDayAdd.infect}\n`
        desp += `新增境外输入：${latestDayAdd.importedCase}\n`
        desp += `新增死亡：${latestDayAdd.dead}\n`
        desp += `日期：${timeFormat(Date.now(), 'YYYY-MM-DD')}\n`
        desp += '数据来源：腾讯新闻 http://dwz.date/ewkb'

        await runPushAllInOne(title, desp)
    } catch (err) {
        console.error(err)
    }
}

run()
