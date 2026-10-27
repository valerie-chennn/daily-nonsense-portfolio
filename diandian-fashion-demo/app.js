const screens=[...document.querySelectorAll('[data-screen]')];
const journey=[...document.querySelectorAll('[data-journey]')];
const toast=document.getElementById('toast');
let current='intent';
let pendingLook='sneaker';
let lastResult='refine';
const guide={
  intent:{stage:'intent',path:'CORE / 意图分流',title:'同一张穿搭图，背后可能是不同任务',problem:'让只发图片的用户不必先组织问题，也能快速进入最可能的任务。',design:'点点先识别图片中的核心内容，再将可能的任务显式化；不同意图分别进入生成、个人适配或社区搜索。',tags:['图片理解','意图识别','问答策略'],next:'refine'},
  'fit-start':{stage:'context',path:'PATH B-1 / 个人信息',title:'只在个性化判断前补充必要依据',problem:'在不增加过多输入负担的前提下，为个人适配判断获得可靠的用户依据。',design:'点点只请求一个关键输入：用户主动选择 REDshop 保存的试穿形象，或上传新的正面全身照。',tags:['多图理解','个性化输入','追问策略'],next:'fit-result'},
  'fit-result':{stage:'result',path:'PATH B-2 / 适配判断',title:'把“适不适合”变成一套可解释的个人适配机制',problem:'帮助用户理解参考穿搭迁移到自己身上会产生什么效果，以及哪些要素需要保留或调整。',design:'点点先把参考穿搭拆解为长度、版型、廓形和量感等变量，再分析它们与用户个人比例的关系；通过图片标注解释判断，并生成适配后的个人版本。',tags:['跨图理解','适配判断','图片标注','个性化生成'],next:'shop'},
  similar:{stage:'result',path:'PATH C / 社区图搜',title:'把模糊的“找相似”变成用户可以控制的图片搜索',problem:'让用户更快找到真正想参考的社区穿搭，并能随时调整“相似”的重点。',design:'点点从输入图片中提取可检索的视觉特征，并显示为可编辑条件；用户可以切换整体、单品、版型或配色等维度，结果保留原笔记内容与社区信息。',tags:['图片搜索','搜索意图修正','社区内容组织'],next:'shop'},
  refine:{stage:'result',path:'PATH A / 场景改造',title:'用户选定目标后，直接交付可编辑的第一版',problem:'让用户在明确场景目标后尽快看到可用方案，并能围绕结果继续表达偏好。',design:'点点直接生成完整版本，将变化位置与前后差异标注在图上；同一标注也作为局部编辑入口。',tags:['图片生成','变化表达','局部编辑'],next:'shop'},
  shop:{stage:'shop',path:'COMMERCE / REDshop',title:'用户认可方案后，再把建议转化为商品选择',problem:'在用户确认穿搭方向后，将方案自然转化为可试穿、可选择的商品组合。',design:'将已经确认的穿搭方案和用户选择带入 REDshop，区分已有相似单品与建议购买单品，并继续支持整套试穿。',tags:['上下文继承','试穿决策','交易承接'],next:'intent'}
};
function show(name){
  if(name==='shop'&&(current==='refine'||current==='fit-result'||current==='similar'))lastResult=current;
  if(name!=='similar'){
    document.getElementById('noteSheet')?.classList.remove('open');
    document.getElementById('noteSheetMask')?.classList.remove('open');
  }
  current=name;
  document.querySelector('.phone').scrollTop=0;
  screens.forEach(screen=>screen.classList.toggle('active',screen.dataset.screen===name));
  const data=guide[name];
  journey.forEach(item=>item.classList.toggle('active',item.dataset.journey===data.stage));
  document.getElementById('stepPath').textContent=data.path;
  document.getElementById('stepTitle').textContent=data.title;
  document.getElementById('stepProblem').textContent=data.problem;
  document.getElementById('stepDesign').textContent=data.design;
  document.getElementById('stepTags').innerHTML=data.tags.map(tag=>`<span>${tag}</span>`).join('');
  const demoNavigation=document.getElementById('demoNavigation');
  const resultPaths=['refine','fit-result','similar','shop'];
  demoNavigation.hidden=!resultPaths.includes(name);
  if(resultPaths.includes(name)){
    const source=name==='shop'?lastResult:name;
    const remaining={
      refine:'“场景改造”的核心体验已完成。可以继续进入 REDshop，或返回主入口体验个人适配和社区图搜。',
      'fit-result':'“个人适配”的核心体验已完成。可以继续查看相似内容，或返回主入口体验场景改造和社区图搜。',
      similar:'“社区图搜”的核心体验已完成。可以继续打开笔记，或返回主入口体验场景改造和个人适配。'
    };
    document.getElementById('demoNavigationCopy').textContent=remaining[source]||'返回主入口，还可以体验另外两种图片任务。';
  }
}
function notify(message){
  toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1500);
}
document.addEventListener('click',event=>{
  const go=event.target.closest('[data-go]');if(go)show(go.dataset.go);
  const notice=event.target.closest('[data-demo-toast]');if(notice)notify(notice.dataset.demoToast);
});
document.querySelector('[data-show-related]')?.addEventListener('click',()=>{
  const box=document.getElementById('relatedInline');box.hidden=!box.hidden;
});
document.querySelector('[data-show-related-result]').addEventListener('click',()=>{
  const box=document.getElementById('relatedResult');box.hidden=!box.hidden;
});
document.querySelector('[data-show-fit-related]').addEventListener('click',()=>{
  const box=document.getElementById('fitRelated');box.hidden=!box.hidden;
});
document.querySelector('[data-back-result]').addEventListener('click',()=>show(lastResult));
document.getElementById('returnToDemoHome').addEventListener('click',()=>show('intent'));
const similarFilters=[...document.querySelectorAll('[data-similar-filter]')];
const searchNotes=[...document.querySelectorAll('.search-note')];
similarFilters.forEach(filter=>filter.addEventListener('click',()=>{
  const selected=filter.dataset.similarFilter;
  similarFilters.forEach(item=>item.classList.toggle('active',item===filter));
  searchNotes.forEach((note,index)=>{
    const matched=selected==='overall'?note.dataset.noteTags.includes('overall'):note.dataset.noteTags.includes(selected);
    note.style.order=matched?index:index+10;
    note.classList.toggle('less-relevant',!matched);
  });
}));
const noteSheet=document.getElementById('noteSheet');
const noteSheetMask=document.getElementById('noteSheetMask');
function closeNoteSheet(){noteSheet.classList.remove('open');noteSheetMask.classList.remove('open');noteSheet.setAttribute('aria-hidden','true')}
searchNotes.forEach(note=>note.addEventListener('click',()=>{
  document.getElementById('notePreviewImage').src=note.dataset.noteImage;
  document.getElementById('notePreviewTitle').textContent=note.dataset.noteTitle;
  document.getElementById('notePreviewAuthor').textContent=note.dataset.noteAuthor;
  noteSheet.classList.add('open');noteSheetMask.classList.add('open');noteSheet.setAttribute('aria-hidden','false');
}));
document.getElementById('closeNoteSheet').addEventListener('click',closeNoteSheet);
noteSheetMask.addEventListener('click',closeNoteSheet);
document.querySelector('[data-reference-generate]').addEventListener('click',()=>{
  closeNoteSheet();show('refine');notify('已把这篇笔记加入生成参考');
});
const compareOriginal=document.getElementById('compareOriginal');
const resultLook=document.getElementById('resultLook');
const resultVisual=document.getElementById('resultVisual');
const resultImageLabel=document.getElementById('resultImageLabel');
let showingOriginal=false;
compareOriginal.addEventListener('click',()=>{
  showingOriginal=!showingOriginal;
  resultLook.src=showingOriginal?'./assets/feed-look.png':resultLook.dataset.generated||'./assets/look-sneaker.png';
  resultLook.alt=showingOriginal?'用户发来的原穿搭':'点点生成的日常通勤穿搭';
  compareOriginal.textContent=showingOriginal?'返回通勤版':'查看原图';
  resultImageLabel.textContent=showingOriginal?'原图':'AI 穿搭示意';
  resultVisual.classList.toggle('showing-original',showingOriginal);
});
const sheet=document.getElementById('editSheet');
const mask=document.getElementById('sheetMask');
const shoeOptions=document.getElementById('shoeOptions');
const jacketOptions=document.getElementById('jacketOptions');
let currentEditor='shoes';
function openEditor(type){
  currentEditor=type;
  document.getElementById('editTitle').textContent=type==='shoes'?'换一双鞋':'换件外套';
  shoeOptions.hidden=type!=='shoes';jacketOptions.hidden=type!=='jacket';
  sheet.classList.add('open');mask.classList.add('open');sheet.setAttribute('aria-hidden','false');
}
function closeEditor(){sheet.classList.remove('open');mask.classList.remove('open');sheet.setAttribute('aria-hidden','true')}
document.querySelectorAll('[data-edit]').forEach(button=>button.addEventListener('click',()=>openEditor(button.dataset.edit)));
document.getElementById('closeSheet').addEventListener('click',closeEditor);mask.addEventListener('click',closeEditor);
document.querySelectorAll('[data-look]').forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.category;
  if(category==='shoes')pendingLook=button.dataset.look;
  resultLook.src=button.dataset.image;
  resultLook.dataset.generated=button.dataset.image;
  document.getElementById('shopLook').src=button.dataset.image;
  document.querySelectorAll(`[data-category="${category}"]`).forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.querySelector('em').textContent=active?'✓':''});
  showingOriginal=false;compareOriginal.textContent='查看原图';resultImageLabel.textContent='AI 穿搭示意';resultVisual.classList.remove('showing-original');
}));
document.getElementById('applyChange').addEventListener('click',()=>{
  const labels={sneaker:'复古运动鞋',loafer:'乐福鞋',ballet:'芭蕾鞋'};
  if(currentEditor==='shoes')document.getElementById('shoeBenefit').textContent=labels[pendingLook];
  closeEditor();notify(currentEditor==='shoes'?'已更新鞋子':'已更新外套');
});
show('intent');
