(function () {
  const VIDEO_ROWS = {
    1: [
      ["cmr6e9gh39vm8nvs4yq1n8g2x", "8xOGqPCd_K4", "The Best Video to Learn About Colors in Mandarin Chinese for Toddlers, Kids & Beginners | 颜色", 250, "https://i.ytimg.com/vi_webp/8xOGqPCd_K4/maxresdefault.webp", ["beginner"], 3078, "2026-07-05"],
      ["cmpz89mhi072qffnee8f4e7qp", "1Rp-o-31o0M", "小猪佩奇 | 第四季 第25集 「 大象埃德蒙的生日 」 粉红猪小妹 | 佩佩猪 |Peppa Pig Chinese |动画", 301, "https://i.ytimg.com/vi/1Rp-o-31o0M/maxresdefault.jpg", ["anime"], 11417, "2026-06-02"],
      ["cmpujw4yi05slfufxoztfuz3x", "MYQrQvbR8Vk", "HSK 1-2 | 我的一天 My Daily Routine | Learn Everyday Chinese through Real Conversations", 547, "https://i.ytimg.com/vi/MYQrQvbR8Vk/maxresdefault.jpg", ["podcast", "beginner"], 29604, "2026-06-01"],
      ["cmpun2gf90l2xfufx85u6c7rw", "KN3YgmVew4U", "HSK 1-2 | 中文变简单的4个习惯 | 4 Habits That Make Learning Chinese Easier", 1122, "https://i.ytimg.com/vi/KN3YgmVew4U/maxresdefault.jpg", ["beginner"], 14190, "2026-05-30"],
      ["cmpuke0f507r1fufxati773nx", "VZygFUrGONQ", "How to Train Your Brain to Think in Chinese? | 学会用中文思考！每天中文 | Chinese Daily Podcast", 1305, "https://i.ytimg.com/vi/VZygFUrGONQ/maxresdefault.jpg", ["beginner"], 3548, "2026-05-29"],
      ["cmpumj6vl0i1wfufxcv9g3g12", "O_kkptuQPY8", "HSK 1-2 | 中文口语练习 | Talking About Food and Feelings in Chinese", 995, "https://i.ytimg.com/vi/O_kkptuQPY8/maxresdefault.jpg", ["beginner"], 1459, "2026-04-30"],
      ["cml61gzgd0sia4ic8keqqtbhf", "DiTxQOJ-stE", "20分钟学会50+交通短语 | HSK1-2中文会话", 1198, "https://i.ytimg.com/vi_webp/DiTxQOJ-stE/maxresdefault.webp", ["beginner"], 24510, "2026-02-03"],
      ["cml61dl950s724ic843d4tb3r", "thUnitvIwLk", "15个真实中文对话：买票场景（HSK1-2）", 1402, "https://i.ytimg.com/vi_webp/thUnitvIwLk/maxresdefault.webp", ["beginner"], 19361, "2026-02-03"],
      ["cml1lreoo3iishy73gw7pqd33", "gnCXffOg7T8", "25 分钟日常生活中文对话 (HSK 1-2) | 简单普通话", 1253, "https://i.ytimg.com/vi_webp/gnCXffOg7T8/maxresdefault.webp", ["beginner"], 30362, "2026-01-31"],
      ["cmkly52q73w10fkxlu63iysn5", "_vrYDiHoqyY", "15 Minutes of Chinese Conversations for Beginners | On the road | HSK 1-2", 1013, "https://i.ytimg.com/vi/_vrYDiHoqyY/maxresdefault.jpg", ["beginner"], 18283, "2026-01-20"],
      ["cmkkymc3e14gdfkxlx9djlinl", "HGrIsQvGoWA", "10 Short Chinese Conversation for Beginners - Asking for Directions", 1434, "https://i.ytimg.com/vi/HGrIsQvGoWA/maxresdefault.jpg", ["beginner"], 7634, "2026-01-18"],
      ["cmki4ntd10hwioh869s0st3eh", "egpUgFMQ91E", "Chinese Conversation for Beginners: Asking for a Favor | With Subtitle", 1261, "https://i.ytimg.com/vi/egpUgFMQ91E/maxresdefault.jpg", ["beginner"], 7087, "2026-01-17"]
    ],
    2: [
      ["cmpz2sqej2gor6hqvh8lfj60r", "UvIv3XK2vLo", "What's This Called in Chinese? | Learn to Describe Your Morning Routine & Bathroom Tour (HSK 2-3)", 582, "https://i.ytimg.com/vi/UvIv3XK2vLo/maxresdefault.jpg", ["beginner"], 4948, "2026-06-05"],
      ["cmpycrmg30iwg6hqvgq2hbkh2", "SdTpJQIc2wQ", "【HSK1-2 A conversation with a Chinese child】50 basic Q&A in Chinese 50个中文基础问答 ｜Listening practice", 504, "https://i.ytimg.com/vi/SdTpJQIc2wQ/maxresdefault.jpg", ["beginner"], 3378, "2026-06-03"],
      ["cmpujw4yi05slfufxoztfuz3x", "MYQrQvbR8Vk", "HSK 1-2 | 我的一天 My Daily Routine | Learn Everyday Chinese through Real Conversations", 547, "https://i.ytimg.com/vi/MYQrQvbR8Vk/maxresdefault.jpg", ["podcast", "beginner"], 29604, "2026-06-01"],
      ["cmpun2gf90l2xfufx85u6c7rw", "KN3YgmVew4U", "HSK 1-2 | 中文变简单的4个习惯 | 4 Habits That Make Learning Chinese Easier", 1122, "https://i.ytimg.com/vi/KN3YgmVew4U/maxresdefault.jpg", ["beginner"], 14190, "2026-05-30"],
      ["cmpuke0f507r1fufxati773nx", "VZygFUrGONQ", "How to Train Your Brain to Think in Chinese? | 学会用中文思考！每天中文 | Chinese Daily Podcast", 1305, "https://i.ytimg.com/vi/VZygFUrGONQ/maxresdefault.jpg", ["beginner"], 3548, "2026-05-29"],
      ["cmpfc01ri33jjrhsm8fxuz7p2", "Yw2I6l1IPtA", "鹦鹉波莉 | 小猪佩奇 | 儿童卡通片", 270, "https://i.ytimg.com/vi/Yw2I6l1IPtA/maxresdefault.jpg", ["anime"], 846, "2026-05-17"],
      ["cmp5bia1014c7ue8t9wqzz0l4", "VWLq7lY49F0", "Chinese Stories for Kids - Are You Home? 你在家吗？ | Mandarin Lesson A22 | Little Chinese Learners", 128, "https://i.ytimg.com/vi/VWLq7lY49F0/maxresdefault.jpg", ["beginner"], 1859, "2026-05-16"],
      ["cmp7tpjl65c6qiietsfgog203", "mx4ETdiBaIQ", "Why Do Chinese People Celebrate Mid-Autumn Festival?｜中秋节的由来与故事 | ChineseClass365", 308, "https://i.ytimg.com/vi/mx4ETdiBaIQ/maxresdefault.jpg", ["beginner"], 1860, "2026-05-16"],
      ["cmp6od0tt1me4iietlj557n3n", "ZxNawwaGTGk", "Chinese Stories for Kids - Do You Have Siblings? 你有兄弟姐妹吗？ | Mandarin A17 | Little Chinese Learners", 121, "https://i.ytimg.com/vi/ZxNawwaGTGk/maxresdefault.jpg", ["beginner"], 1070, "2026-05-16"],
      ["cmoy0pm630xi6mt9zi22wnimb", "vI-0O089sxY", "Spring (春天) |Science & Nature | Chinese | By Little Fox", 112, "https://i.ytimg.com/vi/vI-0O089sxY/maxresdefault.jpg", ["beginner"], 2394, "2026-05-14"],
      ["cmpfho24j3vx4rhsmjnsi2uyd", "oxY1c3Y3a1A", "China's Supermarket Prices Revealed: A Guide to Learning Chinese and the Cost of Living", 475, "https://i.ytimg.com/vi/oxY1c3Y3a1A/hqdefault.jpg", ["beginner"], 608, "2026-05-04"],
      ["cmpumj6vl0i1wfufxcv9g3g12", "O_kkptuQPY8", "HSK 1-2 | 中文口语练习 | Talking About Food and Feelings in Chinese", 995, "https://i.ytimg.com/vi/O_kkptuQPY8/maxresdefault.jpg", ["beginner"], 1459, "2026-04-30"]
    ],
    3: [
      ["cmr98kjab3uj5jx3hz0ly8f1e", "eyQA294dTBQ", "All about Bears in Mandarin Chinese | 熊 | Educational Video For Kids in Chinese", 406, "https://i.ytimg.com/vi_webp/eyQA294dTBQ/maxresdefault.webp", ["beginner"], 422, "2026-07-06"],
      ["cmr94aork2fahjx3hj4jpfiap", "NAhpw5N9Pzs", "The Carter Family 1: Game Night (卡特家庭 1: 游戏之夜) | Family | Chinese | By Little Fox", 239, "https://i.ytimg.com/vi_webp/NAhpw5N9Pzs/maxresdefault.webp", ["anime"], 484, "2026-07-06"],
      ["cmr93epmy28igjx3hsfh2rt40", "tDlWxZ1IqrQ", "HSK 2 - 3 | The 4 Great Cuisines Explained | Chinese Daily Podcast", 772, "https://i.ytimg.com/vi_webp/tDlWxZ1IqrQ/maxresdefault.webp", ["podcast"], 3672, "2026-07-06"],
      ["cmqxfoakj45il8iwe9ycm3cpp", "BrUm4KxCA34", "瑪莎與熊 - 笑一個 (第34集) | Masha and The Bear", 400, "https://i.ytimg.com/vi_webp/BrUm4KxCA34/maxresdefault.webp?v=5c9dd042", ["anime"], 1152, "2026-07-05"],
      ["cmr6jsmdsc8jgnvs4detvq22d", "D5xKoyMqjFo", "Learn All About Parts of Your Body in Chinese + Song 身体 | Chinese for Babies, Toddlers, & Kids", 753, "https://i.ytimg.com/vi_webp/D5xKoyMqjFo/maxresdefault.webp", ["beginner"], 590, "2026-07-05"],
      ["cmr7acano0fjarfbo4libgjsg", "NY-JpQjuzV0", "慢速的vlog学习中文，汉语可理解输入，吃早餐和还书", 794, "https://i.ytimg.com/vi/NY-JpQjuzV0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_tMgTyITlPxs_jED9ll10IY-K3A", ["other"], 1734, "2026-07-05"],
      ["cmr7fr6l41jj2rfboq05dxrx3", "CupCozLu2OQ", "Learn Different Vegetables in Mandarin Chinese for Toddlers, Kids & Beginners | 蔬菜", 199, "https://i.ytimg.com/vi_webp/CupCozLu2OQ/maxresdefault.webp", ["beginner"], 194, "2026-07-05"],
      ["cmqxe9n2f3yng8iwe44jy3hrq", "6-kigrXI-vc", "瑪莎與熊 - 蛀牙 (第33集) | Masha and The Bear", 402, "https://i.ytimg.com/vi_webp/6-kigrXI-vc/maxresdefault.webp", ["anime"], 322, "2026-07-03"],
      ["cmr4u8wyr2gz211s7ec45vnr3", "WuAfgI7QpuA", "西游记 58 (西遊記 | Journey to the West) | 孫悟空 | 孙悟空 | Chinese Stories for Kids | Little Fox Chinese", 321, "https://i.ytimg.com/vi/WuAfgI7QpuA/maxresdefault.jpg", ["culture"], 549, "2026-07-03"],
      ["cmr38t3vg0am810gyi0dd1g0m", "_oeqqZRVfG8", "HSK 3-4 | 用“断舍离”改变生活 | Stop Wasting Time Finding Things! | Chinese Listening Practice", 1081, "https://i.ytimg.com/vi_webp/_oeqqZRVfG8/maxresdefault.webp", ["podcast", "culture"], 873, "2026-07-02"],
      ["cmr38rr670a7p10gyt0lgurq7", "xdULRJN_RZM", "HSK 3 - 4 | 独处的秘密力量 | The Secret Power of Being Alone | Chinese Daily Podcast", 667, "https://i.ytimg.com/vi/xdULRJN_RZM/maxresdefault.jpg", ["podcast", "culture"], 369, "2026-07-02"],
      ["cmr38qz3p09z910gyy8gowbez", "QcoJ4jS2slc", "HSK 3-5 | 中国年轻人还用农历吗？Do Chinese Youth Still Use the Lunar Calendar?", 753, "https://i.ytimg.com/vi_webp/QcoJ4jS2slc/maxresdefault.webp", ["podcast", "culture"], 62, "2026-07-02"]
    ],
    4: [
      ["cmr94qpq62ilzjx3h2swvm1xy", "1C1-QkXo2Qg", "《新大头儿子和小头爸爸》（第四季） 第09集 拯救野鸭子 | CCTV少儿", 610, "https://i.ytimg.com/vi_webp/1C1-QkXo2Qg/maxresdefault.webp", ["anime"], 1646, "2026-07-06"],
      ["cmr96cc0e2ysmjx3hzmiq8zhl", "6cas6gzR2Z4", "一个人在不在乎你，看这几个问题就知道", 483, "https://i.ytimg.com/vi/6cas6gzR2Z4/maxresdefault.jpg", ["motivation"], 539, "2026-07-06"],
      ["cmr969jbe2xstjx3h45kcpli5", "uunqNN8fsNQ", "瑪莎與熊 - NEW 2026 敲敲門 (第111集) | Masha and The Bear CH", 791, "https://i.ytimg.com/vi_webp/uunqNN8fsNQ/maxresdefault.webp?v=69cebe2e", ["anime"], 431, "2026-07-06"],
      ["cmr6hxtl6bidznvs44ka080f3", "pbiVzGvumcU", "所有感情，都会败给这两个字（句句入心）", 492, "https://i.ytimg.com/vi/pbiVzGvumcU/maxresdefault.jpg", ["motivation"], 426, "2026-07-05"],
      ["cmr6ekgk7a07dnvs4acxvr7p7", "iieB8hxPEXk", "《新大头儿子和小头爸爸》（第四季） 第07集 拯救乳酪蛋糕 | CCTV少儿", 611, "https://i.ytimg.com/vi_webp/iieB8hxPEXk/maxresdefault.webp", ["anime"], 828, "2026-07-05"],
      ["cmr7e192w13xyrfbop5i4i74t", "IaCR8vPgw1w", "《新大头儿子和小头爸爸》（第四季） 第08集 到底哪个好 | CCTV少儿", 611, "https://i.ytimg.com/vi_webp/IaCR8vPgw1w/maxresdefault.webp", ["film"], 881, "2026-07-05"],
      ["cmr7d9uv30zhbrfbo21y1omk4", "kaRuwWokgTI", "瑪莎與熊 - 我們為什麼要洗澡？ | Masha and The Bear CH", 775, "https://i.ytimg.com/vi_webp/kaRuwWokgTI/maxresdefault.webp", ["anime"], 167, "2026-07-05"],
      ["cmr791fhh04cerfbot0rxcay3", "qvE5BpwBA6M", "Learn Chinese Through Daily Life | Real Mandarin With Consistent Listening Practice", 787, "https://i.ytimg.com/vi/qvE5BpwBA6M/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCA22iIJyJWTjvJnljlP_E-Ys-ygA", ["other"], 546, "2026-07-05"],
      ["cmr4wpah32x7c11s7e081yv59", "BIg-j7kEC9Q", "Comprehensible Input Through Contextual Repetition | Real Mandarin Vlog 可理解性输入", 720, "https://i.ytimg.com/vi/BIg-j7kEC9Q/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAlv7XV7kJ9TQNIR3OZxaDNjwIDYA", ["other"], 626, "2026-07-04"],
      ["cmr6amff38zw4nvs4ebjnkl0c", "oUPv4MF317g", "瑪莎與熊 - 初次見面 (第1集) 全新影集! | Masha and The Bear", 398, "https://i.ytimg.com/vi_webp/oUPv4MF317g/maxresdefault.webp", ["anime"], 305, "2026-07-04"],
      ["cmr3jul4n1rc91307sr5nflfx", "H0J3zgtLlwo", "瑪莎與熊 - 晚安故事 (第39集) | Masha and The Bear", 402, "https://i.ytimg.com/vi_webp/H0J3zgtLlwo/maxresdefault.webp", ["anime"], 407, "2026-07-03"],
      ["cmr3k9wav1zc31307lgxwu2m6", "m0qVqpWErCw", "或许人生中唯一不变的，就是一直在变", 490, "https://i.ytimg.com/vi/m0qVqpWErCw/sddefault.jpg", ["other"], 774, "2026-07-03"]
    ],
    5: [
      ["cmr7e1qo9141jrfboci6rv336", "OgrlNAEAR_M", "14 江南逢李龟年--米小圈动画古诗", 559, "https://i.ytimg.com/vi/OgrlNAEAR_M/maxresdefault.jpg?v=61ab88f5", ["culture"], 538, "2026-07-05"],
      ["cmr6iox4jbtd5nvs4flktzouc", "cMbETkoorXk", "13 早春呈水部张十八员外--米小圈动画古诗", 527, "https://i.ytimg.com/vi/cMbETkoorXk/maxresdefault.jpg?v=61ab86a5", ["culture"], 211, "2026-07-05"],
      ["cmr4tbb0j2b6m11s7wbn2ztei", "XYWIx67q9UU", "19 凉州词--米小圈动画古诗", 516, "https://i.ytimg.com/vi/XYWIx67q9UU/maxresdefault.jpg?v=61ab93cf", ["culture"], 254, "2026-07-03"],
      ["cmqnzu0m70n2zvwuoxhcs07jz", "cTatdAajWks", "VOA今日焦点 (2026年6月19日)", 895, "https://i.ytimg.com/vi/cTatdAajWks/maxresdefault.jpg?v=6a345852", ["news"], 115, "2026-07-02"],
      ["cmr3e8lgn0exf1307f4vu25e8", "jU5RI7vRvfQ", "【纯净版】EP1 学霸们正面交锋 北大VS港大VS牛津 赛制升级！末位淘汰制好残酷《令人心动的offer S5》 An Exciting Offer S5 Special", 8119, "https://i.ytimg.com/vi_webp/jU5RI7vRvfQ/maxresdefault.webp", ["business"], 428, "2026-07-02"],
      ["cmqnynl1q0f2wvwuoeymdz78h", "efUu1a1ZV_Q", "VOA今日焦点 (2026年6月20日)", 886, "https://i.ytimg.com/vi/efUu1a1ZV_Q/maxresdefault.jpg?v=6a35a875", ["news"], 121, "2026-07-01"],
      ["cmr0iy5qm0cdndgvgkk2r7fr7", "WpEyLKUFDVQ", "中国高考揭开序幕 多地现花式应援与陪考花招 | 八点最热报 07/06/2026", 217, "https://i.ytimg.com/vi/WpEyLKUFDVQ/maxresdefault.jpg", ["news"], 296, "2026-07-01"],
      ["cmqxhj40g4eps8iwe6lsez2bp", "eve5IzYlwSE", "小品《诗和远方》张海宇 吴彼 张小婉 管乐，这4个人凑一起句句戳笑点 #今夜现场秀 Clip", 536, "https://i.ytimg.com/vi_webp/eve5IzYlwSE/maxresdefault.webp", ["film"], 1078, "2026-07-01"],
      ["cmr0rknpm30mvdgvgwaa5byes", "2jtmzYD8xxY", "16 悯农--米小圈动画古诗", 439, "https://i.ytimg.com/vi/2jtmzYD8xxY/maxresdefault.jpg", ["culture"], 187, "2026-07-01"],
      ["cmqxmnt7v5op98iwetl5x4r4g", "mWQA_s8U12Y", "职场遇到不喜欢的人怎么办？不用远离也不用排斥，三招解决问题!", 235, "https://i.ytimg.com/vi/mWQA_s8U12Y/maxresdefault.jpg", ["motivation"], 238, "2026-07-01"],
      ["cmqxnn2ao5wfb8iweekuzs0fq", "KlekFahuyko", "父母与子女 一段把爱藏得很深的关系-五分钟心里抚慰", 259, "https://i.ytimg.com/vi/KlekFahuyko/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgSyhGMA8=&rs=AOn4CLBTQkbfQ1GvoTXxM_c9IfjG5gGBfw", ["motivation"], 204, "2026-07-01"],
      ["cmqxsnsl606e8azdq6mg3rtca", "G_S_1nocObg", "一生总要去一次敦煌莫高窟吧！感受“行五十步穿越百年，行百步穿越千年”的震撼 | CCTV「正大综艺」", 586, "https://i.ytimg.com/vi_webp/G_S_1nocObg/maxresdefault.webp", ["culture"], 161, "2026-07-01"]
    ],
    6: [
      ["cmr97tqsc3isajx3hezzt3w5x", "-mnxU5g0s_Y", "《戏精导航》三款语音包随机切换 中途“掉凳”演员神救场 | 一年一度喜剧大赛 EP02 | Super Sketch Show | iQiyi精选", 358, "https://i.ytimg.com/vi_webp/-mnxU5g0s_Y/maxresdefault.webp", ["film"], 492, "2026-07-06"],
      ["cmr6emihla0y6nvs48aqwb6bk", "xzNiNQB9LLE", "【管乐 张小婉】亢奋姐妹搞笑演绎嫦娥奔月后传 月宫竟变成“好闺蜜”的乐园！ #2023河南春晚 #过年 #管乐 #张小婉", 634, "https://i.ytimg.com/vi_webp/xzNiNQB9LLE/maxresdefault.webp", ["film"], 950, "2026-07-05"],
      ["cmqmj1pzr0x7e11i8y1256k1s", "5VReJvr-Ils", "捡榴梿、ERP 2、印度考题外泄 Picking durians, ERP 2, India exam leak #茶水间三问 #早报播客", 805, "https://i.ytimg.com/vi/5VReJvr-Ils/maxresdefault.jpg", ["news"], 158, "2026-07-03"],
      ["cmr3lb6dk2llb1307pqfzfqym", "mZ6-gKdn-7U", "GPT-5.6 正式发布！Sol、Terra、Luna 三大新模型，能力全面升级！但为何不是人人都能用？| 零度解说", 516, "https://i.ytimg.com/vi_webp/mZ6-gKdn-7U/maxresdefault.webp", ["ai"], 117, "2026-07-03"],
      ["cmr3e8lgn0exf1307f4vu25e8", "jU5RI7vRvfQ", "【纯净版】EP1 学霸们正面交锋 北大VS港大VS牛津 赛制升级！末位淘汰制好残酷《令人心动的offer S5》 An Exciting Offer S5 Special", 8119, "https://i.ytimg.com/vi_webp/jU5RI7vRvfQ/maxresdefault.webp", ["business"], 428, "2026-07-02"],
      ["cmpxq3mhf3egsf544murc4r85", "V1aCPjJkaOM", "AI新股热潮：散户如何避坑入场？AI IPOs: Can retail investors get in?#理财万事通 #早报播客", 1337, "https://i.ytimg.com/vi/V1aCPjJkaOM/maxresdefault.jpg", ["news"], 1122, "2026-06-05"],
      ["cmpuys2gt0ehpawp54bdg1dve", "5Sg5VgT7InE", "新加坡冠病病例、老鼠搭地铁、许宝琨辞职 Covid-19 cases surge, rat on MRT train, Dr Koh Poh Koon resigns #茶水间三问 #早报播客", 748, "https://i.ytimg.com/vi/5Sg5VgT7InE/maxresdefault.jpg", ["news"], 324, "2026-06-04"],
      ["cmpp86jbc0hd4135l0mellh5s", "u4iPOmFd1_Y", "《繁花》之外的金宇澄：最动人的，是“望而不得” | 有客到", 1034, "https://i.ytimg.com/vi/u4iPOmFd1_Y/maxresdefault.jpg", ["news"], 351, "2026-05-31"],
      ["cmppa1nzt0sq2135l61nnx22i", "d9U17LHpA08", "[EN] 牛车水高昂租金逼退本地商家 老板：续约租金翻一倍！Chinatown Shophouse Rents Double, Forcing Out Local Businesses | 现在事", 550, "https://i.ytimg.com/vi/d9U17LHpA08/maxresdefault.jpg", ["news"], 145, "2026-05-29"],
      ["cmp9x7lm60uzc5iai2a8sya1w", "ZAJjfwdibAs", "打造年轻人的理想城市，18项具体举措“城”就美好未来 | CCTV「焦点访谈」20260515", 908, "https://i.ytimg.com/vi/ZAJjfwdibAs/maxresdefault.jpg", ["news"], 323, "2026-05-20"],
      ["cmothcg705z15beburgo7db40", "oXo04rhCs9M", "[EN] 越南政坛大洗牌 苏林开启高速增长狂想 The end of Vietnam's “four pillar”: To Lam's ultimate power grab | 世界大解说", 956, "https://i.ytimg.com/vi/oXo04rhCs9M/maxresdefault.jpg", ["news"], 994, "2026-05-08"],
      ["cmmfqqudi4t1h9fm5iw3l1cak", "36jkKi6KYUw", "【中国体育粉丝从狂热到争议】Chinese Sports Fans: From Fervor to Controversy #newyorktimes #chinesenews #学中文", 1022, "https://i.ytimg.com/vi_webp/36jkKi6KYUw/maxresdefault.webp", ["news"], 620, "2026-03-07"]
    ]
  };

  window.HSK_VIDEOS = Object.fromEntries(
    Object.entries(VIDEO_ROWS).map(([levelId, rows]) => [
      Number(levelId),
      rows.map(([id, youtubeId, title, duration, image, tags, views, createdAt]) => ({
        id,
        youtubeId,
        title,
        duration,
        image,
        tags,
        views,
        createdAt
      }))
    ])
  );
})();
