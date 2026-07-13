(function () {
  const packs = [
    {
      topic: "Cuộc sống",
      scenarios: [
        {
          title: "Chào hàng xóm buổi sáng",
          lines: [
            ["安", "早上好！你今天去上班吗？", "Zǎoshang hǎo! Nǐ jīntiān qù shàngbān ma?", "Chào buổi sáng! Hôm nay bạn đi làm không?"],
            ["明", "去，我八点出门。", "Qù, wǒ bā diǎn chūmén.", "Có, tôi ra khỏi nhà lúc tám giờ."],
            ["安", "天气有点冷，记得带外套。", "Tiānqì yǒudiǎn lěng, jìde dài wàitào.", "Trời hơi lạnh, nhớ mang áo khoác."],
            ["明", "谢谢，我马上去拿。", "Xièxie, wǒ mǎshàng qù ná.", "Cảm ơn, tôi đi lấy ngay."]
          ]
        },
        {
          title: "Hẹn ăn tối ở nhà",
          lines: [
            ["妈妈", "晚上你几点回家？", "Wǎnshang nǐ jǐ diǎn huí jiā?", "Tối nay con mấy giờ về nhà?"],
            ["安", "大概六点半。", "Dàgài liù diǎn bàn.", "Khoảng sáu rưỡi."],
            ["妈妈", "那我们七点吃饭。", "Nà wǒmen qī diǎn chīfàn.", "Vậy bảy giờ nhà mình ăn cơm."],
            ["安", "好的，我会准时回来。", "Hǎo de, wǒ huì zhǔnshí huílái.", "Vâng, con sẽ về đúng giờ."]
          ]
        },
        {
          title: "Mua đồ ở siêu thị",
          lines: [
            ["店员", "你需要买什么？", "Nǐ xūyào mǎi shénme?", "Bạn cần mua gì?"],
            ["安", "我想买牛奶和面包。", "Wǒ xiǎng mǎi niúnǎi hé miànbāo.", "Tôi muốn mua sữa và bánh mì."],
            ["店员", "牛奶在左边第二排。", "Niúnǎi zài zuǒbian dì èr pái.", "Sữa ở dãy thứ hai bên trái."],
            ["安", "谢谢，我看到了。", "Xièxie, wǒ kàn dào le.", "Cảm ơn, tôi thấy rồi."]
          ]
        },
        {
          title: "Hỏi chuyến xe buýt",
          lines: [
            ["安", "请问，去医院坐几路车？", "Qǐngwèn, qù yīyuàn zuò jǐ lù chē?", "Xin hỏi, đi bệnh viện thì đi xe số mấy?"],
            ["路人", "坐三路车，三站就到。", "Zuò sān lù chē, sān zhàn jiù dào.", "Đi xe số 3, ba trạm là tới."],
            ["安", "车站在哪里？", "Chēzhàn zài nǎlǐ?", "Trạm xe ở đâu?"],
            ["路人", "前面红绿灯右转。", "Qiánmiàn hónglǜdēng yòu zhuǎn.", "Đến đèn xanh đỏ phía trước rẽ phải."]
          ]
        },
        {
          title: "Đặt lịch khám",
          lines: [
            ["护士", "你想约哪一天？", "Nǐ xiǎng yuē nǎ yì tiān?", "Bạn muốn đặt lịch ngày nào?"],
            ["安", "我想约星期三上午。", "Wǒ xiǎng yuē xīngqīsān shàngwǔ.", "Tôi muốn đặt sáng thứ Tư."],
            ["护士", "上午九点可以吗？", "Shàngwǔ jiǔ diǎn kěyǐ ma?", "Chín giờ sáng được không?"],
            ["安", "可以，谢谢。", "Kěyǐ, xièxie.", "Được, cảm ơn."]
          ]
        },
        {
          title: "Nhận bưu phẩm",
          lines: [
            ["快递员", "你好，有你的快递。", "Nǐ hǎo, yǒu nǐ de kuàidì.", "Xin chào, có bưu phẩm của bạn."],
            ["安", "请问是谁寄来的？", "Qǐngwèn shì shéi jì lái de?", "Xin hỏi ai gửi đến vậy?"],
            ["快递员", "公司寄来的文件。", "Gōngsī jì lái de wénjiàn.", "Tài liệu công ty gửi đến."],
            ["安", "好的，我现在下楼。", "Hǎo de, wǒ xiànzài xià lóu.", "Được, tôi xuống lầu ngay."]
          ]
        },
        {
          title: "Sửa đồ trong nhà",
          lines: [
            ["师傅", "哪里需要维修？", "Nǎlǐ xūyào wéixiū?", "Chỗ nào cần sửa?"],
            ["安", "厨房的水龙头漏水。", "Chúfáng de shuǐlóngtóu lòu shuǐ.", "Vòi nước trong bếp bị rò."],
            ["师傅", "我先检查一下。", "Wǒ xiān jiǎnchá yíxià.", "Tôi kiểm tra trước một chút."],
            ["安", "麻烦你了。", "Máfan nǐ le.", "Làm phiền anh rồi."]
          ]
        },
        {
          title: "Nói chuyện với chủ nhà",
          lines: [
            ["房东", "这个月房租收到了。", "Zhège yuè fángzū shōu dào le.", "Tiền thuê tháng này tôi đã nhận được."],
            ["安", "谢谢。空调有点问题。", "Xièxie. Kōngtiáo yǒudiǎn wèntí.", "Cảm ơn. Máy lạnh hơi có vấn đề."],
            ["房东", "我明天叫人来看。", "Wǒ míngtiān jiào rén lái kàn.", "Mai tôi gọi người đến xem."],
            ["安", "太好了，谢谢。", "Tài hǎo le, xièxie.", "Tốt quá, cảm ơn."]
          ]
        },
        {
          title: "Hỏi đường trong khu phố",
          lines: [
            ["安", "附近有药店吗？", "Fùjìn yǒu yàodiàn ma?", "Gần đây có hiệu thuốc không?"],
            ["路人", "有，就在超市旁边。", "Yǒu, jiù zài chāoshì pángbiān.", "Có, ở ngay bên cạnh siêu thị."],
            ["安", "走路要多久？", "Zǒulù yào duōjiǔ?", "Đi bộ mất bao lâu?"],
            ["路人", "大约五分钟。", "Dàyuē wǔ fēnzhōng.", "Khoảng năm phút."]
          ]
        },
        {
          title: "Mượn đồ của bạn",
          lines: [
            ["安", "我可以借你的充电器吗？", "Wǒ kěyǐ jiè nǐ de chōngdiànqì ma?", "Tôi có thể mượn sạc của bạn không?"],
            ["明", "可以，你要用多久？", "Kěyǐ, nǐ yào yòng duōjiǔ?", "Được, bạn dùng bao lâu?"],
            ["安", "十分钟就好。", "Shí fēnzhōng jiù hǎo.", "Mười phút là được."],
            ["明", "没问题。", "Méi wèntí.", "Không vấn đề gì."]
          ]
        },
        {
          title: "Gọi đồ ăn mang về",
          lines: [
            ["店员", "您好，请问要点什么？", "Nín hǎo, qǐngwèn yào diǎn shénme?", "Xin chào, bạn muốn gọi gì?"],
            ["安", "我要一份牛肉面，不要辣。", "Wǒ yào yí fèn niúròu miàn, bú yào là.", "Tôi muốn một phần mì bò, không cay."],
            ["店员", "需要打包吗？", "Xūyào dǎbāo ma?", "Có cần mang đi không?"],
            ["安", "需要，谢谢。", "Xūyào, xièxie.", "Có, cảm ơn."]
          ]
        },
        {
          title: "Nhờ hỗ trợ khẩn cấp",
          lines: [
            ["安", "不好意思，我找不到手机了。", "Bù hǎoyìsi, wǒ zhǎo bú dào shǒujī le.", "Xin lỗi, tôi không tìm thấy điện thoại."],
            ["工作人员", "你最后在哪里用过？", "Nǐ zuìhòu zài nǎlǐ yòng guò?", "Lần cuối bạn dùng ở đâu?"],
            ["安", "可能在服务台附近。", "Kěnéng zài fúwùtái fùjìn.", "Có thể gần quầy dịch vụ."],
            ["工作人员", "我帮你查一下。", "Wǒ bāng nǐ chá yíxià.", "Tôi giúp bạn kiểm tra."]
          ]
        }
      ]
    },
    {
      topic: "Khách hàng",
      scenarios: [
        {
          title: "Chào khách hàng mới",
          lines: [
            ["销售", "您好，欢迎来到我们公司。", "Nín hǎo, huānyíng lái dào wǒmen gōngsī.", "Xin chào, chào mừng quý khách đến công ty chúng tôi."],
            ["客户", "你好，我想了解你们的产品。", "Nǐ hǎo, wǒ xiǎng liǎojiě nǐmen de chǎnpǐn.", "Xin chào, tôi muốn tìm hiểu sản phẩm của các bạn."],
            ["销售", "当然，我先给您介绍主要功能。", "Dāngrán, wǒ xiān gěi nín jièshào zhǔyào gōngnéng.", "Tất nhiên, tôi giới thiệu chức năng chính trước."],
            ["客户", "好的，请说。", "Hǎo de, qǐng shuō.", "Được, mời bạn nói."]
          ]
        },
        {
          title: "Xác nhận nhu cầu",
          lines: [
            ["销售", "您每个月大概需要多少数量？", "Nín měi ge yuè dàgài xūyào duōshǎo shùliàng?", "Mỗi tháng quý khách cần khoảng bao nhiêu số lượng?"],
            ["客户", "大概两千件。", "Dàgài liǎng qiān jiàn.", "Khoảng hai nghìn chiếc."],
            ["销售", "对包装有什么要求吗？", "Duì bāozhuāng yǒu shénme yāoqiú ma?", "Quý khách có yêu cầu gì về đóng gói không?"],
            ["客户", "需要英文标签。", "Xūyào Yīngwén biāoqiān.", "Cần nhãn tiếng Anh."]
          ]
        },
        {
          title: "Báo giá sản phẩm",
          lines: [
            ["客户", "这个型号多少钱？", "Zhège xínghào duōshǎo qián?", "Mẫu này giá bao nhiêu?"],
            ["销售", "单价是十二美元。", "Dānjià shì shí'èr měiyuán.", "Đơn giá là 12 đô la."],
            ["客户", "如果订五千件，有折扣吗？", "Rúguǒ dìng wǔ qiān jiàn, yǒu zhékòu ma?", "Nếu đặt 5.000 chiếc thì có giảm giá không?"],
            ["销售", "可以，我们可以给您新的报价。", "Kěyǐ, wǒmen kěyǐ gěi nín xīn de bàojià.", "Có, chúng tôi có thể gửi báo giá mới."]
          ]
        },
        {
          title: "Gửi mẫu thử",
          lines: [
            ["客户", "我可以先看样品吗？", "Wǒ kěyǐ xiān kàn yàngpǐn ma?", "Tôi có thể xem mẫu trước không?"],
            ["销售", "可以，样品今天下午寄出。", "Kěyǐ, yàngpǐn jīntiān xiàwǔ jì chū.", "Có thể, mẫu sẽ gửi chiều nay."],
            ["客户", "运费怎么算？", "Yùnfèi zěnme suàn?", "Phí vận chuyển tính thế nào?"],
            ["销售", "这次样品运费由我们承担。", "Zhè cì yàngpǐn yùnfèi yóu wǒmen chéngdān.", "Lần này phí gửi mẫu chúng tôi chịu."]
          ]
        },
        {
          title: "Xử lý khiếu nại",
          lines: [
            ["客户", "我们收到的货有几件损坏。", "Wǒmen shōu dào de huò yǒu jǐ jiàn sǔnhuài.", "Hàng chúng tôi nhận có vài chiếc bị hư."],
            ["客服", "非常抱歉，请您发照片给我们。", "Fēicháng bàoqiàn, qǐng nín fā zhàopiàn gěi wǒmen.", "Rất xin lỗi, vui lòng gửi hình cho chúng tôi."],
            ["客户", "我现在发邮件。", "Wǒ xiànzài fā yóujiàn.", "Tôi gửi email ngay."],
            ["客服", "收到后我们马上处理。", "Shōu dào hòu wǒmen mǎshàng chǔlǐ.", "Nhận được chúng tôi xử lý ngay."]
          ]
        },
        {
          title: "Thông báo giao hàng chậm",
          lines: [
            ["销售", "很抱歉，这批货可能晚两天。", "Hěn bàoqiàn, zhè pī huò kěnéng wǎn liǎng tiān.", "Rất xin lỗi, lô hàng này có thể trễ hai ngày."],
            ["客户", "原因是什么？", "Yuányīn shì shénme?", "Nguyên nhân là gì?"],
            ["销售", "原材料到厂晚了。", "Yuáncáiliào dào chǎng wǎn le.", "Nguyên liệu đến nhà máy muộn."],
            ["客户", "请给我新的交货时间。", "Qǐng gěi wǒ xīn de jiāohuò shíjiān.", "Vui lòng cho tôi thời gian giao hàng mới."]
          ]
        },
        {
          title: "Xác nhận thanh toán",
          lines: [
            ["财务", "您好，我们还没有收到尾款。", "Nín hǎo, wǒmen hái méiyǒu shōu dào wěikuǎn.", "Xin chào, chúng tôi chưa nhận được khoản thanh toán còn lại."],
            ["客户", "我今天上午已经付款了。", "Wǒ jīntiān shàngwǔ yǐjīng fùkuǎn le.", "Sáng nay tôi đã thanh toán rồi."],
            ["财务", "请发一下付款凭证。", "Qǐng fā yíxià fùkuǎn píngzhèng.", "Vui lòng gửi chứng từ thanh toán."],
            ["客户", "好的，我马上发。", "Hǎo de, wǒ mǎshàng fā.", "Được, tôi gửi ngay."]
          ]
        },
        {
          title: "Đổi lịch họp",
          lines: [
            ["客户", "明天的会议可以改到下午吗？", "Míngtiān de huìyì kěyǐ gǎi dào xiàwǔ ma?", "Cuộc họp ngày mai có thể đổi sang buổi chiều không?"],
            ["销售", "可以，下午三点方便吗？", "Kěyǐ, xiàwǔ sān diǎn fāngbiàn ma?", "Được, ba giờ chiều tiện không?"],
            ["客户", "方便。请发会议链接。", "Fāngbiàn. Qǐng fā huìyì liànjiē.", "Tiện. Vui lòng gửi link họp."],
            ["销售", "好的，我马上发给您。", "Hǎo de, wǒ mǎshàng fā gěi nín.", "Vâng, tôi gửi quý khách ngay."]
          ]
        },
        {
          title: "Hỏi tiến độ đơn hàng",
          lines: [
            ["客户", "我们的订单现在进度怎么样？", "Wǒmen de dìngdān xiànzài jìndù zěnmeyàng?", "Đơn hàng của chúng tôi hiện tiến độ thế nào?"],
            ["跟单", "已经完成百分之七十。", "Yǐjīng wánchéng bǎifēn zhī qīshí.", "Đã hoàn thành 70%."],
            ["客户", "什么时候可以验货？", "Shénme shíhou kěyǐ yànhuò?", "Khi nào có thể kiểm hàng?"],
            ["跟单", "下周二可以安排。", "Xià zhōu'èr kěyǐ ānpái.", "Thứ Ba tuần sau có thể sắp xếp."]
          ]
        },
        {
          title: "Trao đổi điều khoản hợp đồng",
          lines: [
            ["客户", "付款条件可以改成三十天吗？", "Fùkuǎn tiáojiàn kěyǐ gǎi chéng sānshí tiān ma?", "Điều kiện thanh toán có thể đổi thành 30 ngày không?"],
            ["销售", "这个需要经理确认。", "Zhège xūyào jīnglǐ quèrèn.", "Việc này cần quản lý xác nhận."],
            ["客户", "请尽快回复。", "Qǐng jǐnkuài huífù.", "Vui lòng phản hồi sớm."],
            ["销售", "没问题，今天下班前给您答复。", "Méi wèntí, jīntiān xiàbān qián gěi nín dáfù.", "Không vấn đề, trước giờ tan làm hôm nay tôi trả lời."]
          ]
        },
        {
          title: "Dịch vụ sau bán hàng",
          lines: [
            ["客户", "产品保修多久？", "Chǎnpǐn bǎoxiū duōjiǔ?", "Sản phẩm bảo hành bao lâu?"],
            ["客服", "正常保修一年。", "Zhèngcháng bǎoxiū yì nián.", "Bảo hành thông thường một năm."],
            ["客户", "如果需要配件怎么办？", "Rúguǒ xūyào pèijiàn zěnme bàn?", "Nếu cần phụ kiện thì làm sao?"],
            ["客服", "您可以联系我们，我们会安排发货。", "Nín kěyǐ liánxì wǒmen, wǒmen huì ānpái fāhuò.", "Quý khách có thể liên hệ chúng tôi, chúng tôi sẽ sắp xếp gửi hàng."]
          ]
        },
        {
          title: "Ghi nhận phản hồi",
          lines: [
            ["销售", "您对这次合作满意吗？", "Nín duì zhè cì hézuò mǎnyì ma?", "Quý khách có hài lòng với lần hợp tác này không?"],
            ["客户", "总体不错，但包装可以更好。", "Zǒngtǐ búcuò, dàn bāozhuāng kěyǐ gèng hǎo.", "Nhìn chung ổn, nhưng bao bì có thể tốt hơn."],
            ["销售", "谢谢您的建议。", "Xièxie nín de jiànyì.", "Cảm ơn góp ý của quý khách."],
            ["客户", "希望下次改进。", "Xīwàng xià cì gǎijìn.", "Hy vọng lần sau cải thiện."]
          ]
        }
      ]
    },
    {
      topic: "Nhà máy",
      scenarios: [
        {
          title: "Bàn kế hoạch sản xuất",
          lines: [
            ["主管", "今天的生产目标是多少？", "Jīntiān de shēngchǎn mùbiāo shì duōshǎo?", "Mục tiêu sản xuất hôm nay là bao nhiêu?"],
            ["组长", "目标是三千件。", "Mùbiāo shì sān qiān jiàn.", "Mục tiêu là ba nghìn chiếc."],
            ["主管", "人手够吗？", "Rénshǒu gòu ma?", "Nhân lực có đủ không?"],
            ["组长", "早班够，晚班需要两个人。", "Zǎobān gòu, wǎnbān xūyào liǎng ge rén.", "Ca sáng đủ, ca tối cần thêm hai người."]
          ]
        },
        {
          title: "Nhắc thiết bị bảo hộ",
          lines: [
            ["安全员", "进入车间必须戴安全帽。", "Jìnrù chējiān bìxū dài ānquánmào.", "Vào xưởng bắt buộc đội mũ bảo hộ."],
            ["工人", "我的手套坏了。", "Wǒ de shǒutào huài le.", "Găng tay của tôi bị hỏng."],
            ["安全员", "去仓库换一副新的。", "Qù cāngkù huàn yí fù xīn de.", "Đến kho đổi một đôi mới."],
            ["工人", "好的，我马上去。", "Hǎo de, wǒ mǎshàng qù.", "Được, tôi đi ngay."]
          ]
        },
        {
          title: "Máy bị dừng",
          lines: [
            ["工人", "这台机器突然停了。", "Zhè tái jīqì tūrán tíng le.", "Máy này đột nhiên dừng rồi."],
            ["维修", "屏幕上有什么报警？", "Píngmù shàng yǒu shénme bàojǐng?", "Trên màn hình có cảnh báo gì?"],
            ["工人", "显示温度太高。", "Xiǎnshì wēndù tài gāo.", "Hiển thị nhiệt độ quá cao."],
            ["维修", "先关机，我来检查。", "Xiān guānjī, wǒ lái jiǎnchá.", "Tắt máy trước, tôi kiểm tra."]
          ]
        },
        {
          title: "Thiếu nguyên liệu",
          lines: [
            ["组长", "这条线还缺什么材料？", "Zhè tiáo xiàn hái quē shénme cáiliào?", "Dây chuyền này còn thiếu nguyên liệu gì?"],
            ["仓库", "缺两箱螺丝。", "Quē liǎng xiāng luósī.", "Thiếu hai thùng ốc vít."],
            ["组长", "什么时候能送到？", "Shénme shíhou néng sòng dào?", "Khi nào có thể giao tới?"],
            ["仓库", "十分钟后送到车间。", "Shí fēnzhōng hòu sòng dào chējiān.", "Mười phút nữa giao tới xưởng."]
          ]
        },
        {
          title: "Kiểm tra chất lượng",
          lines: [
            ["质检", "这批产品需要全检。", "Zhè pī chǎnpǐn xūyào quán jiǎn.", "Lô sản phẩm này cần kiểm 100%."],
            ["组长", "主要检查哪些项目？", "Zhǔyào jiǎnchá nǎxiē xiàngmù?", "Chủ yếu kiểm những hạng mục nào?"],
            ["质检", "外观、尺寸和功能。", "Wàiguān, chǐcùn hé gōngnéng.", "Ngoại quan, kích thước và chức năng."],
            ["组长", "明白，我会安排人员。", "Míngbai, wǒ huì ānpái rényuán.", "Rõ, tôi sẽ sắp xếp nhân sự."]
          ]
        },
        {
          title: "Phát hiện lỗi ngoại quan",
          lines: [
            ["质检", "这里有划痕，不能出货。", "Zhèlǐ yǒu huáhén, bù néng chūhuò.", "Ở đây có vết xước, không thể xuất hàng."],
            ["工人", "需要返工吗？", "Xūyào fǎngōng ma?", "Có cần làm lại không?"],
            ["质检", "先隔离，再通知工程师。", "Xiān gélí, zài tōngzhī gōngchéngshī.", "Cách ly trước, rồi báo kỹ sư."],
            ["工人", "好的，我贴上标签。", "Hǎo de, wǒ tiē shàng biāoqiān.", "Được, tôi dán nhãn."]
          ]
        },
        {
          title: "Bàn giao ca",
          lines: [
            ["早班", "这台机器运行正常。", "Zhè tái jīqì yùnxíng zhèngcháng.", "Máy này vận hành bình thường."],
            ["晚班", "还有多少未完成？", "Hái yǒu duōshǎo wèi wánchéng?", "Còn bao nhiêu chưa hoàn thành?"],
            ["早班", "还剩五百件。", "Hái shèng wǔ bǎi jiàn.", "Còn lại năm trăm chiếc."],
            ["晚班", "好的，我会继续跟进。", "Hǎo de, wǒ huì jìxù gēnjìn.", "Được, tôi sẽ tiếp tục theo dõi."]
          ]
        },
        {
          title: "Duyệt mẫu đầu chuyền",
          lines: [
            ["工程师", "首件样品做好了吗？", "Shǒujiàn yàngpǐn zuò hǎo le ma?", "Mẫu đầu chuyền làm xong chưa?"],
            ["组长", "做好了，请确认。", "Zuò hǎo le, qǐng quèrèn.", "Xong rồi, vui lòng xác nhận."],
            ["工程师", "尺寸合格，可以开始量产。", "Chǐcùn hégé, kěyǐ kāishǐ liàngchǎn.", "Kích thước đạt, có thể bắt đầu sản xuất hàng loạt."],
            ["组长", "收到，我通知大家。", "Shōu dào, wǒ tōngzhī dàjiā.", "Đã nhận, tôi thông báo mọi người."]
          ]
        },
        {
          title: "Kho nhập hàng",
          lines: [
            ["仓库", "这批物料到了。", "Zhè pī wùliào dào le.", "Lô vật liệu này đã đến."],
            ["采购", "数量对吗？", "Shùliàng duì ma?", "Số lượng đúng không?"],
            ["仓库", "少了一箱，需要确认。", "Shǎo le yì xiāng, xūyào quèrèn.", "Thiếu một thùng, cần xác nhận."],
            ["采购", "我马上联系供应商。", "Wǒ mǎshàng liánxì gōngyìngshāng.", "Tôi liên hệ nhà cung cấp ngay."]
          ]
        },
        {
          title: "Bảo trì định kỳ",
          lines: [
            ["维修", "这台设备今天要保养。", "Zhè tái shèbèi jīntiān yào bǎoyǎng.", "Thiết bị này hôm nay cần bảo dưỡng."],
            ["主管", "需要停机多久？", "Xūyào tíngjī duōjiǔ?", "Cần dừng máy bao lâu?"],
            ["维修", "大约半个小时。", "Dàyuē bàn ge xiǎoshí.", "Khoảng nửa tiếng."],
            ["主管", "请提前通知生产线。", "Qǐng tíqián tōngzhī shēngchǎnxiàn.", "Vui lòng báo trước cho dây chuyền sản xuất."]
          ]
        },
        {
          title: "Chuẩn bị xuất hàng",
          lines: [
            ["物流", "这批货今天下午出货。", "Zhè pī huò jīntiān xiàwǔ chūhuò.", "Lô hàng này chiều nay xuất."],
            ["仓库", "包装已经完成。", "Bāozhuāng yǐjīng wánchéng.", "Đóng gói đã hoàn thành."],
            ["物流", "请把装箱单发给我。", "Qǐng bǎ zhuāngxiāngdān fā gěi wǒ.", "Vui lòng gửi packing list cho tôi."],
            ["仓库", "好的，五分钟后发。", "Hǎo de, wǔ fēnzhōng hòu fā.", "Được, năm phút nữa gửi."]
          ]
        },
        {
          title: "Báo cáo tai nạn nhỏ",
          lines: [
            ["工人", "我手指被轻轻划伤了。", "Wǒ shǒuzhǐ bèi qīngqīng huáshāng le.", "Ngón tay tôi bị xước nhẹ."],
            ["安全员", "先去医务室处理。", "Xiān qù yīwùshì chǔlǐ.", "Đến phòng y tế xử lý trước."],
            ["工人", "需要填写报告吗？", "Xūyào tiánxiě bàogào ma?", "Có cần điền báo cáo không?"],
            ["安全员", "需要，处理完我帮你记录。", "Xūyào, chǔlǐ wán wǒ bāng nǐ jìlù.", "Cần, xử lý xong tôi giúp bạn ghi lại."]
          ]
        }
      ]
    }
  ];

  const dialogueContexts = {
    "Cuộc sống": [
      { title: "Chào hàng xóm buổi sáng", speakerA: "安", speakerB: "明", focusZh: "上班", focusPy: "shàngbān", focusVi: "việc đi làm", needZh: "去上班", needPy: "qù shàngbān", needVi: "đi làm", answerZh: "今天八点出门", answerPy: "jīntiān bā diǎn chūmén", answerVi: "hôm nay tám giờ ra khỏi nhà", requestZh: "带外套", requestPy: "dài wàitào", requestVi: "mang áo khoác" },
      { title: "Hẹn ăn tối ở nhà", speakerA: "妈妈", speakerB: "安", focusZh: "晚饭", focusPy: "wǎnfàn", focusVi: "bữa tối", needZh: "吃晚饭", needPy: "chī wǎnfàn", needVi: "ăn tối", answerZh: "七点可以吃饭", answerPy: "qī diǎn kěyǐ chīfàn", answerVi: "bảy giờ có thể ăn cơm", requestZh: "确认七点吃饭", requestPy: "quèrèn qī diǎn chīfàn", requestVi: "xác nhận ăn lúc bảy giờ" },
      { title: "Mua đồ ở siêu thị", speakerA: "安", speakerB: "店员", focusZh: "牛奶和面包", focusPy: "niúnǎi hé miànbāo", focusVi: "sữa và bánh mì", needZh: "买牛奶和面包", needPy: "mǎi niúnǎi hé miànbāo", needVi: "mua sữa và bánh mì", answerZh: "它们在左边第二排", answerPy: "tāmen zài zuǒbian dì èr pái", answerVi: "chúng ở dãy thứ hai bên trái", requestZh: "看一下价格", requestPy: "kàn yíxià jiàgé", requestVi: "xem giá" },
      { title: "Hỏi chuyến xe buýt", speakerA: "安", speakerB: "路人", focusZh: "去医院的车", focusPy: "qù yīyuàn de chē", focusVi: "xe đi bệnh viện", needZh: "去医院", needPy: "qù yīyuàn", needVi: "đi bệnh viện", answerZh: "坐三路车三站就到", answerPy: "zuò sān lù chē sān zhàn jiù dào", answerVi: "đi xe số 3, ba trạm là tới", requestZh: "告诉我车站在哪里", requestPy: "gàosu wǒ chēzhàn zài nǎlǐ", requestVi: "chỉ trạm xe ở đâu" },
      { title: "Đặt lịch khám", speakerA: "安", speakerB: "护士", focusZh: "看医生的时间", focusPy: "kàn yīshēng de shíjiān", focusVi: "giờ khám bệnh", needZh: "看医生", needPy: "kàn yīshēng", needVi: "đi khám", answerZh: "星期三上午九点可以", answerPy: "xīngqīsān shàngwǔ jiǔ diǎn kěyǐ", answerVi: "sáng thứ Tư chín giờ được", requestZh: "帮我预约", requestPy: "bāng wǒ yùyuē", requestVi: "giúp tôi đặt lịch" },
      { title: "Nhận bưu phẩm", speakerA: "安", speakerB: "快递员", focusZh: "快递", focusPy: "kuàidì", focusVi: "bưu phẩm", needZh: "拿快递", needPy: "ná kuàidì", needVi: "nhận bưu phẩm", answerZh: "快递在楼下", answerPy: "kuàidì zài lóuxià", answerVi: "bưu phẩm ở dưới lầu", requestZh: "发取件码", requestPy: "fā qǔjiànmǎ", requestVi: "gửi mã nhận hàng" },
      { title: "Sửa đồ trong nhà", speakerA: "安", speakerB: "师傅", focusZh: "水龙头", focusPy: "shuǐlóngtóu", focusVi: "vòi nước", needZh: "修水龙头", needPy: "xiū shuǐlóngtóu", needVi: "sửa vòi nước", answerZh: "师傅明天上午来", answerPy: "shīfu míngtiān shàngwǔ lái", answerVi: "thợ sẽ tới sáng mai", requestZh: "先检查厨房", requestPy: "xiān jiǎnchá chúfáng", requestVi: "kiểm tra bếp trước" },
      { title: "Nói chuyện với chủ nhà", speakerA: "安", speakerB: "房东", focusZh: "空调问题", focusPy: "kōngtiáo wèntí", focusVi: "vấn đề máy lạnh", needZh: "找房东", needPy: "zhǎo fángdōng", needVi: "tìm chủ nhà", answerZh: "房东明天找人来看", answerPy: "fángdōng míngtiān zhǎo rén lái kàn", answerVi: "chủ nhà mai gọi người đến xem", requestZh: "告诉我维修时间", requestPy: "gàosu wǒ wéixiū shíjiān", requestVi: "báo thời gian sửa" },
      { title: "Hỏi đường đến hiệu thuốc", speakerA: "安", speakerB: "路人", focusZh: "药店", focusPy: "yàodiàn", focusVi: "hiệu thuốc", needZh: "去药店", needPy: "qù yàodiàn", needVi: "đi hiệu thuốc", answerZh: "药店在超市旁边", answerPy: "yàodiàn zài chāoshì pángbiān", answerVi: "hiệu thuốc ở cạnh siêu thị", requestZh: "告诉我怎么走", requestPy: "gàosu wǒ zěnme zǒu", requestVi: "chỉ đường đi" },
      { title: "Mượn đồ của bạn", speakerA: "安", speakerB: "明", focusZh: "充电器", focusPy: "chōngdiànqì", focusVi: "sạc điện thoại", needZh: "借充电器", needPy: "jiè chōngdiànqì", needVi: "mượn sạc", answerZh: "可以借十分钟", answerPy: "kěyǐ jiè shí fēnzhōng", answerVi: "có thể mượn mười phút", requestZh: "用完还给我", requestPy: "yòng wán huán gěi wǒ", requestVi: "dùng xong trả lại" },
      { title: "Gọi đồ ăn mang về", speakerA: "安", speakerB: "店员", focusZh: "牛肉面", focusPy: "niúròu miàn", focusVi: "mì bò", needZh: "点牛肉面", needPy: "diǎn niúròu miàn", needVi: "gọi mì bò", answerZh: "十分钟后做好", answerPy: "shí fēnzhōng hòu zuò hǎo", answerVi: "mười phút nữa làm xong", requestZh: "不要放辣", requestPy: "bú yào fàng là", requestVi: "không bỏ cay" },
      { title: "Nhờ hỗ trợ khẩn cấp", speakerA: "安", speakerB: "工作人员", focusZh: "手机", focusPy: "shǒujī", focusVi: "điện thoại", needZh: "找手机", needPy: "zhǎo shǒujī", needVi: "tìm điện thoại", answerZh: "服务台可以帮你查", answerPy: "fúwùtái kěyǐ bāng nǐ chá", answerVi: "quầy dịch vụ có thể giúp kiểm tra", requestZh: "描述最后使用地点", requestPy: "miáoshù zuìhòu shǐyòng dìdiǎn", requestVi: "mô tả nơi dùng cuối cùng" }
    ],
    "Khách hàng": [
      { title: "Chào khách hàng mới", speakerA: "客户", speakerB: "销售", focusZh: "产品功能", focusPy: "chǎnpǐn gōngnéng", focusVi: "chức năng sản phẩm", needZh: "了解产品", needPy: "liǎojiě chǎnpǐn", needVi: "tìm hiểu sản phẩm", answerZh: "主要功能有三项", answerPy: "zhǔyào gōngnéng yǒu sān xiàng", answerVi: "có ba chức năng chính", requestZh: "介绍一下", requestPy: "jièshào yíxià", requestVi: "giới thiệu một chút" },
      { title: "Xác nhận nhu cầu", speakerA: "客户", speakerB: "销售", focusZh: "订单数量", focusPy: "dìngdān shùliàng", focusVi: "số lượng đơn hàng", needZh: "确认数量", needPy: "quèrèn shùliàng", needVi: "xác nhận số lượng", answerZh: "每月可以做两千件", answerPy: "měi yuè kěyǐ zuò liǎng qiān jiàn", answerVi: "mỗi tháng có thể làm hai nghìn cái", requestZh: "写在需求表里", requestPy: "xiě zài xūqiú biǎo lǐ", requestVi: "ghi vào bảng yêu cầu" },
      { title: "Báo giá sản phẩm", speakerA: "客户", speakerB: "销售", focusZh: "产品价格", focusPy: "chǎnpǐn jiàgé", focusVi: "giá sản phẩm", needZh: "问价格", needPy: "wèn jiàgé", needVi: "hỏi giá", answerZh: "单价是十二美元", answerPy: "dānjià shì shí'èr měiyuán", answerVi: "đơn giá là 12 đô la", requestZh: "给我报价单", requestPy: "gěi wǒ bàojiàdān", requestVi: "gửi báo giá cho tôi" },
      { title: "Gửi mẫu thử", speakerA: "客户", speakerB: "销售", focusZh: "样品", focusPy: "yàngpǐn", focusVi: "mẫu thử", needZh: "看样品", needPy: "kàn yàngpǐn", needVi: "xem mẫu", answerZh: "样品今天下午寄出", answerPy: "yàngpǐn jīntiān xiàwǔ jì chū", answerVi: "mẫu sẽ gửi chiều nay", requestZh: "发快递单号", requestPy: "fā kuàidì dānhào", requestVi: "gửi mã vận đơn" },
      { title: "Xử lý khiếu nại", speakerA: "客户", speakerB: "客服", focusZh: "损坏的货", focusPy: "sǔnhuài de huò", focusVi: "hàng bị hư", needZh: "反馈问题", needPy: "fǎnkuì wèntí", needVi: "phản hồi vấn đề", answerZh: "我们会马上处理", answerPy: "wǒmen huì mǎshàng chǔlǐ", answerVi: "chúng tôi sẽ xử lý ngay", requestZh: "发照片给我们", requestPy: "fā zhàopiàn gěi wǒmen", requestVi: "gửi ảnh cho chúng tôi" },
      { title: "Thông báo giao hàng chậm", speakerA: "客户", speakerB: "销售", focusZh: "交货时间", focusPy: "jiāohuò shíjiān", focusVi: "thời gian giao hàng", needZh: "确认交期", needPy: "quèrèn jiāoqī", needVi: "xác nhận lịch giao", answerZh: "这批货会晚两天", answerPy: "zhè pī huò huì wǎn liǎng tiān", answerVi: "lô này sẽ trễ hai ngày", requestZh: "给新的计划", requestPy: "gěi xīn de jìhuà", requestVi: "đưa kế hoạch mới" },
      { title: "Xác nhận thanh toán", speakerA: "客户", speakerB: "财务", focusZh: "付款凭证", focusPy: "fùkuǎn píngzhèng", focusVi: "chứng từ thanh toán", needZh: "确认付款", needPy: "quèrèn fùkuǎn", needVi: "xác nhận thanh toán", answerZh: "财务还在核对", answerPy: "cáiwù hái zài héduì", answerVi: "tài chính vẫn đang đối chiếu", requestZh: "发付款水单", requestPy: "fā fùkuǎn shuǐdān", requestVi: "gửi giấy chuyển tiền" },
      { title: "Đổi lịch họp", speakerA: "客户", speakerB: "销售", focusZh: "会议时间", focusPy: "huìyì shíjiān", focusVi: "thời gian họp", needZh: "改会议", needPy: "gǎi huìyì", needVi: "đổi lịch họp", answerZh: "明天下午三点方便", answerPy: "míngtiān xiàwǔ sān diǎn fāngbiàn", answerVi: "ba giờ chiều mai thuận tiện", requestZh: "发会议链接", requestPy: "fā huìyì liànjiē", requestVi: "gửi link họp" },
      { title: "Hỏi tiến độ đơn hàng", speakerA: "客户", speakerB: "跟单", focusZh: "订单进度", focusPy: "dìngdān jìndù", focusVi: "tiến độ đơn hàng", needZh: "看进度", needPy: "kàn jìndù", needVi: "xem tiến độ", answerZh: "订单完成了百分之七十", answerPy: "dìngdān wánchéng le bǎifēn zhī qīshí", answerVi: "đơn hàng đã hoàn thành 70%", requestZh: "安排验货", requestPy: "ānpái yànhuò", requestVi: "sắp xếp kiểm hàng" },
      { title: "Trao đổi điều khoản hợp đồng", speakerA: "客户", speakerB: "销售", focusZh: "付款条件", focusPy: "fùkuǎn tiáojiàn", focusVi: "điều kiện thanh toán", needZh: "谈合同", needPy: "tán hétong", needVi: "trao đổi hợp đồng", answerZh: "需要经理确认", answerPy: "xūyào jīnglǐ quèrèn", answerVi: "cần quản lý xác nhận", requestZh: "今天回复", requestPy: "jīntiān huífù", requestVi: "phản hồi hôm nay" },
      { title: "Dịch vụ sau bán hàng", speakerA: "客户", speakerB: "客服", focusZh: "保修服务", focusPy: "bǎoxiū fúwù", focusVi: "dịch vụ bảo hành", needZh: "问保修", needPy: "wèn bǎoxiū", needVi: "hỏi bảo hành", answerZh: "正常保修一年", answerPy: "zhèngcháng bǎoxiū yì nián", answerVi: "bảo hành thông thường một năm", requestZh: "提供配件清单", requestPy: "tígōng pèijiàn qīngdān", requestVi: "cung cấp danh sách phụ kiện" },
      { title: "Ghi nhận phản hồi", speakerA: "客户", speakerB: "客服", focusZh: "客户反馈", focusPy: "kèhù fǎnkuì", focusVi: "phản hồi khách hàng", needZh: "提建议", needPy: "tí jiànyì", needVi: "góp ý", answerZh: "我们会记录并改进", answerPy: "wǒmen huì jìlù bìng gǎijìn", answerVi: "chúng tôi sẽ ghi nhận và cải tiến", requestZh: "发给产品团队", requestPy: "fā gěi chǎnpǐn tuánduì", requestVi: "gửi cho nhóm sản phẩm" }
    ],
    "Nhà máy": [
      { title: "Mở dây chuyền sản xuất", speakerA: "组长", speakerB: "工人", focusZh: "生产线", focusPy: "shēngchǎnxiàn", focusVi: "dây chuyền sản xuất", needZh: "开线", needPy: "kāi xiàn", needVi: "mở chuyền", answerZh: "生产线已经准备好", answerPy: "shēngchǎnxiàn yǐjīng zhǔnbèi hǎo", answerVi: "dây chuyền đã chuẩn bị xong", requestZh: "检查设备", requestPy: "jiǎnchá shèbèi", requestVi: "kiểm tra thiết bị" },
      { title: "Lấy vật liệu", speakerA: "组长", speakerB: "仓库", focusZh: "物料", focusPy: "wùliào", focusVi: "vật liệu", needZh: "拿物料", needPy: "ná wùliào", needVi: "lấy vật liệu", answerZh: "物料在仓库A区", answerPy: "wùliào zài cāngkù A qū", answerVi: "vật liệu ở khu A kho", requestZh: "确认批号", requestPy: "quèrèn pīhào", requestVi: "xác nhận số lô" },
      { title: "Báo máy lỗi", speakerA: "工人", speakerB: "维修", focusZh: "机器故障", focusPy: "jīqì gùzhàng", focusVi: "lỗi máy", needZh: "修机器", needPy: "xiū jīqì", needVi: "sửa máy", answerZh: "维修马上过来", answerPy: "wéixiū mǎshàng guòlái", answerVi: "bảo trì sẽ tới ngay", requestZh: "先停机", requestPy: "xiān tíngjī", requestVi: "dừng máy trước" },
      { title: "Kiểm tra chất lượng", speakerA: "组长", speakerB: "质检", focusZh: "质量检查", focusPy: "zhìliàng jiǎnchá", focusVi: "kiểm tra chất lượng", needZh: "检查质量", needPy: "jiǎnchá zhìliàng", needVi: "kiểm tra chất lượng", answerZh: "外观和尺寸都要看", answerPy: "wàiguān hé chǐcùn dōu yào kàn", answerVi: "ngoại quan và kích thước đều cần xem", requestZh: "填写记录", requestPy: "tiánxiě jìlù", requestVi: "điền hồ sơ" },
      { title: "Phát hiện lỗi ngoại quan", speakerA: "质检", speakerB: "工人", focusZh: "外观划痕", focusPy: "wàiguān huáhén", focusVi: "vết xước ngoại quan", needZh: "报告划痕", needPy: "bàogào huáhén", needVi: "báo vết xước", answerZh: "需要隔离这批产品", answerPy: "xūyào gélí zhè pī chǎnpǐn", answerVi: "cần cách ly lô sản phẩm này", requestZh: "贴红色标签", requestPy: "tiē hóngsè biāoqiān", requestVi: "dán nhãn đỏ" },
      { title: "Bàn giao ca", speakerA: "早班", speakerB: "晚班", focusZh: "交接班", focusPy: "jiāojiēbān", focusVi: "bàn giao ca", needZh: "交接工作", needPy: "jiāojiē gōngzuò", needVi: "bàn giao công việc", answerZh: "机器运行正常", answerPy: "jīqì yùnxíng zhèngcháng", answerVi: "máy vận hành bình thường", requestZh: "说明剩余数量", requestPy: "shuōmíng shèngyú shùliàng", requestVi: "nói rõ số lượng còn lại" },
      { title: "Duyệt mẫu đầu chuyền", speakerA: "工程师", speakerB: "组长", focusZh: "首件样品", focusPy: "shǒujiàn yàngpǐn", focusVi: "mẫu đầu chuyền", needZh: "确认样品", needPy: "quèrèn yàngpǐn", needVi: "xác nhận mẫu", answerZh: "尺寸已经合格", answerPy: "chǐcùn yǐjīng hégé", answerVi: "kích thước đã đạt", requestZh: "通知大家量产", requestPy: "tōngzhī dàjiā liàngchǎn", requestVi: "báo mọi người sản xuất hàng loạt" },
      { title: "Kho nhập hàng", speakerA: "采购", speakerB: "仓库", focusZh: "入库数量", focusPy: "rùkù shùliàng", focusVi: "số lượng nhập kho", needZh: "入库", needPy: "rùkù", needVi: "nhập kho", answerZh: "少了一箱物料", answerPy: "shǎo le yì xiāng wùliào", answerVi: "thiếu một thùng vật liệu", requestZh: "联系供应商", requestPy: "liánxì gōngyìngshāng", requestVi: "liên hệ nhà cung cấp" },
      { title: "Bảo trì định kỳ", speakerA: "主管", speakerB: "维修", focusZh: "设备保养", focusPy: "shèbèi bǎoyǎng", focusVi: "bảo dưỡng thiết bị", needZh: "做保养", needPy: "zuò bǎoyǎng", needVi: "làm bảo dưỡng", answerZh: "需要停机半小时", answerPy: "xūyào tíngjī bàn xiǎoshí", answerVi: "cần dừng máy nửa tiếng", requestZh: "提前通知产线", requestPy: "tíqián tōngzhī chǎnxiàn", requestVi: "báo trước cho chuyền" },
      { title: "Chuẩn bị xuất hàng", speakerA: "物流", speakerB: "仓库", focusZh: "出货安排", focusPy: "chūhuò ānpái", focusVi: "sắp xếp xuất hàng", needZh: "准备出货", needPy: "zhǔnbèi chūhuò", needVi: "chuẩn bị xuất hàng", answerZh: "包装已经完成", answerPy: "bāozhuāng yǐjīng wánchéng", answerVi: "đóng gói đã hoàn thành", requestZh: "发送装箱单", requestPy: "fāsòng zhuāngxiāngdān", requestVi: "gửi packing list" },
      { title: "Báo cáo tai nạn nhỏ", speakerA: "工人", speakerB: "安全员", focusZh: "安全事故", focusPy: "ānquán shìgù", focusVi: "sự cố an toàn", needZh: "报告受伤", needPy: "bàogào shòushāng", needVi: "báo bị thương", answerZh: "先去医务室处理", answerPy: "xiān qù yīwùshì chǔlǐ", answerVi: "đến phòng y tế xử lý trước", requestZh: "填写事故报告", requestPy: "tiánxiě shìgù bàogào", requestVi: "điền báo cáo sự cố" },
      { title: "Sắp xếp nhân sự tăng ca", speakerA: "主管", speakerB: "组长", focusZh: "人手安排", focusPy: "rénshǒu ānpái", focusVi: "sắp xếp nhân sự", needZh: "安排人手", needPy: "ānpái rénshǒu", needVi: "sắp xếp người", answerZh: "晚上需要两个人加班", answerPy: "wǎnshang xūyào liǎng ge rén jiābān", answerVi: "tối cần hai người tăng ca", requestZh: "确认名单", requestPy: "quèrèn míngdān", requestVi: "xác nhận danh sách" }
    ]
  };

  const levelTemplates = {
    1(context) {
      return [
        [context.speakerA, `你好，我想${context.needZh}。`, `Nǐ hǎo, wǒ xiǎng ${context.needPy}.`, `Xin chào, tôi muốn ${context.needVi}.`],
        [context.speakerB, "好的。", "Hǎo de.", "Được."],
        [context.speakerA, "谢谢。", "Xièxie.", "Cảm ơn."],
        [context.speakerB, "不客气。", "Bú kèqi.", "Không có gì."]
      ];
    },
    2(context) {
      return [
        [context.speakerA, `你好，我想问一下${context.focusZh}。`, `Nǐ hǎo, wǒ xiǎng wèn yíxià ${context.focusPy}.`, `Xin chào, tôi muốn hỏi về ${context.focusVi}.`],
        [context.speakerB, `${context.answerZh}。`, `${context.answerPy}.`, `${context.answerVi}.`],
        [context.speakerA, `可以${context.requestZh}吗？`, `Kěyǐ ${context.requestPy} ma?`, `Có thể ${context.requestVi} không?`],
        [context.speakerB, "可以，我现在帮你。", "Kěyǐ, wǒ xiànzài bāng nǐ.", "Được, tôi giúp bạn ngay."]
      ];
    },
    3(context) {
      return [
        [context.speakerA, `我想确认一下${context.focusZh}，因为今天要用。`, `Wǒ xiǎng quèrèn yíxià ${context.focusPy}, yīnwèi jīntiān yào yòng.`, `Tôi muốn xác nhận ${context.focusVi}, vì hôm nay cần dùng.`],
        [context.speakerB, `${context.answerZh}，请先${context.requestZh}。`, `${context.answerPy}, qǐng xiān ${context.requestPy}.`, `${context.answerVi}, vui lòng ${context.requestVi} trước.`],
        [context.speakerA, "需要多长时间？", "Xūyào duō cháng shíjiān?", "Cần bao lâu?"],
        [context.speakerB, "大概半个小时，我们会通知你。", "Dàgài bàn ge xiǎoshí, wǒmen huì tōngzhī nǐ.", "Khoảng nửa tiếng, chúng tôi sẽ báo cho bạn."]
      ];
    },
    4(context) {
      return [
        [context.speakerA, `关于${context.focusZh}，我想确认安排、时间和负责人。`, `Guānyú ${context.focusPy}, wǒ xiǎng quèrèn ānpái, shíjiān hé fùzérén.`, `Về ${context.focusVi}, tôi muốn xác nhận sắp xếp, thời gian và người phụ trách.`],
        [context.speakerB, `${context.answerZh}，目前没有大问题。`, `${context.answerPy}, mùqián méiyǒu dà wèntí.`, `${context.answerVi}, hiện tại không có vấn đề lớn.`],
        [context.speakerA, "如果有变化，请马上告诉我。", "Rúguǒ yǒu biànhuà, qǐng mǎshàng gàosu wǒ.", "Nếu có thay đổi, vui lòng báo ngay cho tôi."],
        [context.speakerB, "好的，我会记录并跟进。", "Hǎo de, wǒ huì jìlù bìng gēnjìn.", "Được, tôi sẽ ghi lại và theo dõi."]
      ];
    },
    5(context) {
      return [
        [context.speakerA, `为了避免影响后面的安排，我想提前确认${context.focusZh}的细节。`, `Wèile bìmiǎn yǐngxiǎng hòumiàn de ānpái, wǒ xiǎng tíqián quèrèn ${context.focusPy} de xìjié.`, `Để tránh ảnh hưởng lịch phía sau, tôi muốn xác nhận trước chi tiết về ${context.focusVi}.`],
        [context.speakerB, `${context.answerZh}，但还需要和相关人员核对。`, `${context.answerPy}, dàn hái xūyào hé xiāngguān rényuán héduì.`, `${context.answerVi}, nhưng vẫn cần đối chiếu với người liên quan.`],
        [context.speakerA, "请把结果和风险点一起发给我。", "Qǐng bǎ jiéguǒ hé fēngxiǎn diǎn yìqǐ fā gěi wǒ.", "Vui lòng gửi kết quả kèm các điểm rủi ro cho tôi."],
        [context.speakerB, "明白，我会整理后邮件回复。", "Míngbai, wǒ huì zhěnglǐ hòu yóujiàn huífù.", "Rõ, tôi sẽ tổng hợp rồi phản hồi qua email."]
      ];
    },
    6(context) {
      return [
        [context.speakerA, `考虑到交期、成本和责任划分，我们需要重新评估${context.focusZh}。`, `Kǎolǜ dào jiāoqī, chéngběn hé zérèn huàfēn, wǒmen xūyào chóngxīn pínggū ${context.focusPy}.`, `Xét tới giao kỳ, chi phí và phân chia trách nhiệm, chúng ta cần đánh giá lại ${context.focusVi}.`],
        [context.speakerB, `${context.answerZh}，同时存在一些需要协调的细节。`, `${context.answerPy}, tóngshí cúnzài yìxiē xūyào xiétiáo de xìjié.`, `${context.answerVi}, đồng thời vẫn có vài chi tiết cần phối hợp.`],
        [context.speakerA, "请准备数据、原因分析和可执行方案。", "Qǐng zhǔnbèi shùjù, yuányīn fēnxī hé kě zhíxíng fāng'àn.", "Vui lòng chuẩn bị dữ liệu, phân tích nguyên nhân và phương án khả thi."],
        [context.speakerB, "我会汇总各方意见，今天下班前提交。", "Wǒ huì huìzǒng gèfāng yìjiàn, jīntiān xiàbān qián tíjiāo.", "Tôi sẽ tổng hợp ý kiến các bên và nộp trước giờ tan làm hôm nay."]
      ];
    }
  };

  window.HSK_LEVELS = (window.HSK_LEVELS || []).map((level) => {
    const makeLines = levelTemplates[level.id] || levelTemplates[1];
    const dialogues = Object.entries(dialogueContexts).flatMap(([topic, contexts]) =>
      contexts.map((context, index) => ({
        title: `${level.title} · ${context.title}`,
        topic,
        youtubeQuery: `HSK ${level.id} ${topic} Chinese dialogue ${context.title}`,
        levelId: level.id,
        scenarioId: `${level.id}-${topic}-${index + 1}`,
        lines: makeLines(context)
      }))
    );

    return { ...level, dialogues };
  });
})();
