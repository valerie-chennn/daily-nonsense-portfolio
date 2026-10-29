const IMG={
  linShow:'assets/lin-show.jpg',
  linPortrait:'assets/lin-portrait.jpg',
  linDrama:'assets/lin-drama.jpg',
  linOld:'assets/lin-old.jpeg',
  tech:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=82',
  code:'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=700&q=82',
  diagram:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=82',
  robot:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=82',
  swiss:'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=82',
  train:'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=700&q=82',
  mountain:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=82',
  city:'https://images.unsplash.com/photo-1528493366314-e317cd98dd52?auto=format&fit=crop&w=700&q=82',
  home:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=82',
  cook:'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=82',
  room:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=82',
  night:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=82'
};

const TOPICS={
  '地球超新鲜 林一':{
    title:'林一 · 地球超新鲜',kind:'人物与综艺',summary:'发烧电音、粤语跑偏、菜名干扰，林一在节目里的几个名场面都在这里',
    modules:[
      {title:'《地球超新鲜》',items:[
        {id:'electric-voice',point:'发烧后电音神似秦岚',videos:[
          {title:'一开口自带电音，郭京飞当场听愣',author:'@地球超新鲜 · 26.5万赞',img:IMG.linShow,duration:'01:18'},
          {title:'郭京飞追问是不是和秦岚得了同一种病',author:'@节目片段放映室 · 8.7万赞',img:IMG.linPortrait,duration:'02:06'}],extraVideos:[
          {title:'电音嗓再现，嘉宾听第一句就笑场',author:'@地球团名场面 · 6.4万赞',img:IMG.linShow,duration:'01:36'}]},
        {id:'chuchuwen',point:'《处处吻》唱成自创语种',videos:[
          {title:'前半段只张嘴没声音，李乃文急到跺脚',author:'@综艺显微镜 · 12.3万赞',img:IMG.linShow,duration:'03:11'},
          {title:'粤语彻底跑偏，郭京飞笑到拿纸巾',author:'@地球团名场面 · 7.9万赞',img:IMG.linPortrait,duration:'03:48'}]},
        {id:'childhood-song',point:'背《童年》被一串菜名带跑',videos:[
          {title:'孙红雷连报螃蟹螺蛳烧饼，林一当场串词',author:'@地球超新鲜 · 9.4万赞',img:IMG.linShow,duration:'00:40'}]}
      ]},
      {title:'近期抖音动态',videos:[
        {title:'林一更新节目录制随拍',author:'@林一 · 本人账号',img:IMG.linPortrait,duration:'01:42'},
        {title:'工作室放出后台花絮',author:'@林一工作室',img:IMG.linShow,duration:'00:56'}]}
    ],
    related:['林一其他综艺','林一参演剧集','林一最近在拍什么'],
    followups:{
      '林一其他综艺':{
        summary:'从赛车竞技到麻花家族，林一在其他综艺里也留下不少名场面',
        modules:[
          {title:'《风驰赛车手》',items:[
            {point:'卡丁车大战被全员围攻',videos:[
              {title:'刚冲到前排就被三辆车同时夹击',author:'@风驰赛车手 · 18.6万赞',img:IMG.linShow,duration:'02:18'},
              {title:'复仇局一路追到终点，林一终于扳回一城',author:'@综艺热场 · 7.2万赞',img:IMG.linPortrait,duration:'03:06'}]}
          ]},
          {title:'《麻花特开心2》',items:[
            {point:'游戏环节接连被整',videos:[
              {title:'规则没听明白就开冲，结果第一个出局',author:'@麻花特开心 · 11.8万赞',img:IMG.linPortrait,duration:'02:42'},
              {title:'沈腾临时加戏，林一反应慢半拍',author:'@快乐放映室 · 6.9万赞',img:IMG.linShow,duration:'01:54'}]}
          ]}
        ]
      },
      '林一参演剧集':{
        summary:'从顾未易到顾寻，几部代表作里都有很明确的角色记忆点',
        modules:[
          {title:'《致我们暖暖的小时光》｜林一 × 邢菲',detail:'高冷物理系学霸 × 元气少女，顾未易让林一第一次大范围出圈',videos:[
            {title:'顾未易一本正经吃醋的几个瞬间',author:'@国产剧记忆 · 14.6万赞',img:IMG.linOld,duration:'05:09'}]},
          {title:'《别对我动心》｜林一 × 周也',detail:'高冷校草 × 直球少女，顾寻的双面设定很有记忆点',videos:[
            {title:'游戏里拒绝周也，现实中追人追到翻车',author:'@今日追剧 · 11.2万赞',img:IMG.linDrama,duration:'04:17'}]},
          {title:'《嘘，国王在冬眠》｜林一 × 虞书欣',detail:'天才滑雪运动员 × 低谷漫画家，雪场 CP 氛围感很足',videos:[
            {title:'单崇雪场训练和心动片段合集',author:'@追剧日历 · 9.8万赞',img:IMG.linPortrait,duration:'04:36'}]}
        ]
      },
      '林一最近在拍什么':{
        summary:'近期公开物料里，新剧预告和片场更新最受关注',
        modules:[
          {title:'近期作品',videos:[
            {title:'《阿禅》首支预告，林一挑战灵魂互换',author:'@优酷 · 5.1万赞',img:IMG.linDrama,duration:'03:26'},
            {title:'工作室发布新剧拍摄花絮',author:'@林一工作室',img:IMG.linPortrait,duration:'01:16'}]}
        ]
      }
    }
  },
  'RAG 是怎么工作的':{
    title:'RAG 是怎么工作的',kind:'知识学习',summary:'你提出问题后，RAG 会先检索相关资料，再把找到的内容和问题一起交给大模型，让它参考这些资料生成回答',
    modules:[
      {title:'一次回答经过三个环节',items:[
        {point:'资料先被整理成方便检索的片段',videos:[
          {title:'动画演示：文档如何被切分和整理',author:'@工程师小周 · 1.2万赞',img:IMG.diagram,duration:'05:36'}]},
        {point:'提问后，系统从资料库里找出相关内容',videos:[
          {title:'向量搜索到底在比较什么',author:'@模型实验室 · 9,630赞',img:IMG.code,duration:'07:18'},
          {title:'一个问题如何找到最相关的三段资料',author:'@AI不说黑话 · 3.8万赞',img:IMG.tech,duration:'06:42'}]},
        {point:'模型结合找到的资料，组织出最终回答',videos:[
          {title:'从用户提问到生成答案，完整跑一遍 RAG',author:'@产品与AI · 2.4万赞',img:IMG.robot,duration:'08:24'}]}
      ]}
    ],
    related:['RAG 适合解决什么问题','怎么搭一个 RAG 知识库','RAG 为什么会答错'],
    followups:{
      'RAG 适合解决什么问题':{
        summary:'RAG 更适合答案依赖外部资料，而且资料会持续更新的任务',
        modules:[
          {title:'常见使用场景',items:[
            {point:'企业知识库、智能客服和资料问答最常见',videos:[
              {title:'三个真实场景看懂什么时候该用 RAG',author:'@AI产品手册 · 2.1万赞',img:IMG.robot,duration:'07:38'},
              {title:'客服机器人为什么需要先查资料',author:'@技术复盘局 · 7,801赞',img:IMG.tech,duration:'06:43'}]}
          ]}
        ]
      },
      '怎么搭一个 RAG 知识库':{
        summary:'从准备资料到检索和生成，一个最小版本可以拆成四步',
        modules:[
          {title:'最小搭建流程',items:[
            {point:'准备文档、切分内容、建立检索，再接入大模型',videos:[
              {title:'从零搭一个可以问答的知识库',author:'@工程师小周 · 4.6万赞',img:IMG.code,duration:'12:26'},
              {title:'不写代码也能跑通的 RAG Demo',author:'@AI工具箱 · 3.2万赞',img:IMG.diagram,duration:'09:14'}]}
          ]}
        ]
      },
      'RAG 为什么会答错':{
        summary:'资料没找到、找到的内容不相关，或者模型没有正确使用资料，都可能让答案跑偏',
        modules:[
          {title:'常见错误来源',items:[
            {point:'先判断问题出在检索，还是出在生成',videos:[
              {title:'RAG 答错时应该先查哪一步',author:'@模型实验室 · 1.7万赞',img:IMG.tech,duration:'08:05'},
              {title:'五个常见 Bad Case 逐个拆解',author:'@技术复盘局 · 1.1万赞',img:IMG.code,duration:'10:18'}]}
          ]}
        ]
      }
    }
  },
  '瑞士旅游攻略':{
    title:'瑞士旅游攻略',kind:'旅行攻略',summary:'可以先按想看的风景选路线，湖边小镇、雪山徒步和观景火车对应不同的旅行节奏',
    modules:[
      {title:'湖边小镇',detail:'想慢慢走，可以围绕湖区安排城市和小镇',videos:[
        {title:'住进湖边小镇，慢慢走完卢塞恩',author:'@旅居日记 · 3.9万赞',img:IMG.city,duration:'07:21'},
        {title:'从苏黎世坐船去看湖区日落',author:'@栗子的旅行 · 5.7万赞',img:IMG.swiss,duration:'09:42'}]},
      {title:'雪山徒步',detail:'想多看山景，可以重点比较路线难度和沿途风景',videos:[
        {title:'新手也能走的雪山徒步路线',author:'@山野阿洛 · 4.1万赞',img:IMG.mountain,duration:'08:16'},
        {title:'两条经典路线，哪条风景更值得',author:'@去山里吧 · 3.4万赞',img:IMG.swiss,duration:'06:48'}]},
      {title:'观景火车',detail:'想坐着看风景，可以围绕铁路沿线安排停留',videos:[
        {title:'不徒步也能看到的 5 段雪山风景',author:'@火车旅行家 · 6.3万赞',img:IMG.train,duration:'06:58'},
        {title:'黄金列车沿线应该在哪几站下车',author:'@欧洲慢游 · 2.9万赞',img:IMG.city,duration:'07:46'}]}
    ],
    related:['瑞士七天怎么安排','瑞士通票怎么选','瑞士住哪里方便'],
    followups:{
      '瑞士七天怎么安排':{
        summary:'第一次去七天，可以用苏黎世、卢塞恩和因特拉肯串起城市、湖区和雪山',
        modules:[
          {title:'七天路线参考',videos:[
            {title:'瑞士 7 天：城市、湖区和雪山一次看完',author:'@栗子的旅行 · 5.7万赞',img:IMG.swiss,duration:'09:42'},
            {title:'不赶路的瑞士七天怎么排',author:'@旅居日记 · 3.9万赞',img:IMG.city,duration:'08:15'}]}
        ]
      },
      '瑞士通票怎么选':{
        summary:'先看乘车天数和是否频繁跨城，再比较连续通票和半价卡',
        modules:[
          {title:'交通票选择',videos:[
            {title:'瑞士通票怎么选才不会多花钱',author:'@欧洲攻略员 · 2.7万赞',img:IMG.train,duration:'05:37'},
            {title:'连续通票和半价卡到底差多少',author:'@旅行算账本 · 1.9万赞',img:IMG.code,duration:'06:11'}]}
        ]
      },
      '瑞士住哪里方便':{
        summary:'住宿地点取决于主要路线，卢塞恩适合湖区，因特拉肯更方便进雪山',
        modules:[
          {title:'落脚城市怎么选',videos:[
            {title:'三座落脚城市的真实体验',author:'@出发之前 · 1.8万赞',img:IMG.city,duration:'04:44'},
            {title:'住在因特拉肯还是格林德瓦',author:'@山下住宿局 · 2.3万赞',img:IMG.mountain,duration:'06:26'}]}
        ]
      }
    }
  },
  '有什么 vlog 好看的':{
    title:'有什么 vlog 好看的',kind:'风格探索',summary:'喜欢安静看生活，可以看做饭和居家记录，想有人陪着聊聊，可以看边做事边聊天的日常',
    modules:[
      {title:'安静生活',detail:'阿禾偏做饭和厨房日常，木子偏阅读和房间整理',videos:[
        {title:'下班后，一个人做饭和收拾房间',author:'@阿禾的家 · 4.9万赞',img:IMG.cook,duration:'07:16'},
        {title:'周日不出门：阅读、插花、整理书桌',author:'@木子生活记 · 3.5万赞',img:IMG.room,duration:'06:08'}]},
      {title:'聊天日常',detail:'栗栗常聊下班后的心情，小满更爱分享生活里的小事',videos:[
        {title:'加班回家以后，我怎么恢复电量',author:'@栗栗 · 6.2万赞',img:IMG.night,duration:'08:31'},
        {title:'边收拾边聊最近开心的五件小事',author:'@小满日常 · 2.8万赞',img:IMG.home,duration:'05:43'}]},
      {title:'普通工作日',detail:'一人份生活拍通勤和吃饭，住在502常记录收拾屋子',videos:[
        {title:'来不及做饭的普通工作日',author:'@一人份生活 · 3.1万赞',img:IMG.home,duration:'06:19'},
        {title:'房间乱了三天，终于开始大扫除',author:'@住在502 · 5.4万赞',img:IMG.room,duration:'09:07'}]}
    ],
    related:['更多安静做饭的 vlog','阿禾的其他视频','下班后治愈 vlog'],
    followups:{
      '更多安静做饭的 vlog':{
        summary:'少说话、保留环境声和做饭过程，是这类视频最明显的特点',
        modules:[
          {title:'安静做饭',videos:[
            {title:'下雨天在家煮一锅番茄牛腩',author:'@厨房里的晚风 · 3.7万赞',img:IMG.cook,duration:'08:22'},
            {title:'没有旁白的一人食晚餐',author:'@今晚吃什么 · 4.2万赞',img:IMG.home,duration:'06:36'}]}
        ]
      },
      '阿禾的其他视频':{
        summary:'阿禾的视频主要围绕下班做饭、厨房收纳和一个人的周末',
        modules:[
          {title:'阿禾的家',videos:[
            {title:'周五下班后的冰箱清理和晚饭',author:'@阿禾的家 · 5.1万赞',img:IMG.cook,duration:'07:48'},
            {title:'一个人在家过周末，做饭看电影',author:'@阿禾的家 · 4.6万赞',img:IMG.room,duration:'09:03'}]}
        ]
      },
      '下班后治愈 vlog':{
        summary:'这类视频通常从通勤结束开始，用做饭、洗澡和收拾房间把一天慢下来',
        modules:[
          {title:'下班后的几个小时',videos:[
            {title:'加班回家以后，我怎么恢复电量',author:'@栗栗 · 6.2万赞',img:IMG.night,duration:'08:31'},
            {title:'回家先洗澡，再做一份简单晚饭',author:'@一人份生活 · 3.8万赞',img:IMG.home,duration:'07:12'}]}
        ]
      }
    }
  }
};

