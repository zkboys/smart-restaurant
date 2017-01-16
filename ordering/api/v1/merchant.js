const controllerDecorator = require('../../../core/common/controller-decorator');

const tools = require('../../../core/common/tools');

exports.getMerchants = controllerDecorator(async function (req, res) {
    const user = req.currentUser; // 当前登录用户
    const userId = user._id;

    // TODO: 根据当前登录的用户userId，获取所有品牌信息
    const merchants = [];

    const logos = [
        'http://b.hiphotos.baidu.com/image/h%3D300/sign=d3fd91ce05f431ada3d245397b37ac0f/d058ccbf6c81800a7892fd52b83533fa828b4772.jpg',
        'http://img4.imgtn.bdimg.com/it/u=3217962789,3430649993&fm=23&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=436711251,1988203548&fm=23&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=1559877436,4024048461&fm=23&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=1340784719,3145976582&fm=23&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=2310040820,4200770776&fm=23&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=4224717568,1430309466&fm=23&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=4103053338,3759929758&fm=23&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=3427718685,914985848&fm=23&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=3270324437,2342867054&fm=23&gp=0.jpg',
    ];

    const merchantCount = 10;

    for (let i = 0; i < merchantCount; i++) {
        const stores = [];

        for (let j = 0; j < 17; j++) {
            stores.push({
                id: j + 'abc',
                merchantId: i + 'abcdef',
                name: j === 3 ? `${i}-${j} 门店测试门店测试门店测试门店测试` : `${i}-${j} 门店测试门`,
                address: `测试地址${i}-${j}`,
                logo: logos[tools.getRandomNum(0, logos.length)],
            });
        }

        merchants.push({
            id: i + 'abcdef',
            name: `测试品牌${i}`,
            logo: logos[tools.getRandomNum(0, logos.length)],
            stores,
        });
    }

    res.send({results: merchants});
});
