(function () {
  "use strict";

  window.NONSENSE_DATA = {
    groups: [
      { id: "onboarding", index: "01", title: "个性化 Onboarding" },
      { id: "feed", index: "02", title: "内容 Feed 流" },
      { id: "chat", index: "03", title: "AI 群聊场景" },
      { id: "speak", index: "04", title: "多轮自由表达" },
      { id: "feedback", index: "05", title: "学习反馈闭环" }
    ],

    screens: [
      { id: "splash", group: "onboarding", title: "产品开屏" },
      { id: "onboarding", group: "onboarding", title: "花名设置" },
      { id: "feed", group: "feed", title: "新闻 Feed" },
      { id: "chat-context", group: "chat", title: "加入群聊" },
      { id: "chat-opening", group: "chat", title: "NPC 开场" },
      { id: "speak-1", group: "speak", title: "第一轮开口" },
      { id: "reply-1", group: "speak", title: "角色接话" },
      { id: "speak-2", group: "speak", title: "第二轮开口" },
      { id: "reply-2", group: "speak", title: "冲突推进" },
      { id: "speak-3", group: "speak", title: "第三轮开口" },
      { id: "reply-3", group: "speak", title: "群聊收束" },
      { id: "settlement", group: "feedback", title: "结算报道" },
      { id: "expression-1", group: "feedback", title: "表达提升 1" },
      { id: "expression-2", group: "feedback", title: "表达提升 2" },
      { id: "expression-3", group: "feedback", title: "表达提升 3" },
      { id: "expression-book", group: "feedback", title: "表达本" }
    ],

    feed: [
      {
        id: "room-001",
        source: "东海商报",
        headline: ["白龙马挂闲鱼标价两万", "卖家疑为队友"],
        difficulty: "A2",
        tags: ["西游记", "职场"],
        cover: "assets/covers/room-001.webp",
        bg: "#F7F2EC",
        header: "#F0EBE4",
        headerText: "#3A2E22",
        accent: "#C41E1E",
        views: "2.3k",
        comments: 128,
        reactions: [
          { name: "八戒", color: "#C84B31", en: "Eats loads, does nothing. Selling tracks.", zh: "这马吃多干少，不卖留着干啥。" },
          { name: "白龙马", color: "#1A8A6E", en: "I carried bags the whole trip. Where were you?", zh: "谁不干活？我驮行李时你在哪。" }
        ]
      },
      {
        id: "room-002",
        source: "复联内部周报",
        headline: ["灭霸入职首日提交裁员方案", "饼状图获 CEO 好评"],
        difficulty: "B1",
        tags: ["漫威", "职场"],
        cover: "assets/covers/room-002.webp",
        bg: "#FFF1F2",
        header: "#FFE4E6",
        headerText: "#4C0519",
        accent: "#BE123C",
        views: "4.1k",
        comments: 267,
        reactions: [
          { name: "钢铁侠", color: "#BE123C", en: "Math checks out. Does NOT mean I endorse it.", zh: "数学上成立，但我不支持这么做。" },
          { name: "甄嬛", color: "#881337", en: "Lovely chart. The half being cut? Not my people.", zh: "图表精致，本宫欣赏，但不裁本宫。" }
        ]
      },
      {
        id: "room-003",
        source: "中土娱乐周刊",
        headline: ["年会舞台被不明力量冻住", "诸葛亮当场无语"],
        difficulty: "A2",
        tags: ["迪士尼", "三国"],
        cover: "assets/covers/room-003.webp",
        bg: "#F5F3FF",
        header: "#EDE9FE",
        headerText: "#3B0764",
        accent: "#6D28D9",
        views: "1.8k",
        comments: 95,
        reactions: [
          { name: "诸葛亮", color: "#6D28D9", en: "Stars clear. Universe overruled the plan.", zh: "昨夜星象无异兆，此冻乃天意也。" },
          { name: "Elsa", color: "#3B0764", en: "Ice backdrop beats the original PPT, honestly.", zh: "冰雕背景比原来 PPT 好看多了。" }
        ]
      },
      {
        id: "room-005",
        source: "中土娱乐快报",
        headline: ["“中土好声音”决赛", "甘道夫转椅直接飞出舞台"],
        difficulty: "B1",
        tags: ["指环王", "综艺"],
        cover: "assets/covers/room-005.webp",
        bg: "#ECFDF5",
        header: "#D1FAE5",
        headerText: "#064E3B",
        accent: "#047857",
        views: "5.6k",
        comments: 342,
        reactions: [
          { name: "甘道夫", color: "#047857", en: "Magical interference. Not operator error.", zh: "转椅可以解释，是魔法干扰。" },
          { name: "咕噜", color: "#064E3B", en: "It's ours, precious. Trophy is OURS.", zh: "冠军是我们的！裁判不公平！" }
        ]
      },
      {
        id: "room-006",
        source: "后宫人事通报",
        headline: ["华妃年度考核垫底", "甄嬛建议转岗冷宫"],
        difficulty: "A2",
        tags: ["甄嬛传", "职场"],
        cover: "assets/covers/room-006.webp",
        bg: "#F7ECF0",
        header: "#F3E0E8",
        headerText: "#5F1E3A",
        accent: "#BE185D",
        views: "3.8k",
        comments: 215,
        reactions: [
          { name: "华妃", color: "#BE185D", en: "Review ME? I should be reviewing YOU.", zh: "考核？本宫要考核你才对。" },
          { name: "甄嬛", color: "#5F1E3A", en: "Data doesn't lie. But it can be gentle.", zh: "数据不会说谎，但可以说得委婉。" }
        ]
      }
    ],

    room: {
      groupName: "取经项目推进群（已解散待定）",
      members: "八戒 · 白龙马 · 你",
      notice: "取经任务结项，各成员请处理个人物品，白龙马问题请联系HR",
      role: "Outside Auditor",
      inviter: "八戒 invited you to the group"
    },

    opening: [
      {
        speaker: "八戒",
        color: "#1A6A8A",
        avatar: "八",
        en: "@Momo, perfect timing! This horse is on Xianyu for 20k. Help me sell him!",
        zh: "@Momo，你来得正好！这马挂闲鱼两万了。帮我卖掉它！"
      },
      {
        speaker: "白龙马",
        color: "#A05020",
        avatar: "白",
        en: "SELL me?! I carried bags for fourteen years! @Momo is that fair to you?",
        zh: "卖我？！我驮了十四年行李！@Momo 你觉得这公平吗？"
      }
    ],

    turns: [
      {
        cue: "先接住情绪，再问细节",
        hintLabel: "确认感受",
        example: "That's a long time. What happened?",
        exampleZh: "那是很久了。发生了什么？",
        user: "Wait, sell? I no understand. Horse not good. You tell me first.",
        replies: [
          { speaker: "八戒", color: "#C84B31", avatar: "八", en: "Oh, new guy! Simple: I put the horse on sale. 20k yuan. Good deal, right? He just carries bags.", zh: "哦，新来的！简单：我把马挂闲鱼了，两万块。划算吧？他就驮个行李而已。" },
          { speaker: "白龙马", color: "#1A8A6E", avatar: "白", en: "“Just carries bags”? I carried fourteen years! Across rivers and mountains. Is that fair?", zh: "“就驮个行李”？我驮了十四年！过河、翻山！你觉得这公平吗？" }
        ]
      },
      {
        cue: "白龙马向你求声援，回应他的付出",
        example: "Selling him like old shoes is not fair.",
        user: "14 years carry bags, very hard. Sell like old shoes, not fair.",
        replies: [
          { speaker: "八戒", color: "#C84B31", avatar: "八", en: "Hey, you don't get it. He eats a lot. Who pays for his food? Me!", zh: "嘿，你不懂。他吃得可多了。谁付他的饭钱？我！" },
          { speaker: "白龙马", color: "#1A8A6E", avatar: "白", en: "See? Someone with a heart! Fourteen years of work, and he only sees my food bill.", zh: "看见没？总算有个有良心的！十四年的苦力，他就只看得见我的饭钱。" }
        ]
      },
      {
        cue: "八戒要你打破僵局，明确给出主张",
        example: "He has no right to sell you.",
        user: "Zhu Bajie no right. 14 year work not just 20k.",
        replies: [
          { speaker: "白龙马", color: "#1A8A6E", avatar: "白", en: "Thank you! So I stay. He can keep the listing down.", zh: "谢谢你！所以我留下。他可以下架了。" },
          { speaker: "八戒", color: "#C84B31", avatar: "八", en: "Fine, fine. I'll keep him. But no more free rides.", zh: "行吧行吧。我留下他。但别再想白坐车了。" }
        ]
      }
    ],

    settlement: {
      publisher: "东海商报 · 后续",
      headline: "白龙马工龄被当废铁价，网友怒斥不公",
      duration: "0:46",
      words: "34",
      bullets: ["孙悟空在群里发了个抱拳表情，配文“老马辛苦了”。", "猪八戒私聊唐僧问：“咱那行李马真只值两万？”"],
      title: "工龄十四年维权者"
    },

    expressions: [
      {
        raw: "Wait, sell? I no understand. Horse not good. You tell me first.",
        better: "Wait, sell the horse? I don't understand. Tell me what happened first.",
        highlights: ["Tell me", "first"],
        label: "追问细节",
        pattern: "Tell me [发生了什么] first."
      },
      {
        raw: "14 years carry bags, very hard. Sell like old shoes, not fair.",
        better: "I carried bags for 14 years. Selling me like old shoes is just not fair.",
        highlights: ["carried", "for", "not fair"],
        label: "附和感受",
        pattern: "[某人] carried [某物] for [时间]."
      },
      {
        raw: "Zhu Bajie no right. 14 year work not just 20k.",
        better: "Zhu Bajie has no right to sell you. Your 14 years of work are worth much more than that.",
        highlights: ["has no right to", "worth much more"],
        label: "坚定表态",
        pattern: "[某人] has no right to [做什么]."
      }
    ]
  };
})();