const PRESETS=['地球超新鲜 林一','RAG 是怎么工作的','瑞士旅游攻略','有什么 vlog 好看的'];
const state={screen:'search',searchReturn:'search',query:null,focus:null,history:[],topicScroll:0,suggestionsOpen:false,expandedItems:[],followups:[]};
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];

function setScreen(name){
  $$('.screen').forEach(screen=>screen.classList.toggle('active',screen.dataset.screen===name));
  state.screen=name;
  updateStory(name==='topic'&&(state.focus||state.followups.length)?'follow':name==='home'?'browse':name==='player'?'watch':name);
}

function updateStory(step){
  $$('.journey li').forEach(item=>item.classList.toggle('active',item.dataset.step===step));
  const topicCopy={
    '地球超新鲜 林一':['人物与事件类搜索','围绕事件<br>组织内容','按事件分组，同一事件下聚合不同视频'],
    'RAG 是怎么工作的':['知识理解类搜索','按问题所需的逻辑<br>组织回答','先简短回答，再按逻辑展开要点与视频'],
    '瑞士旅游攻略':['攻略决策类搜索','围绕选择<br>组织不同方案','按选择维度展开方案，组内呈现相关攻略'],
    '有什么 vlog 好看的':['内容探索类搜索','按内容风格<br>组织观看选择','按风格分组，介绍创作者特点']
  };
  const copy={
    browse:['01 · 主动搜索','搜索入口','从主动搜索<br>构建临时 Tab','用户通过搜索表达需求，系统据此确定内容范围和组织方式'],
    search:['01 · 主动搜索','主动搜索的一种可能：','基于用户 Query<br>构建临时 Tab','根据搜索意图组织回答，在 Tab 内以 Feed 流呈现相关内容，并随用户进一步的搜索继续展开'],
    topic:['02 · 内容组织',...(topicCopy[state.query]||['按意图组织','根据搜索意图<br>组织内容','先确定内容之间的关系，再匹配相关视频'])],
    more:['03 · 主题展开','围绕同一主题','展开同一事件的<br>更多内容','保持当前事件分组的主题范围，补充相关视频，让用户在感兴趣的事件下继续浏览'],
    follow:['03 · 兴趣延伸','延伸新的主题','在当前 Tab 内<br>延伸新的主题','根据用户进一步表达的意图，在当前 Tab 内追加新的内容分组，保留此前的浏览上下文'],
    watch:['04 · 视频观看','从选择到观看','双列浏览内容<br>单列沉浸观看','双列布局呈现内容之间的组织关系，点开视频后进入单列观看，返回时保留原有浏览位置']
  }[step];
  const topicPoints={
    '地球超新鲜 林一':['根据 Query 确定相关事件的范围','按事件分组<br>同一事件下聚合不同视频'],
    'RAG 是怎么工作的':['先简短回答用户的问题','根据问题选择流程、因果或对比结构<br>按逻辑展开要点与讲解视频'],
    '瑞士旅游攻略':['按影响选择的维度展开不同方案','在每种方案下呈现相关攻略<br>方便用户比较不同经验'],
    '有什么 vlog 好看的':['按风格分组<br>呈现不同的观看体验','介绍创作者各自的特点<br>帮助用户选择感兴趣的内容']
  };
  const points={
    search:['根据搜索意图组织回答','在 Tab 内以 Feed 流呈现相关内容','随用户进一步的搜索继续展开'],
    topic:topicPoints[state.query],
    more:['保持当前事件分组的主题范围','补充相关视频<br>让用户围绕感兴趣的事件继续浏览'],
    follow:['根据用户进一步表达的意图<br>追加新的内容分组','在当前 Tab 内向下延伸<br>保留此前的浏览上下文'],
    watch:['双列布局呈现内容之间的组织关系','点开视频进入单列观看<br>返回时保留原有浏览位置']
  }[step]||[copy[3]];
  $('#casePath').textContent=copy[0];$('#caseEyebrow').textContent=copy[1];$('#caseTitle').innerHTML=copy[2];$('#caseSummary').innerHTML=points.map(point=>`<li>${point}</li>`).join('');
  $('#caseEyebrow').hidden=step!=='search'&&step!=='topic';
  $('#caseAction').hidden=step!=='search';
  $('.hint').hidden=step!=='search';
}

