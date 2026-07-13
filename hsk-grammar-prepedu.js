(function () {
  const makeGrammar = ([id, title, structure, note, examples, question, options, answer]) => ({
    id,
    title,
    structure,
    note,
    examples,
    quiz: { question, options, answer }
  });

  const extraGrammar = {
    1: [
      [
        "hsk1-personal-pronouns",
        "Đại từ nhân xưng",
        "我 / 你 / 您 / 他 / 她 / 它 / 我们 / 他们...",
        "Dùng để gọi người nói, người nghe, người được nhắc đến hoặc đồ vật/con vật.",
        [
          ["我是工人。", "Wǒ shì gōngrén.", "Tôi là công nhân."],
          ["她是我的朋友。", "Tā shì wǒ de péngyou.", "Cô ấy là bạn của tôi."]
        ],
        "Đại từ nào dùng lịch sự để gọi 'bạn/ngài'?",
        ["您", "我", "它"],
        0
      ],
      [
        "hsk1-question-pronouns",
        "Đại từ nghi vấn",
        "谁 / 什么 / 哪儿 / 怎么 / 为什么",
        "Dùng để hỏi người, sự vật, địa điểm, cách thức hoặc lý do.",
        [
          ["你叫什么名字？", "Nǐ jiào shénme míngzi?", "Bạn tên là gì?"],
          ["经理在哪儿？", "Jīnglǐ zài nǎr?", "Quản lý ở đâu?"]
        ],
        "Muốn hỏi 'ai' dùng từ nào?",
        ["谁", "什么", "哪儿"],
        0
      ],
      [
        "hsk1-demonstratives",
        "Đại từ chỉ thị",
        "这 / 那 / 这儿 / 那儿 + danh từ/động từ",
        "Dùng để chỉ cái này/cái kia, chỗ này/chỗ kia.",
        [
          ["这是我的手机。", "Zhè shì wǒ de shǒujī.", "Đây là điện thoại của tôi."],
          ["那儿有很多人。", "Nàr yǒu hěn duō rén.", "Chỗ kia có rất nhiều người."]
        ],
        "Từ nào nghĩa là 'cái kia/đó'?",
        ["那", "这", "谁"],
        0
      ],
      [
        "hsk1-degree-adverbs",
        "Phó từ mức độ 很 / 太...了",
        "很 + tính từ; 太 + tính từ + 了",
        "很 nói mức độ 'rất'; 太...了 thường nhấn mạnh 'quá... rồi'.",
        [
          ["今天很热。", "Jīntiān hěn rè.", "Hôm nay rất nóng."],
          ["这个箱子太重了。", "Zhège xiāngzi tài zhòng le.", "Cái thùng này nặng quá rồi."]
        ],
        "Cấu trúc nào diễn đạt 'quá đắt rồi'?",
        ["太贵了", "很贵吗", "贵不贵"],
        0
      ],
      [
        "hsk1-dou",
        "Phó từ phạm vi 都",
        "Chủ ngữ số nhiều + 都 + vị ngữ",
        "都 nghĩa là đều, dùng khi nói tất cả người/vật trong nhóm cùng có đặc điểm hoặc hành động.",
        [
          ["我们都是学生。", "Wǒmen dōu shì xuéshēng.", "Chúng tôi đều là học sinh."],
          ["这些产品都很好。", "Zhèxiē chǎnpǐn dōu hěn hǎo.", "Những sản phẩm này đều rất tốt."]
        ],
        "都 thường đặt ở đâu?",
        ["Sau chủ ngữ và trước vị ngữ", "Cuối câu", "Trước lượng từ"],
        0
      ],
      [
        "hsk1-number-measure",
        "Số lượng + lượng từ + danh từ",
        "Số + lượng từ + danh từ",
        "Tiếng Trung thường cần lượng từ giữa số và danh từ.",
        [
          ["我买了三个苹果。", "Wǒ mǎi le sān ge píngguǒ.", "Tôi đã mua ba quả táo."],
          ["桌子上有一本书。", "Zhuōzi shàng yǒu yì běn shū.", "Trên bàn có một quyển sách."]
        ],
        "Cụm nào đúng với 'một quyển sách'?",
        ["一本书", "一书", "一个书"],
        0
      ]
    ],
    2: [
      [
        "hsk2-ci",
        "Lượng từ 次",
        "Số + 次",
        "次 dùng để đếm số lần xảy ra của một hành động.",
        [
          ["我去过中国两次。", "Wǒ qùguò Zhōngguó liǎng cì.", "Tôi đã từng đến Trung Quốc hai lần."],
          ["请再检查一次。", "Qǐng zài jiǎnchá yí cì.", "Vui lòng kiểm tra lại một lần nữa."]
        ],
        "Muốn nói 'ba lần' dùng cụm nào?",
        ["三次", "三个", "三本"],
        0
      ],
      [
        "hsk2-danshi",
        "Liên từ 但是",
        "Mệnh đề A, 但是 + mệnh đề B",
        "Dùng để nối hai ý trái chiều hoặc chuyển hướng ý.",
        [
          ["这个产品很好，但是价格有点高。", "Zhège chǎnpǐn hěn hǎo, dànshì jiàgé yǒudiǎn gāo.", "Sản phẩm này rất tốt nhưng giá hơi cao."],
          ["他很忙，但是每天都学习中文。", "Tā hěn máng, dànshì měitiān dōu xuéxí Zhōngwén.", "Anh ấy rất bận nhưng ngày nào cũng học tiếng Trung."]
        ],
        "但是 dùng để biểu thị quan hệ gì?",
        ["Chuyển ý/trái chiều", "Nguyên nhân", "Sở hữu"],
        0
      ],
      [
        "hsk2-verb-reduplication",
        "Động từ trùng điệp",
        "A-A / A一A / ABAB",
        "Làm giọng nói nhẹ hơn, thường mang nghĩa làm thử/làm một chút.",
        [
          ["你看一看这个样品。", "Nǐ kàn yi kàn zhège yàngpǐn.", "Bạn xem thử mẫu này một chút."],
          ["我们休息休息吧。", "Wǒmen xiūxi xiūxi ba.", "Chúng ta nghỉ một lát đi."]
        ],
        "看一看 thường mang sắc thái gì?",
        ["Xem thử một chút", "Không xem", "Đã xem xong từ lâu"],
        0
      ],
      [
        "hsk2-haishi",
        "Câu hỏi lựa chọn với 还是",
        "A 还是 B?",
        "Dùng trong câu hỏi để yêu cầu chọn một trong hai hoặc nhiều lựa chọn.",
        [
          ["你喝茶还是咖啡？", "Nǐ hē chá háishi kāfēi?", "Bạn uống trà hay cà phê?"],
          ["明天上午开会还是下午开会？", "Míngtiān shàngwǔ kāihuì háishi xiàwǔ kāihuì?", "Ngày mai họp buổi sáng hay buổi chiều?"]
        ],
        "还是 thường dùng trong loại câu nào?",
        ["Câu hỏi lựa chọn", "Câu phủ định", "Câu mệnh lệnh"],
        0
      ],
      [
        "hsk2-cong-dao",
        "Từ... đến... 从...到...",
        "从 + điểm bắt đầu + 到 + điểm kết thúc",
        "Dùng cho thời gian, địa điểm hoặc phạm vi.",
        [
          ["我从家到公司要二十分钟。", "Wǒ cóng jiā dào gōngsī yào èrshí fēnzhōng.", "Từ nhà đến công ty tôi mất hai mươi phút."],
          ["会议从九点到十点。", "Huìyì cóng jiǔ diǎn dào shí diǎn.", "Cuộc họp từ chín giờ đến mười giờ."]
        ],
        "从...到... dùng để nói gì?",
        ["Điểm bắt đầu đến điểm kết thúc", "So sánh hơn", "Câu hỏi có/không"],
        0
      ],
      [
        "hsk2-mei-dou",
        "Mỗi... đều... 每...都...",
        "每 + danh từ/lượng từ + 都 + vị ngữ",
        "Nhấn mạnh mọi thành viên trong một nhóm đều như nhau.",
        [
          ["每个员工都要戴工牌。", "Měi ge yuángōng dōu yào dài gōngpái.", "Mỗi nhân viên đều phải đeo thẻ."],
          ["我们每天都练习听力。", "Wǒmen měitiān dōu liànxí tīnglì.", "Chúng tôi luyện nghe mỗi ngày."]
        ],
        "每...都... nhấn mạnh điều gì?",
        ["Mỗi/tất cả đều như vậy", "Chỉ một người", "Không có ai"],
        0
      ]
    ],
    3: [
      [
        "hsk3-guanyu",
        "Dẫn chủ đề với 关于",
        "关于 + danh từ/cụm danh từ",
        "Dùng để giới thiệu phạm vi hoặc chủ đề đang nói tới.",
        [
          ["关于这个订单，我想再确认一下。", "Guānyú zhège dìngdān, wǒ xiǎng zài quèrèn yíxià.", "Về đơn hàng này, tôi muốn xác nhận lại một chút."],
          ["关于学习计划，我们明天再谈。", "Guānyú xuéxí jìhuà, wǒmen míngtiān zài tán.", "Về kế hoạch học tập, ngày mai chúng ta nói tiếp."]
        ],
        "关于 dùng để làm gì?",
        ["Nêu chủ đề/phạm vi", "Phủ định hành động", "Đếm số lần"],
        0
      ],
      [
        "hsk3-shi-de-emphasis",
        "Nhấn mạnh với 是...的",
        "Chủ ngữ + 是 + thời gian/địa điểm/cách thức + động từ + 的",
        "Dùng để nhấn mạnh thông tin như khi nào, ở đâu, bằng cách nào hành động đã xảy ra.",
        [
          ["我是昨天到上海的。", "Wǒ shì zuótiān dào Shànghǎi de.", "Tôi đến Thượng Hải ngày hôm qua."],
          ["这份合同是在办公室签的。", "Zhè fèn hétong shì zài bàngōngshì qiān de.", "Hợp đồng này được ký ở văn phòng."]
        ],
        "是...的 thường nhấn mạnh thông tin nào?",
        ["Thời gian/địa điểm/cách thức đã xảy ra", "Số lượng nhỏ", "Mệnh lệnh"],
        0
      ],
      [
        "hsk3-jiu-cai",
        "Phân biệt 就 và 才",
        "就 = sớm/đã; 才 = muộn/mới",
        "就 thường cho cảm giác sớm, dễ, ít điều kiện; 才 thường cho cảm giác muộn, khó, cần nhiều điều kiện hơn.",
        [
          ["他八点就到了。", "Tā bā diǎn jiù dào le.", "Anh ấy tám giờ đã đến rồi."],
          ["他十点才到。", "Tā shí diǎn cái dào.", "Anh ấy mười giờ mới đến."]
        ],
        "Muốn nhấn mạnh 'mãi 10 giờ mới đến' dùng từ nào?",
        ["才", "就", "都"],
        0
      ],
      [
        "hsk3-zai-you",
        "Phân biệt 再 và 又",
        "再 + việc sẽ lặp lại; 又 + việc đã lặp lại",
        "再 thường nói hành động lặp lại ở tương lai; 又 nói hành động đã lặp lại hoặc sự việc lại xảy ra.",
        [
          ["明天我再给你打电话。", "Míngtiān wǒ zài gěi nǐ dǎ diànhuà.", "Ngày mai tôi sẽ gọi lại cho bạn."],
          ["他今天又迟到了。", "Tā jīntiān yòu chídào le.", "Hôm nay anh ấy lại đến muộn."]
        ],
        "Việc sẽ làm lại trong tương lai thường dùng từ nào?",
        ["再", "又", "才"],
        0
      ],
      [
        "hsk3-de-di-de",
        "Phân biệt 的 / 地 / 得",
        "Định ngữ + 的 + danh từ; trạng ngữ + 地 + động từ; động từ + 得 + bổ ngữ",
        "Ba chữ đều đọc nhẹ là de nhưng vị trí và chức năng khác nhau.",
        [
          ["新的机器到了。", "Xīn de jīqì dào le.", "Máy mới đã đến."],
          ["他说得很清楚。", "Tā shuō de hěn qīngchu.", "Anh ấy nói rất rõ."]
        ],
        "Động từ + ___ + bổ ngữ thường dùng chữ nào?",
        ["得", "的", "地"],
        0
      ],
      [
        "hsk3-xian-zai",
        "Trình tự với 先...再...",
        "先 + hành động 1, 再 + hành động 2",
        "Dùng để sắp xếp thứ tự trước-sau.",
        [
          ["我们先检查质量，再发货。", "Wǒmen xiān jiǎnchá zhìliàng, zài fāhuò.", "Chúng ta kiểm tra chất lượng trước, rồi mới giao hàng."],
          ["你先休息一下，再继续写。", "Nǐ xiān xiūxi yíxià, zài jìxù xiě.", "Bạn nghỉ một chút trước, rồi tiếp tục viết."]
        ],
        "先...再... biểu thị quan hệ gì?",
        ["Thứ tự trước sau", "So sánh", "Nguyên nhân"],
        0
      ]
    ],
    4: [
      [
        "hsk4-chabuduo",
        "差不多",
        "差不多 + số lượng/tính từ; A 和 B 差不多",
        "Nói mức độ gần giống, xấp xỉ, chênh lệch không nhiều.",
        [
          ["这两个方案差不多。", "Zhè liǎng ge fāng'àn chàbuduō.", "Hai phương án này gần giống nhau."],
          ["差不多十分钟以后开会。", "Chàbuduō shí fēnzhōng yǐhòu kāihuì.", "Khoảng mười phút nữa họp."]
        ],
        "差不多 thường nghĩa là gì?",
        ["Xấp xỉ/gần giống", "Hoàn toàn sai", "Không bao giờ"],
        0
      ],
      [
        "hsk4-jinguan",
        "Nhượng bộ với 尽管",
        "尽管 + sự thật, 但是/可是/却/还是 + kết quả",
        "Dù có điều kiện trái chiều, kết quả vẫn xảy ra.",
        [
          ["尽管下雨，我们还是按时出发。", "Jǐnguǎn xià yǔ, wǒmen háishì ànshí chūfā.", "Dù trời mưa, chúng tôi vẫn xuất phát đúng giờ."],
          ["尽管任务很难，但是大家没有放弃。", "Jǐnguǎn rènwu hěn nán, dànshì dàjiā méiyǒu fàngqì.", "Dù nhiệm vụ rất khó nhưng mọi người không bỏ cuộc."]
        ],
        "尽管 thường kết hợp với ý nào?",
        ["Nhượng bộ: dù... nhưng/vẫn...", "Sở hữu", "Đếm số lần"],
        0
      ],
      [
        "hsk4-que",
        "Chuyển ý nhẹ với 却",
        "Chủ ngữ + 却 + vị ngữ",
        "Biểu thị kết quả/thái độ trái với dự đoán, ngữ khí mềm hơn 但是 trong nhiều trường hợp.",
        [
          ["他很累，却还在学习。", "Tā hěn lèi, què hái zài xuéxí.", "Anh ấy rất mệt nhưng vẫn đang học."],
          ["价格不高，质量却很好。", "Jiàgé bù gāo, zhìliàng què hěn hǎo.", "Giá không cao nhưng chất lượng lại rất tốt."]
        ],
        "却 thường đặt ở đâu?",
        ["Sau chủ ngữ, trước vị ngữ", "Cuối câu", "Trước danh từ sở hữu"],
        0
      ],
      [
        "hsk4-buguan-dou",
        "Không kể... đều... 不管...都...",
        "不管/无论 + điều kiện, 都/也 + kết quả",
        "Dù điều kiện nào xảy ra, kết quả vẫn không đổi.",
        [
          ["不管多忙，我都要复习。", "Bùguǎn duō máng, wǒ dōu yào fùxí.", "Dù bận thế nào, tôi đều phải ôn tập."],
          ["无论客户说什么，我们都要耐心听。", "Wúlùn kèhù shuō shénme, wǒmen dōu yào nàixīn tīng.", "Dù khách hàng nói gì, chúng ta đều phải kiên nhẫn lắng nghe."]
        ],
        "不管...都... nhấn mạnh điều gì?",
        ["Kết quả không đổi dù điều kiện thay đổi", "Kết quả vì nguyên nhân", "Câu hỏi lựa chọn"],
        0
      ],
      [
        "hsk4-ji-you",
        "Vừa... vừa... 既...又...",
        "既 + tính chất 1 + 又 + tính chất 2",
        "Nói hai đặc điểm cùng tồn tại ở một người/sự vật.",
        [
          ["这个方法既简单又有效。", "Zhège fāngfǎ jì jiǎndān yòu yǒuxiào.", "Phương pháp này vừa đơn giản vừa hiệu quả."],
          ["她既会中文又会英文。", "Tā jì huì Zhōngwén yòu huì Yīngwén.", "Cô ấy vừa biết tiếng Trung vừa biết tiếng Anh."]
        ],
        "既...又... dùng để nối gì?",
        ["Hai đặc điểm cùng tồn tại", "Hai lựa chọn trong câu hỏi", "Một thời điểm duy nhất"],
        0
      ],
      [
        "hsk4-laideji",
        "来得及 / 来不及",
        "来得及 + động từ; 来不及 + động từ",
        "Nói có kịp hay không kịp làm việc gì trước một thời hạn.",
        [
          ["现在出发还来得及。", "Xiànzài chūfā hái láidejí.", "Bây giờ xuất phát vẫn còn kịp."],
          ["订单太多，我们来不及包装。", "Dìngdān tài duō, wǒmen láibují bāozhuāng.", "Đơn hàng quá nhiều, chúng tôi không kịp đóng gói."]
        ],
        "来不及 nghĩa là gì?",
        ["Không kịp", "Vừa đủ", "Đã từng"],
        0
      ]
    ],
    5: [
      [
        "hsk5-ruhe",
        "如何",
        "如何 + động từ/cụm động từ; tình hình + 如何?",
        "Trang trọng hơn 怎么, dùng để hỏi cách thức hoặc tình hình.",
        [
          ["这个问题该如何解决？", "Zhège wèntí gāi rúhé jiějué?", "Vấn đề này nên giải quyết như thế nào?"],
          ["项目进展如何？", "Xiàngmù jìnzhǎn rúhé?", "Tiến độ dự án thế nào?"]
        ],
        "如何 gần nghĩa với từ nào trong nhiều ngữ cảnh?",
        ["怎么", "多少", "谁"],
        0
      ],
      [
        "hsk5-kao",
        "靠",
        "靠 + người/cách thức/nguồn lực + động từ",
        "Nói dựa vào, nhờ vào phương tiện hoặc nguồn lực nào để đạt kết quả.",
        [
          ["我们靠数据做决定。", "Wǒmen kào shùjù zuò juédìng.", "Chúng tôi dựa vào dữ liệu để ra quyết định."],
          ["他靠自己的努力通过了考试。", "Tā kào zìjǐ de nǔlì tōngguò le kǎoshì.", "Anh ấy nhờ nỗ lực của bản thân mà vượt qua kỳ thi."]
        ],
        "靠 trong cấu trúc này nghĩa là gì?",
        ["Dựa vào/nhờ vào", "Rời khỏi", "So sánh"],
        0
      ],
      [
        "hsk5-juran",
        "Bất ngờ với 居然",
        "Chủ ngữ + 居然 + vị ngữ",
        "Biểu thị điều xảy ra ngoài dự đoán, thường mang sắc thái ngạc nhiên.",
        [
          ["这么难的题，他居然做对了。", "Zhème nán de tí, tā jūrán zuò duì le.", "Bài khó như vậy mà anh ấy lại làm đúng."],
          ["客户居然提前付款了。", "Kèhù jūrán tíqián fùkuǎn le.", "Khách hàng lại thanh toán trước, thật bất ngờ."]
        ],
        "居然 thể hiện sắc thái gì?",
        ["Bất ngờ/không ngờ", "Lựa chọn", "Phủ định"],
        0
      ],
      [
        "hsk5-hekuang",
        "Huống chi 何况",
        "Mệnh đề A, 何况 + mệnh đề B",
        "Dùng để bổ sung lý do mạnh hơn, nghĩa là huống chi/hơn nữa.",
        [
          ["普通问题他都能解决，何况这个小错误。", "Pǔtōng wèntí tā dōu néng jiějué, hékuàng zhège xiǎo cuòwù.", "Vấn đề thường anh ấy còn giải quyết được, huống chi lỗi nhỏ này."],
          ["现在时间很紧，何况材料还没到。", "Xiànzài shíjiān hěn jǐn, hékuàng cáiliào hái méi dào.", "Giờ thời gian rất gấp, hơn nữa vật liệu vẫn chưa đến."]
        ],
        "何况 dùng để thêm điều gì?",
        ["Lý do/ý mạnh hơn", "Câu hỏi lựa chọn", "Địa điểm"],
        0
      ],
      [
        "hsk5-faner",
        "Ngược lại 反而",
        "Không những không A, 反而 + B",
        "Kết quả thực tế trái với điều dự đoán.",
        [
          ["他没生气，反而笑了。", "Tā méi shēngqì, fǎn'ér xiào le.", "Anh ấy không tức giận, ngược lại còn cười."],
          ["降价以后，销量反而下降了。", "Jiàngjià yǐhòu, xiāoliàng fǎn'ér xiàjiàng le.", "Sau khi giảm giá, doanh số lại giảm."]
        ],
        "反而 biểu thị điều gì?",
        ["Kết quả ngược dự đoán", "Nguyên nhân trực tiếp", "Số lượng"],
        0
      ],
      [
        "hsk5-shenzhi",
        "Thậm chí 甚至",
        "Mức độ thường + 甚至 + mức độ cao hơn",
        "Nhấn mạnh ví dụ hoặc mức độ cao hơn điều vừa nói.",
        [
          ["他每天学习中文，甚至周末也不休息。", "Tā měitiān xuéxí Zhōngwén, shènzhì zhōumò yě bù xiūxi.", "Anh ấy học tiếng Trung mỗi ngày, thậm chí cuối tuần cũng không nghỉ."],
          ["这个软件很方便，甚至手机上也能用。", "Zhège ruǎnjiàn hěn fāngbiàn, shènzhì shǒujī shàng yě néng yòng.", "Phần mềm này rất tiện, thậm chí trên điện thoại cũng dùng được."]
        ],
        "甚至 dùng để nhấn mạnh gì?",
        ["Mức độ/ví dụ cao hơn", "Sở hữu", "Hành động chưa xảy ra"],
        0
      ]
    ],
    6: [
      [
        "hsk6-babude",
        "Mong vô cùng 巴不得",
        "Chủ ngữ + 巴不得 + điều mong muốn",
        "Khẩu ngữ, diễn tả mong muốn rất mạnh, nóng lòng muốn điều gì xảy ra.",
        [
          ["我巴不得今天就把问题解决。", "Wǒ bābudé jīntiān jiù bǎ wèntí jiějué.", "Tôi mong xử lý xong vấn đề ngay hôm nay."],
          ["他巴不得马上开始新项目。", "Tā bābudé mǎshàng kāishǐ xīn xiàngmù.", "Anh ấy mong bắt đầu dự án mới ngay lập tức."]
        ],
        "巴不得 thể hiện điều gì?",
        ["Mong muốn rất mạnh", "Sự phủ định", "So sánh bằng"],
        0
      ],
      [
        "hsk6-bieti-duo",
        "Khỏi phải nói... 别提多...了",
        "别提多 + tính từ + 了",
        "Nhấn mạnh mức độ rất cao, thường dùng khi cảm xúc rõ rệt.",
        [
          ["拿到证书以后，她别提多高兴了。", "Nádào zhèngshū yǐhòu, tā biétí duō gāoxìng le.", "Sau khi nhận chứng chỉ, cô ấy vui khỏi phải nói."],
          ["客户同意合作，老板别提多满意了。", "Kèhù tóngyì hézuò, lǎobǎn biétí duō mǎnyì le.", "Khách đồng ý hợp tác, sếp hài lòng khỏi phải nói."]
        ],
        "别提多...了 dùng để làm gì?",
        ["Nhấn mạnh mức độ rất cao", "Nêu địa điểm", "Hỏi lựa chọn"],
        0
      ],
      [
        "hsk6-chengji",
        "Nhân cơ hội 乘机",
        "乘机 + động từ",
        "Dùng khi tận dụng một cơ hội sẵn có để làm việc gì.",
        [
          ["去上海出差时，我想乘机拜访客户。", "Qù Shànghǎi chūchāi shí, wǒ xiǎng chéngjī bàifǎng kèhù.", "Khi đi công tác Thượng Hải, tôi muốn nhân cơ hội thăm khách hàng."],
          ["设备停机时，我们乘机做了保养。", "Shèbèi tíngjī shí, wǒmen chéngjī zuò le bǎoyǎng.", "Khi thiết bị dừng, chúng tôi nhân cơ hội bảo dưỡng."]
        ],
        "乘机 nghĩa là gì?",
        ["Nhân cơ hội", "Bắt buộc", "Không kịp"],
        0
      ],
      [
        "hsk6-bukuishi",
        "Quả không hổ là 不愧是",
        "不愧是 + danh từ/cụm danh từ",
        "Dùng để khen, xác nhận ai/cái gì xứng đáng với danh tiếng hoặc vị trí.",
        [
          ["他不愧是经验丰富的工程师。", "Tā búkuì shì jīngyàn fēngfù de gōngchéngshī.", "Anh ấy quả không hổ là kỹ sư giàu kinh nghiệm."],
          ["这家公司不愧是行业领先者。", "Zhè jiā gōngsī búkuì shì hángyè lǐngxiān zhě.", "Công ty này quả không hổ là đơn vị dẫn đầu ngành."]
        ],
        "不愧是 thường mang sắc thái gì?",
        ["Khen/xác nhận xứng đáng", "Chê trách", "Nghi vấn"],
        0
      ],
      [
        "hsk6-guigen-daodi",
        "Suy cho cùng 归根到底",
        "归根到底, + kết luận/bản chất",
        "Dùng để rút về nguyên nhân hoặc bản chất cuối cùng của vấn đề.",
        [
          ["归根到底，质量是最重要的。", "Guīgēn dàodǐ, zhìliàng shì zuì zhòngyào de.", "Suy cho cùng, chất lượng là quan trọng nhất."],
          ["归根到底，学习语言要多用。", "Guīgēn dàodǐ, xuéxí yǔyán yào duō yòng.", "Suy cho cùng, học ngôn ngữ cần dùng nhiều."]
        ],
        "归根到底 dùng khi nào?",
        ["Rút ra bản chất/kết luận cuối", "Hỏi đường", "Đếm số lượng"],
        0
      ],
      [
        "hsk6-naizhi",
        "Thậm chí đến mức 乃至",
        "A, 乃至 B",
        "Nối các mức độ tăng dần, B thường là mức cao hơn hoặc phạm vi rộng hơn.",
        [
          ["这个决定会影响生产，乃至整个供应链。", "Zhège juédìng huì yǐngxiǎng shēngchǎn, nǎizhì zhěnggè gōngyìngliàn.", "Quyết định này sẽ ảnh hưởng đến sản xuất, thậm chí cả chuỗi cung ứng."],
          ["他关注细节，乃至每一个标点。", "Tā guānzhù xìjié, nǎizhì měi yí ge biāodiǎn.", "Anh ấy chú ý chi tiết, thậm chí đến từng dấu câu."]
        ],
        "乃至 thường nối các ý theo hướng nào?",
        ["Tăng mức độ/phạm vi", "Phủ định", "Chọn A hoặc B"],
        0
      ]
    ]
  };

  if (!window.HSK_GRAMMAR) window.HSK_GRAMMAR = {};
  Object.entries(extraGrammar).forEach(([level, items]) => {
    const existingIds = new Set((window.HSK_GRAMMAR[level] || []).map((item) => item.id));
    const additions = items.map(makeGrammar).filter((item) => !existingIds.has(item.id));
    window.HSK_GRAMMAR[level] = [...(window.HSK_GRAMMAR[level] || []), ...additions];
  });
})();
