(function () {
  const grammar = {
    1: [
      {
        id: "hsk1-ma",
        title: "Câu hỏi với 吗",
        structure: "Chủ ngữ + vị ngữ + 吗?",
        note: "Dùng để biến câu trần thuật thành câu hỏi có/không.",
        examples: [
          ["你是老师吗？", "Nǐ shì lǎoshī ma?", "Bạn là giáo viên phải không?"],
          ["你喝茶吗？", "Nǐ hē chá ma?", "Bạn có uống trà không?"]
        ],
        quiz: {
          question: "Câu nào hỏi 'Bạn có bận không?'",
          options: ["你忙吗？", "你很忙。", "你不忙。"],
          answer: 0
        }
      },
      {
        id: "hsk1-de",
        title: "Sở hữu với 的",
        structure: "Danh từ/đại từ + 的 + danh từ",
        note: "Biểu thị quan hệ sở hữu hoặc bổ nghĩa.",
        examples: [
          ["我的书在桌子上。", "Wǒ de shū zài zhuōzi shàng.", "Sách của tôi ở trên bàn."],
          ["这是妈妈的手机。", "Zhè shì māma de shǒujī.", "Đây là điện thoại của mẹ."]
        ],
        quiz: {
          question: "Cụm nào nghĩa là 'bạn của tôi'?",
          options: ["我的朋友", "我朋友的", "朋友我"],
          answer: 0
        }
      },
      {
        id: "hsk1-zai",
        title: "Vị trí với 在",
        structure: "Chủ ngữ + 在 + nơi chốn",
        note: "Dùng để nói ai/cái gì ở đâu.",
        examples: [
          ["我在家。", "Wǒ zài jiā.", "Tôi ở nhà."],
          ["老师在学校。", "Lǎoshī zài xuéxiào.", "Thầy/cô ở trường."]
        ],
        quiz: {
          question: "Câu nào đúng để nói 'Tôi ở Bắc Kinh'?",
          options: ["我在北京。", "我北京在。", "北京我在。"],
          answer: 0
        }
      },
      {
        id: "hsk1-you",
        title: "Có với 有",
        structure: "Chủ ngữ + 有 + tân ngữ",
        note: "Dùng để nói có/sở hữu.",
        examples: [
          ["我有一个杯子。", "Wǒ yǒu yí ge bēizi.", "Tôi có một cái cốc."],
          ["他有很多朋友。", "Tā yǒu hěn duō péngyou.", "Anh ấy có nhiều bạn."]
        ],
        quiz: {
          question: "Câu nào nghĩa là 'Tôi có tiền'?",
          options: ["我有钱。", "我在钱。", "我是钱。"],
          answer: 0
        }
      },
      {
        id: "hsk1-bu",
        title: "Phủ định với 不",
        structure: "Chủ ngữ + 不 + động từ/tính từ",
        note: "Dùng để phủ định thói quen, trạng thái hoặc ý kiến.",
        examples: [
          ["我不喝咖啡。", "Wǒ bù hē kāfēi.", "Tôi không uống cà phê."],
          ["今天不冷。", "Jīntiān bù lěng.", "Hôm nay không lạnh."]
        ],
        quiz: {
          question: "Chọn câu phủ định đúng.",
          options: ["我不去。", "我去不。", "不我去。"],
          answer: 0
        }
      },
      {
        id: "hsk1-le",
        title: "Hoàn thành với 了",
        structure: "Chủ ngữ + động từ + 了",
        note: "Cho biết hành động đã xảy ra hoặc có thay đổi.",
        examples: [
          ["我吃饭了。", "Wǒ chīfàn le.", "Tôi ăn cơm rồi."],
          ["他回家了。", "Tā huí jiā le.", "Anh ấy về nhà rồi."]
        ],
        quiz: {
          question: "Câu nào nghĩa là 'Tôi mua rồi'?",
          options: ["我买了。", "我了买。", "我不买。"],
          answer: 0
        }
      }
    ],
    2: [
      {
        id: "hsk2-yao",
        title: "Muốn/cần với 要",
        structure: "Chủ ngữ + 要 + động từ/danh từ",
        note: "Diễn tả mong muốn, nhu cầu hoặc việc sắp xảy ra.",
        examples: [
          ["我要买票。", "Wǒ yào mǎi piào.", "Tôi muốn mua vé."],
          ["明天要下雨。", "Míngtiān yào xià yǔ.", "Ngày mai sắp mưa."]
        ],
        quiz: {
          question: "Câu nào nói 'Tôi muốn uống nước'?",
          options: ["我要喝水。", "我会喝水。", "我在喝水。"],
          answer: 0
        }
      },
      {
        id: "hsk2-guo",
        title: "Kinh nghiệm với 过",
        structure: "Chủ ngữ + động từ + 过 + tân ngữ",
        note: "Nói rằng đã từng có trải nghiệm làm việc gì.",
        examples: [
          ["我去过上海。", "Wǒ qù guò Shànghǎi.", "Tôi từng đến Thượng Hải."],
          ["你吃过北京烤鸭吗？", "Nǐ chī guò Běijīng kǎoyā ma?", "Bạn từng ăn vịt quay Bắc Kinh chưa?"]
        ],
        quiz: {
          question: "Từ nào dùng để nói kinh nghiệm 'đã từng'?",
          options: ["过", "了", "吗"],
          answer: 0
        }
      },
      {
        id: "hsk2-zhengzai",
        title: "Đang làm với 正在",
        structure: "Chủ ngữ + 正在 + động từ",
        note: "Nhấn mạnh hành động đang diễn ra.",
        examples: [
          ["我正在学习中文。", "Wǒ zhèngzài xuéxí Zhōngwén.", "Tôi đang học tiếng Trung."],
          ["他们正在开会。", "Tāmen zhèngzài kāihuì.", "Họ đang họp."]
        ],
        quiz: {
          question: "Câu nào nghĩa là 'Cô ấy đang đọc sách'?",
          options: ["她正在看书。", "她看书了。", "她看过书。"],
          answer: 0
        }
      },
      {
        id: "hsk2-bi",
        title: "So sánh với 比",
        structure: "A + 比 + B + tính từ",
        note: "Dùng để so sánh A hơn B về một đặc điểm.",
        examples: [
          ["今天比昨天热。", "Jīntiān bǐ zuótiān rè.", "Hôm nay nóng hơn hôm qua."],
          ["他比我高。", "Tā bǐ wǒ gāo.", "Anh ấy cao hơn tôi."]
        ],
        quiz: {
          question: "Cấu trúc so sánh đúng là gì?",
          options: ["A 比 B + tính từ", "A 很 比 B", "比 A B + tính từ"],
          answer: 0
        }
      },
      {
        id: "hsk2-yixia",
        title: "Làm thử/nhẹ với 一下",
        structure: "Động từ + 一下",
        note: "Làm cho lời đề nghị nhẹ nhàng hơn hoặc nói hành động ngắn.",
        examples: [
          ["请等一下。", "Qǐng děng yíxià.", "Vui lòng đợi một chút."],
          ["我看一下。", "Wǒ kàn yíxià.", "Tôi xem một chút."]
        ],
        quiz: {
          question: "Câu nào lịch sự hơn khi nhờ đợi?",
          options: ["请等一下。", "等！", "你等。"],
          answer: 0
        }
      },
      {
        id: "hsk2-jiu",
        title: "Chỉ với 就",
        structure: "Số lượng/thời gian + 就 + động từ",
        note: "Nhấn mạnh ít, sớm hoặc nhanh hơn dự kiến.",
        examples: [
          ["我五分钟就到。", "Wǒ wǔ fēnzhōng jiù dào.", "Năm phút nữa tôi tới ngay."],
          ["他三岁就会写字。", "Tā sān suì jiù huì xiě zì.", "Anh ấy mới ba tuổi đã biết viết chữ."]
        ],
        quiz: {
          question: "就 thường nhấn mạnh điều gì?",
          options: ["Sớm/nhanh/ít hơn dự kiến", "Câu hỏi có/không", "Sở hữu"],
          answer: 0
        }
      }
    ],
    3: [
      {
        id: "hsk3-ba",
        title: "Câu 把",
        structure: "Chủ ngữ + 把 + tân ngữ + động từ + kết quả",
        note: "Nhấn mạnh xử lý/tác động lên tân ngữ.",
        examples: [
          ["请把门关上。", "Qǐng bǎ mén guān shàng.", "Vui lòng đóng cửa lại."],
          ["我把作业写完了。", "Wǒ bǎ zuòyè xiě wán le.", "Tôi đã làm xong bài tập."]
        ],
        quiz: {
          question: "Câu 把 dùng để nhấn mạnh điều gì?",
          options: ["Tác động lên tân ngữ", "Câu hỏi lựa chọn", "Sở hữu"],
          answer: 0
        }
      },
      {
        id: "hsk3-bei",
        title: "Bị/được với 被",
        structure: "Chủ ngữ + 被 + người thực hiện + động từ",
        note: "Dùng cho câu bị động.",
        examples: [
          ["我的手机被他拿走了。", "Wǒ de shǒujī bèi tā ná zǒu le.", "Điện thoại của tôi bị anh ấy lấy đi."],
          ["门被风吹开了。", "Mén bèi fēng chuī kāi le.", "Cửa bị gió thổi mở ra."]
        ],
        quiz: {
          question: "被 thường dùng trong loại câu nào?",
          options: ["Câu bị động", "Câu so sánh", "Câu hỏi 吗"],
          answer: 0
        }
      },
      {
        id: "hsk3-yinwei-suoyi",
        title: "Vì... nên... 因为...所以...",
        structure: "因为 + nguyên nhân, 所以 + kết quả",
        note: "Nối nguyên nhân và kết quả.",
        examples: [
          ["因为下雨，所以我没去。", "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù.", "Vì trời mưa nên tôi không đi."],
          ["因为太忙，所以他迟到了。", "Yīnwèi tài máng, suǒyǐ tā chídào le.", "Vì quá bận nên anh ấy đến muộn."]
        ],
        quiz: {
          question: "Từ nào đứng trước nguyên nhân?",
          options: ["因为", "所以", "但是"],
          answer: 0
        }
      },
      {
        id: "hsk3-suiran-danshi",
        title: "Tuy... nhưng... 虽然...但是...",
        structure: "虽然 + sự thật, 但是 + ý trái chiều",
        note: "Dùng để thể hiện quan hệ nhượng bộ.",
        examples: [
          ["虽然很累，但是我很高兴。", "Suīrán hěn lèi, dànshì wǒ hěn gāoxìng.", "Tuy rất mệt nhưng tôi rất vui."],
          ["虽然贵，但是质量很好。", "Suīrán guì, dànshì zhìliàng hěn hǎo.", "Tuy đắt nhưng chất lượng rất tốt."]
        ],
        quiz: {
          question: "虽然 thường đi với từ nào để tạo nghĩa 'tuy... nhưng...'?",
          options: ["但是", "所以", "因为"],
          answer: 0
        }
      },
      {
        id: "hsk3-yue-yue",
        title: "Càng... càng... 越...越...",
        structure: "越 + tính từ/động từ, 越 + tính từ/động từ",
        note: "Diễn tả hai thay đổi tăng/giảm cùng nhau.",
        examples: [
          ["我越学越喜欢中文。", "Wǒ yuè xué yuè xǐhuan Zhōngwén.", "Tôi càng học càng thích tiếng Trung."],
          ["天气越来越冷。", "Tiānqì yuè lái yuè lěng.", "Thời tiết ngày càng lạnh."]
        ],
        quiz: {
          question: "Câu nào nghĩa là 'càng ngày càng tốt'?",
          options: ["越来越好", "越好来好", "好越来"],
          answer: 0
        }
      },
      {
        id: "hsk3-chule-yiwai",
        title: "Ngoài... ra 除了...以外",
        structure: "除了 + A + 以外, còn/lại...",
        note: "Dùng khi loại trừ hoặc bổ sung thông tin.",
        examples: [
          ["除了中文以外，我还学英文。", "Chúle Zhōngwén yǐwài, wǒ hái xué Yīngwén.", "Ngoài tiếng Trung ra, tôi còn học tiếng Anh."],
          ["除了他以外，大家都来了。", "Chúle tā yǐwài, dàjiā dōu lái le.", "Ngoài anh ấy ra, mọi người đều đến."]
        ],
        quiz: {
          question: "除了...以外 có thể dùng để nói gì?",
          options: ["Ngoài... ra", "Vì... nên", "Đang làm"],
          answer: 0
        }
      }
    ],
    4: [
      {
        id: "hsk4-budan-erqie",
        title: "Không những... mà còn... 不但...而且...",
        structure: "不但 + mệnh đề 1, 而且 + mệnh đề 2",
        note: "Dùng để tăng cấp thông tin.",
        examples: [
          ["他不但会说中文，而且说得很流利。", "Tā búdàn huì shuō Zhōngwén, érqiě shuō de hěn liúlì.", "Anh ấy không những biết nói tiếng Trung mà còn nói rất lưu loát."],
          ["这个办法不但简单，而且有效。", "Zhège bànfǎ búdàn jiǎndān, érqiě yǒuxiào.", "Cách này không những đơn giản mà còn hiệu quả."]
        ],
        quiz: {
          question: "不但 thường đi với từ nào?",
          options: ["而且", "因为", "如果"],
          answer: 0
        }
      },
      {
        id: "hsk4-zhiyao-jiu",
        title: "Chỉ cần... thì... 只要...就...",
        structure: "只要 + điều kiện, 就 + kết quả",
        note: "Diễn tả điều kiện đủ.",
        examples: [
          ["只要你努力，就会进步。", "Zhǐyào nǐ nǔlì, jiù huì jìnbù.", "Chỉ cần bạn cố gắng thì sẽ tiến bộ."],
          ["只要有时间，我就去。", "Zhǐyào yǒu shíjiān, wǒ jiù qù.", "Chỉ cần có thời gian thì tôi đi."]
        ],
        quiz: {
          question: "只要...就... diễn tả gì?",
          options: ["Điều kiện đủ", "So sánh", "Bị động"],
          answer: 0
        }
      },
      {
        id: "hsk4-jishi-ye",
        title: "Cho dù... cũng... 即使...也...",
        structure: "即使 + giả thiết, 也 + kết quả không đổi",
        note: "Nhấn mạnh kết quả vẫn xảy ra dù có điều kiện khó.",
        examples: [
          ["即使很忙，我也会复习。", "Jíshǐ hěn máng, wǒ yě huì fùxí.", "Cho dù rất bận, tôi vẫn sẽ ôn tập."],
          ["即使失败，也不要放弃。", "Jíshǐ shībài, yě búyào fàngqì.", "Cho dù thất bại cũng đừng bỏ cuộc."]
        ],
        quiz: {
          question: "即使 thường đi với từ nào?",
          options: ["也", "就", "吗"],
          answer: 0
        }
      },
      {
        id: "hsk4-yibian-yibian",
        title: "Vừa... vừa... 一边...一边...",
        structure: "一边 + hành động 1, 一边 + hành động 2",
        note: "Hai hành động xảy ra cùng lúc.",
        examples: [
          ["他一边听音乐，一边做饭。", "Tā yìbiān tīng yīnyuè, yìbiān zuò fàn.", "Anh ấy vừa nghe nhạc vừa nấu ăn."],
          ["她一边走路，一边打电话。", "Tā yìbiān zǒulù, yìbiān dǎ diànhuà.", "Cô ấy vừa đi bộ vừa gọi điện."]
        ],
        quiz: {
          question: "一边...一边... dùng khi nào?",
          options: ["Hai hành động cùng lúc", "Nguyên nhân-kết quả", "Hành động đã từng"],
          answer: 0
        }
      },
      {
        id: "hsk4-dui-lai-shuo",
        title: "Đối với... mà nói 对...来说",
        structure: "对 + người/nhóm + 来说, ...",
        note: "Nêu góc nhìn hoặc phạm vi đánh giá.",
        examples: [
          ["对我来说，语法很重要。", "Duì wǒ lái shuō, yǔfǎ hěn zhòngyào.", "Đối với tôi, ngữ pháp rất quan trọng."],
          ["对客户来说，时间就是成本。", "Duì kèhù lái shuō, shíjiān jiù shì chéngběn.", "Đối với khách hàng, thời gian chính là chi phí."]
        ],
        quiz: {
          question: "对...来说 dùng để nêu điều gì?",
          options: ["Góc nhìn/đối tượng đánh giá", "Câu bị động", "Sở hữu"],
          answer: 0
        }
      },
      {
        id: "hsk4-ba-result",
        title: "Câu 把 với bổ ngữ kết quả",
        structure: "把 + tân ngữ + động từ + bổ ngữ kết quả",
        note: "Nhấn mạnh kết quả sau khi xử lý tân ngữ.",
        examples: [
          ["请把资料准备好。", "Qǐng bǎ zīliào zhǔnbèi hǎo.", "Vui lòng chuẩn bị tài liệu xong."],
          ["我把问题解决了。", "Wǒ bǎ wèntí jiějué le.", "Tôi đã giải quyết vấn đề."]
        ],
        quiz: {
          question: "Trong câu 把, phần sau động từ thường cho biết gì?",
          options: ["Kết quả/xử lý", "Người sở hữu", "Câu hỏi"],
          answer: 0
        }
      }
    ],
    5: [
      {
        id: "hsk5-yuqi-buru",
        title: "Thà... còn hơn... 与其...不如...",
        structure: "与其 + phương án A, 不如 + phương án B",
        note: "So sánh và chọn phương án tốt hơn.",
        examples: [
          ["与其抱怨，不如行动。", "Yǔqí bàoyuàn, bùrú xíngdòng.", "Thà hành động còn hơn than phiền."],
          ["与其等别人，不如自己先做。", "Yǔqí děng biérén, bùrú zìjǐ xiān zuò.", "Thà tự làm trước còn hơn đợi người khác."]
        ],
        quiz: {
          question: "与其...不如... dùng để làm gì?",
          options: ["Chọn phương án tốt hơn", "Nói đang xảy ra", "Hỏi có/không"],
          answer: 0
        }
      },
      {
        id: "hsk5-wulun-dou",
        title: "Bất kể... đều... 无论...都...",
        structure: "无论 + điều kiện nào, 都 + kết quả",
        note: "Kết quả không đổi trong mọi trường hợp.",
        examples: [
          ["无论多忙，我都要复习。", "Wúlùn duō máng, wǒ dōu yào fùxí.", "Dù bận thế nào, tôi đều phải ôn tập."],
          ["无论客户怎么问，我们都要耐心回答。", "Wúlùn kèhù zěnme wèn, wǒmen dōu yào nàixīn huídá.", "Dù khách hỏi thế nào, chúng ta đều phải kiên nhẫn trả lời."]
        ],
        quiz: {
          question: "无论 thường đi với từ nào?",
          options: ["都", "吗", "过"],
          answer: 0
        }
      },
      {
        id: "hsk5-jiran-jiu",
        title: "Đã... thì... 既然...就...",
        structure: "既然 + sự thật/điều đã biết, 就 + kết luận",
        note: "Dựa trên điều đã biết để đưa ra kết luận/hành động.",
        examples: [
          ["既然决定了，就不要后悔。", "Jìrán juédìng le, jiù búyào hòuhuǐ.", "Đã quyết định rồi thì đừng hối hận."],
          ["既然客户同意了，我们就开始生产。", "Jìrán kèhù tóngyì le, wǒmen jiù kāishǐ shēngchǎn.", "Khách đã đồng ý thì chúng ta bắt đầu sản xuất."]
        ],
        quiz: {
          question: "既然...就... thường diễn tả quan hệ gì?",
          options: ["Căn cứ-kết luận", "So sánh hơn", "Bị động"],
          answer: 0
        }
      },
      {
        id: "hsk5-bingfei-er-shi",
        title: "Không phải... mà là... 并非...而是...",
        structure: "并非 + A, 而是 + B",
        note: "Phủ định nhận định A và khẳng định B.",
        examples: [
          ["问题并非价格，而是质量。", "Wèntí bìngfēi jiàgé, érshì zhìliàng.", "Vấn đề không phải giá cả mà là chất lượng."],
          ["他并非不努力，而是方法不对。", "Tā bìngfēi bù nǔlì, érshì fāngfǎ bú duì.", "Anh ấy không phải không cố gắng mà là phương pháp chưa đúng."]
        ],
        quiz: {
          question: "并非...而是... dùng để làm gì?",
          options: ["Phủ định A, khẳng định B", "Nói hành động ngắn", "Nêu vị trí"],
          answer: 0
        }
      },
      {
        id: "hsk5-yi-mian",
        title: "Để tránh... 以免",
        structure: "Mệnh đề 1, 以免 + hậu quả không mong muốn",
        note: "Nêu mục đích tránh rủi ro/kết quả xấu.",
        examples: [
          ["请提前确认，以免耽误交货。", "Qǐng tíqián quèrèn, yǐmiǎn dānwu jiāohuò.", "Vui lòng xác nhận trước để tránh làm chậm giao hàng."],
          ["带上雨伞，以免下雨。", "Dài shàng yǔsǎn, yǐmiǎn xià yǔ.", "Mang ô theo để tránh trời mưa."]
        ],
        quiz: {
          question: "以免 nhấn mạnh điều gì?",
          options: ["Tránh hậu quả xấu", "Đã từng", "Càng ngày càng"],
          answer: 0
        }
      },
      {
        id: "hsk5-youyu",
        title: "Do/Vì bởi 由于",
        structure: "由于 + nguyên nhân, ...",
        note: "Trang trọng hơn 因为, hay dùng trong văn viết/công việc.",
        examples: [
          ["由于天气原因，航班延误了。", "Yóuyú tiānqì yuányīn, hángbān yánwù le.", "Do thời tiết, chuyến bay bị hoãn."],
          ["由于材料不足，生产计划需要调整。", "Yóuyú cáiliào bùzú, shēngchǎn jìhuà xūyào tiáozhěng.", "Do thiếu vật liệu, kế hoạch sản xuất cần điều chỉnh."]
        ],
        quiz: {
          question: "由于 thường dùng để nêu gì?",
          options: ["Nguyên nhân", "Câu hỏi", "Sở hữu"],
          answer: 0
        }
      }
    ],
    6: [
      {
        id: "hsk6-buyiwei",
        title: "Không có nghĩa là 不意味着",
        structure: "A 并不意味着 B",
        note: "Nói A không nhất thiết dẫn tới/đồng nghĩa với B.",
        examples: [
          ["失败并不意味着结束。", "Shībài bìng bù yìwèizhe jiéshù.", "Thất bại không có nghĩa là kết thúc."],
          ["成本降低并不意味着质量下降。", "Chéngběn jiàngdī bìng bù yìwèizhe zhìliàng xiàjiàng.", "Chi phí giảm không có nghĩa là chất lượng giảm."]
        ],
        quiz: {
          question: "并不意味着 dùng để diễn tả gì?",
          options: ["Không đồng nghĩa/không nhất thiết", "Đang diễn ra", "Câu hỏi lựa chọn"],
          answer: 0
        }
      },
      {
        id: "hsk6-zhiyu",
        title: "Còn về... 至于",
        structure: "至于 + chủ đề, ...",
        note: "Chuyển sang một chủ đề/phần thông tin khác.",
        examples: [
          ["至于价格，我们还需要再讨论。", "Zhìyú jiàgé, wǒmen hái xūyào zài tǎolùn.", "Còn về giá cả, chúng ta vẫn cần bàn thêm."],
          ["至于交期，工厂明天会确认。", "Zhìyú jiāoqī, gōngchǎng míngtiān huì quèrèn.", "Còn về thời hạn giao hàng, nhà máy sẽ xác nhận ngày mai."]
        ],
        quiz: {
          question: "至于 dùng để làm gì?",
          options: ["Chuyển sang chủ đề khác", "So sánh hơn", "Nói sở hữu"],
          answer: 0
        }
      },
      {
        id: "hsk6-conger",
        title: "Từ đó/dẫn đến 从而",
        structure: "Mệnh đề nguyên nhân/cách làm, 从而 + kết quả",
        note: "Dùng trong văn viết để nêu kết quả logic.",
        examples: [
          ["我们优化流程，从而提高效率。", "Wǒmen yōuhuà liúchéng, cóng'ér tígāo xiàolǜ.", "Chúng tôi tối ưu quy trình, từ đó nâng cao hiệu suất."],
          ["数据更准确，从而减少误判。", "Shùjù gèng zhǔnquè, cóng'ér jiǎnshǎo wùpàn.", "Dữ liệu chính xác hơn, từ đó giảm phán đoán sai."]
        ],
        quiz: {
          question: "从而 thường nối với phần nào?",
          options: ["Kết quả logic", "Câu hỏi", "Người sở hữu"],
          answer: 0
        }
      },
      {
        id: "hsk6-yishi",
        title: "Đến mức 以至于",
        structure: "Mệnh đề nguyên nhân/mức độ, 以至于 + kết quả",
        note: "Nhấn mạnh mức độ dẫn tới kết quả.",
        examples: [
          ["他太忙了，以至于忘了吃饭。", "Tā tài máng le, yǐzhìyú wàng le chīfàn.", "Anh ấy bận đến mức quên ăn."],
          ["订单增加很快，以至于产线需要加班。", "Dìngdān zēngjiā hěn kuài, yǐzhìyú chǎnxiàn xūyào jiābān.", "Đơn hàng tăng nhanh đến mức chuyền sản xuất cần tăng ca."]
        ],
        quiz: {
          question: "以至于 nhấn mạnh điều gì?",
          options: ["Mức độ dẫn tới kết quả", "Đã từng làm", "Địa điểm"],
          answer: 0
        }
      },
      {
        id: "hsk6-ningke",
        title: "Thà... cũng không... 宁可...也不...",
        structure: "宁可 + A, 也不 + B",
        note: "Chọn A dù khó, kiên quyết không chọn B.",
        examples: [
          ["我宁可多花时间，也不降低质量。", "Wǒ nìngkě duō huā shíjiān, yě bù jiàngdī zhìliàng.", "Tôi thà tốn thêm thời gian chứ không giảm chất lượng."],
          ["他宁可重新做，也不交不合格的产品。", "Tā nìngkě chóngxīn zuò, yě bù jiāo bù hégé de chǎnpǐn.", "Anh ấy thà làm lại chứ không giao sản phẩm không đạt."]
        ],
        quiz: {
          question: "宁可...也不... thể hiện thái độ gì?",
          options: ["Kiên quyết chọn A, không chọn B", "Đang xảy ra", "Câu hỏi"],
          answer: 0
        }
      },
      {
        id: "hsk6-jiushi-ye",
        title: "Cho dù là... cũng... 就是...也...",
        structure: "就是 + tình huống mạnh, 也 + kết quả",
        note: "Khẩu ngữ, nhấn mạnh dù tình huống cực đoan thì kết quả vẫn vậy.",
        examples: [
          ["就是再难，我也要完成。", "Jiùshì zài nán, wǒ yě yào wánchéng.", "Dù khó hơn nữa, tôi cũng phải hoàn thành."],
          ["就是客户很着急，也不能跳过检查。", "Jiùshì kèhù hěn zháojí, yě bùnéng tiàoguò jiǎnchá.", "Dù khách rất gấp, cũng không thể bỏ qua kiểm tra."]
        ],
        quiz: {
          question: "就是...也... gần nghĩa với cấu trúc nào?",
          options: ["即使...也...", "因为...所以...", "除了...以外"],
          answer: 0
        }
      }
    ]
  };

  window.HSK_GRAMMAR = grammar;
})();