function videoCard(video,context){
  return `<button class="video-card" data-video data-title="${video.title}" data-author="${video.author}" data-img="${video.img}" data-context="${context}"><div class="video-thumb"><img src="${video.img}" referrerpolicy="no-referrer" alt="${video.title}" /><span>${video.duration}</span></div><b>${video.title}</b><small>${video.author}</small></button>`;
}

function renderPresets(){
  $('#presetList').innerHTML=PRESETS.map(query=>`<button data-query="${query}">${query}</button>`).join('');
}

function renderHistory(){
  $('#historyList').innerHTML=state.history.length?state.history.map(query=>`<button data-query="${query}">${query}</button>`).join(''):'<span class="history-empty">还没有搜索记录</span>';
}

function setSuggestions(open){
  state.suggestionsOpen=open;
  $('.search-screen').classList.toggle('suggestions-open',open);
  $('#searchInput').setAttribute('aria-expanded',String(open));
  if(open)updateStory('search');
}

function runSearch(query){
  const topic=TOPICS[query];
  if(!topic){showToast('第一版先开放四个演示搜索');return}
  if(!state.history.includes(query))state.history.unshift(query);
  state.query=query;state.focus=null;state.topicScroll=0;state.expandedItems=[];state.followups=[];
  $('#searchInput').value=query;
  renderHistory();renderTopic();setScreen('topic');
  showToast(`已生成「${topic.title}」临时 Tab`);
}

