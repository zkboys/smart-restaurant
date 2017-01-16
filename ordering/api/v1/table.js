const controllerDecorator = require('../../../core/common/controller-decorator');

const tools = require('../../../core/common/tools');

exports.getTableRegions = controllerDecorator(async function (req, res) {
    const mchId = req.query.mchId;
    const storeId = req.query.storeId;
    const user = req.currentUser; // 当前登录用户


    // TODO: 获取所有的桌位

    console.log(mchId);
    console.log(storeId);
    const tables = [];

    const status = [
        'free', // 空闲
        'opened', // 已开桌
        'dining', // 就餐
        'need_clean', // 待清理
        'reserved',  // 预定
        'locked',// 锁定
    ];
    for (let i = 0; i < 15; i++) {
        const tableList = [];

        for (let j = 0; j < 98; j++) {
            tableList.push({
                name: `${i}-${j} 号桌`,
                id: j + 'abc',
                seatNum: 6, // 桌位总数
                seatedNum: 0,// 用餐人数
                tabStatus: status[j % 6],//status[tools.getRandomNum(0, 3)],
                // openTime: new Date().getTime(),
                // endTime: new Date().getTime(),
            });
        }

        tables.push({
            id: i + 100 + "abc",
            name: `${i} VIP 专区`,
            tableList,
        });
    }

    res.send({results: tables});
});

exports.cleanTable = controllerDecorator(async function (req, res) {
    const user = req.currentUser; // 当前登录用户
    const tableId = req.body.tableId;
    console.log(tableId);
    // TODO: clean table by table id
    res.sendSuccess();
});
