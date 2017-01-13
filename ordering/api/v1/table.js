const controllerDecorator = require('../../../core/common/controller-decorator');

const tools = require('../../../core/common/tools');

exports.getTables = controllerDecorator(async function (req, res) {
    const userId = req.query.userId;
    const user = req.currentUser; // 当前登录用户

    // TODO: 获取所有的桌位
    const tables = [];

    const status = [
        'free', // 空闲
        'opened', // 已开桌
        'dining', // 就餐
        'cleaning', // 待清理
        // 'reserved',  // 预定
        // 'locking',// 锁定
    ];
    for (let i = 0; i < 3; i++) {
        const tableList = [];

        for (let j = 0; j < 100; j++) {
            tableList.push({
                name: `${j} 号桌，文字很长很啊 啊就是你的额，还是不够长吗？真是的`,
                id: j,
                seatNum: 6, // 桌位总数
                seatedNum: 0,// 用餐人数
                tabStatus: status[tools.getRandomNum(0, 3)],
            });
        }

        tables.push({
            tabRegionId: i,
            tabRegionName: `${i} VIP 专区`,
            tableList,
        });
    }

    res.send({results: tables});
});