function renderVideoGrid(videos,context){
  return `<div class="video-grid ${videos.length===1?'single-video':''}">${videos.map(video=>videoCard(video,context)).join('')}</div>`;
}

function renderModule(module,context,moduleIndex='base'){
  const detail=module.detail?`<p>${module.detail}</p>`:'';
  const directVideos=module.videos?renderVideoGrid(module.videos,context):'';
  const items=(module.items||[]).map((item,itemIndex)=>{
    const itemKey=`${moduleIndex}-${item.id||itemIndex}`;
    const expanded=state.expandedItems.includes(itemKey);
    const videos=expanded?[...item.videos,...(item.extraVideos||[])]:item.videos;
    const more=item.extraVideos?.length&&!expanded?`<button class="more-clips" data-more-videos="${itemKey}">更多片段 ↓</button>`:'';
    return `<section class="story-point"><div class="group-head"><p>${item.point}</p></div>${renderVideoGrid(videos,context)}${more}</section>`;
  }).join('');
  return `<section class="topic-module"><header class="module-head"><h2>${module.title}</h2>${detail}</header>${directVideos}${items}</section>`;
}

function renderRelated(topic){
  const remaining=topic.related.filter(query=>!state.followups.includes(query));
  if(!remaining.length)return '';
  return `<section class="related-search"><h2>相关搜索</h2><div class="related-list">${remaining.map(query=>`<button data-related="${query}"><span>⌕</span>${query}<b>›</b></button>`).join('')}</div></section>`;
}

