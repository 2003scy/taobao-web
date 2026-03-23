import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 模拟数据
const products = [
  {
    id: 1,
    title: '2024新款韩版宽松百搭休闲字母印花圆领短袖T恤女夏季透气纯棉',
    price: 89.9,
    originalPrice: 129,
    shop: '官方旗舰店',
    sales: 2560,
    location: '广东广州',
  },
  {
    id: 2,
    title: '【官方旗舰】华为MateBook 14s 12代酷睿版轻薄笔记本电脑',
    price: 2999,
    originalPrice: 4599,
    shop: '华为官方旗舰店',
    sales: 892,
    location: '广东深圳',
  },
  {
    id: 3,
    title: '【3条装】莫代尔女士内裤舒适透气日系可爱少女风内裤女',
    price: 45,
    originalPrice: 69,
    shop: '贴身日记旗舰店',
    sales: 15680,
    location: '浙江义乌',
  },
  {
    id: 4,
    title: 'Adidas NEO Court系列低帮复古运动鞋舒适透气休闲鞋',
    price: 159,
    originalPrice: 299,
    shop: 'Adidas官方旗舰店',
    sales: 3260,
    location: '福建泉州',
  },
  {
    id: 5,
    title: '完美日记名片唇釉丝绒雾面哑光持久不易脱色口红女士',
    price: 69.9,
    originalPrice: 99,
    shop: '完美日记官方旗舰店',
    sales: 8960,
    location: '广东广州',
  },
  {
    id: 6,
    title: '婴儿纯棉连体衣春秋季0-1岁宝宝爬服哈衣保暖新生儿',
    price: 128,
    originalPrice: 198,
    shop: '贝贝怡旗舰店',
    sales: 5680,
    location: '上海',
  },
  {
    id: 7,
    title: 'Apple iPhone 15 Pro Max 256GB 灵动岛5G手机',
    price: 8999,
    originalPrice: 12999,
    shop: 'Apple官方旗舰店',
    sales: 5620,
    location: '广东深圳',
  },
  {
    id: 8,
    title: '北欧简约现代轻奢设计师款客厅主卧吊灯',
    price: 269,
    originalPrice: 459,
    shop: '月影凯顿旗舰店',
    sales: 1680,
    location: '广东中山',
  },
];

// 购物车
let cart = [];

// API 路由

// 获取商品列表
app.get('/api/products', (req, res) => {
  const { search, category, sort } = req.query;
  let result = [...products];

  if (search) {
    result = result.filter(
      (p) =>
        p.title.includes(search) ||
        p.shop.includes(search) ||
        p.location.includes(search)
    );
  }

  if (sort === 'sales') {
    result.sort((a, b) => b.sales - a.sales);
  } else if (sort === 'price') {
    result.sort((a, b) => a.price - b.price);
  }

  res.json({ success: true, data: result });
});

// 获取单个商品
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: '商品不存在' });
  }
});

// 获取购物车
app.get('/api/cart', (req, res) => {
  res.json({ success: true, data: cart });
});

// 添加到购物车
app.post('/api/cart', (req, res) => {
  const { product, quantity, selectedColor, selectedSize } = req.body;
  const existing = cart.find(
    (item) =>
      item.product.id === product.id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: Date.now(),
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  }
  res.json({ success: true, data: cart });
});

// 更新购物车数量
app.put('/api/cart/:id', (req, res) => {
  const { quantity } = req.body;
  const item = cart.find((item) => item.id === parseInt(req.params.id));
  if (item) {
    item.quantity = quantity;
    res.json({ success: true, data: cart });
  } else {
    res.status(404).json({ success: false, message: '商品不存在' });
  }
});

// 从购物车删除
app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter((item) => item.id !== parseInt(req.params.id));
  res.json({ success: true, data: cart });
});

// 清空购物车
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ success: true, data: cart });
});

// 提交订单
app.post('/api/orders', (req, res) => {
  const { items, total, address, payment } = req.body;
  const order = {
    id: Date.now(),
    items,
    total,
    address,
    payment,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  cart = [];
  res.json({ success: true, data: order });
});

// 获取用户信息
app.get('/api/user', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 1,
      username: 'Tom123',
      phone: '138****8888',
      vipLevel: 3,
      assets: {
        redPacket: 128.5,
        coupons: 5,
        coins: 386,
        points: 120,
      },
    },
  });
});

// 获取地址列表
app.get('/api/addresses', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: '张三',
        phone: '138****8888',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detail: '科技园南路88号XX大厦A座1001室',
        isDefault: true,
      },
    ],
  });
});

// 获取消息列表
app.get('/api/messages', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        type: 'aliwangwang',
        title: '阿里旺旺',
        content: '您有新的客服消息',
        time: '10:30',
      },
      {
        id: 2,
        type: 'logistics',
        title: '物流通知',
        content: '您的订单已发货，预计3天内送达',
        time: '09:15',
      },
      {
        id: 3,
        type: 'activity',
        title: '活动提醒',
        content: '百亿补贴限时抢购中，错过等一年！',
        time: '昨天',
      },
      {
        id: 4,
        type: 'system',
        title: '系统通知',
        content: '账户安全提醒：您的密码已连续使用90天',
        time: '昨天',
      },
    ],
  });
});

// 获取营销活动
app.get('/api/promotions', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: '百亿补贴', subtitle: '官方补贴  全网低价', color: '#FF5500' },
      { id: 2, title: '聚划算', subtitle: '精选好货  限时特惠', color: '#FF6B35' },
      { id: 3, title: '淘宝直播', subtitle: '达人带货  实时互动', color: '#FF8C00' },
      { id: 4, title: '天天特卖', subtitle: '工厂直供  超值换购', color: '#9B59B6' },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`);
});
