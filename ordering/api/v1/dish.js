const controllerDecorator = require('../../../core/common/controller-decorator');

const tools = require('../../../core/common/tools');

exports.getAllDishes = controllerDecorator(async function (req, res) {
    const mchId = req.query.mchId;
    const storeId = req.query.storeId;
    const user = req.currentUser; // 当前登录用户


    // TODO: 获取所有的桌位

    console.log(mchId);
    console.log(storeId);

    const dishCategories = [];

    for (let i = 0; i < 5; i++) {
        const dishes = [];

        for (let j = 0; j < tools.getRandomNum(5, 20); j++) {
            dishes.push({
                id: j + 'abc',
                name: `${i}-${j} 测试菜`,
                saleName: `${i}-${j} 测试菜销售名称`,
                price: j * 10,
                unit: '份',
                chargeUnit: j,
                chargeUnitName: j + '计价单位名称',
                groupName: i + '分类',
                unitName: '这个是什么鬼',
            });
        }

        dishCategories.push({
            id: i + 100 + "abc",
            name: `${i}分类`,
            dishes,
        });
    }

    res.send({results: dishCategories});
});