function renderTopic(){
  const topic=TOPICS[state.query];
  const title=topic.title;
  $('#tempTab').textContent=`${title} ×`;
  const intro=`<span class="topic-kicker">${topic.kind}</span><h1>${title}</h1><p>${topic.summary}</p>`;
  if(topic.modules){
    const baseModules=topic.modules.map((module,index)=>renderModule(module,title,`base-${index}`)).join('');
    const followupModules=state.followups.map((query,followupIndex)=>{
      const followup=topic.followups[query];
      return `<section class="followup-block" id="followup-${followupIndex}"><header class="followup-head"><span>相关搜索</span><h2>${query}</h2><p>${followup.summary}</p></header>${followup.modules.map((module,index)=>renderModule(module,query,`followup-${followupIndex}-${index}`)).join('')}</section>`;
    }).join('');
    $('#topicScroll').innerHTML=`<section class="topic-intro">${intro}</section>${baseModules}${followupModules}${renderRelated(topic)}`;
  }else{
    $('#topicScroll').innerHTML=`<section class="topic-intro">${intro}</section>${topic.sections.map(section=>`<section class="content-group"><div class="group-head"><p>${section.point}</p></div>${renderVideoGrid(section.videos,title)}</section>`).join('')}`;
  }
  $('#topicScroll').scrollTop=state.topicScroll;
}

function exitTopic(){
  state.query=null;state.focus=null;state.topicScroll=0;state.expandedItems=[];state.followups=[];
  renderHistory();$('#searchInput').value='';setSuggestions(false);setScreen('search');showToast('搜索已保留在记录中');
}

function openSearch(returnTo){state.searchReturn=returnTo;renderHistory();$('#searchInput').value='';setSuggestions(false);setScreen('search')}

function openPlayer(card){
  state.topicScroll=$('#topicScroll').scrollTop;
  $('#playerBackdrop').style.backgroundImage=`url('${card.dataset.img}')`;
  $('#playerTitle').textContent=card.dataset.title;$('#playerAuthor').textContent=card.dataset.author;$('#playerContext').textContent=`来自「${card.dataset.context}」`;
  setScreen('player');
}

function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),1600)}

document.addEventListener('click',event=>{
  const queryButton=event.target.closest('[data-query]');if(queryButton){runSearch(queryButton.dataset.query);return}
  const video=event.target.closest('[data-video]');if(video){openPlayer(video);return}
  const moreVideos=event.target.closest('[data-more-videos]');if(moreVideos){state.topicScroll=$('#topicScroll').scrollTop;state.expandedItems.push(moreVideos.dataset.moreVideos);renderTopic();updateStory('more');showToast('已展开更多片段');return}
  const related=event.target.closest('[data-related]');if(related){
    const query=related.dataset.related;
    if(!state.followups.includes(query))state.followups.push(query);
    state.topicScroll=$('#topicScroll').scrollTop;
    renderTopic();updateStory('follow');
    requestAnimationFrame(()=>{const target=$(`#followup-${state.followups.length-1}`);target?.scrollIntoView({behavior:'smooth',block:'start'})});
    return
  }
  if(event.target.closest('[data-back]'))setScreen(state.searchReturn);
});

$('#topicSearch').onclick=()=>openSearch('topic');
$('#recommendTab').onclick=exitTopic;
$('#tempTab').onclick=exitTopic;
$('#playerBack').onclick=()=>{renderTopic();setScreen('topic')};
$('#clearHistory').onclick=()=>{state.history=[];renderHistory()};
$('#searchForm').onsubmit=event=>{event.preventDefault();const query=$('#searchInput').value.trim();query?runSearch(query):setSuggestions(true)};
$('#searchInput').onclick=()=>setSuggestions(true);
$('.search-icon').onclick=()=>setSuggestions(true);
$('#caseAction').onclick=()=>setSuggestions(true);
$('#mobileGuide').onclick=()=>{$('#introPanel').classList.add('open');$('#guideMask').classList.add('open')};
$('#guideMask').onclick=()=>{$('#introPanel').classList.remove('open');$('#guideMask').classList.remove('open')};

renderPresets();renderHistory();updateStory('search');
