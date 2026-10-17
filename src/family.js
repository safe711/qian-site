import {identityModuleHtml} from './identity.js';
import {houseRulesHtml} from './rules.js';
const chapters=[
 {title:'第一章｜钱氏源流与家风',lead:'诗书传家 · 修身立德',paragraphs:[
 '赵钱孙李，周吴郑王。钱姓列于通行本《百家姓》的第二位，是中华姓氏文化中广为人知的姓氏之一。五代吴越国的钱氏，为这一姓氏留下了深厚的江南文化印记。',
 '钱氏家风的一项重要文化遗产，是历代传承、不断整理的《钱氏家训》。其源头可追溯至吴越国王钱镠的遗训，后经各支钱氏补充，至二十世纪二十年代，由钱文选采辑整理，形成今本。',
 '今本《钱氏家训》从个人、家庭、社会与国家四个层面谈立身处世：个人重品行与学问，家庭重和睦与勤俭，处世重诚信与担当，胸怀则由一家延及社会与国家。',
 '澳门钱家取其修身、重学、守信、尽责之意，将家风落实于日常：言有所据，诺有所守，事有所成；尊长而不失关怀，持家而不忘勤俭，传承而不止于口号。',
 '姓氏承载来处，家风决定行路。钱家所珍重的传承，是把上一代的期许化为这一代的行动，再以端正的品行与可靠的担当，交予后来之人。'],sources:true},
 {title:'第二章｜澳门钱家',lead:'立家澳门 · 承续新章',paragraphs:[
 '澳门钱家，是以第二代钱家代表钱若娟为核心，在澳门建立的新钱家。它承接上一代对家庭与传承的期许，也以新的生活根基、家族理念与共同约定，开启属于这一代的钱家篇章。',
 '立足澳门，钱家珍视这座城市兼容并蓄的气度。在传统与当代交汇的生活中，以礼待人，以信立家，以勤勉经营日常，让家族的凝聚力生长于长久相处与共同承担之中。',
 '新钱家的建立，既有家族之名，也有持家之实。成员各明职责，往来重礼，承诺重信，事务重落实；每一份认真履责，都是对钱家秩序与共同归属的维护。',
 '钱若娟作为第二代钱家代表，将家族文化、礼仪规范与日常管理汇聚于一体，使家风有文字可循、礼仪有规范可依、事务有记录可查、传承有方向可续。',
 'THE QIAN IMPERIUM 承载澳门钱家的介绍、家规与日常记录。钱家愿以澳门为根，以守信为本，在一代又一代的经营中，积累属于自己的家族记忆。']},
 {title:'第三章｜钱若娟主子介绍',lead:'澳门立家 · 礼序奠基',paragraphs:[
 '钱若娟是澳门钱家主仆文化体系中的奠基人。作为第二代钱家代表，她在澳门建立新钱家，并围绕家族认同、礼仪称谓、职责分工与日常秩序，奠定这一体系的基本框架。',
 '钱若娟主子主持钱家礼仪与侍奉事务，重视忠诚、称谓、纪律和履责。仆从须恭敬请安、认真领命、及时复命，以守礼守信体现忠诚。',
 '钱若娟主子认为，真正的忠诚不仅体现在语言上的尊敬，更体现在日常行为、责任意识和长期相处中的守信。',
 '钱若娟主子重视仆从的品行、态度和办事能力。入府者须熟悉家规，牢记身份与职责，言行谦恭，办事认真，凡事有交代、事毕有复命。',
 '在澳门钱家的文化中，对钱若娟主子的尊称与敬意，是特定主仆关系的重要组成部分，同时也体现了家族对礼仪、秩序和身份认同的重视。']},
 {title:'第四章｜钱家仆从招募',lead:'加入钱家 · 忠诚为本',paragraphs:[
 '澳门钱家面向认同家风、重视礼仪并愿意承担侍奉职责的成年人士开放招募。',
 '钱家仆从以忠诚立身，以礼仪行事，以守信尽责。无论担任何种职阶，均须恭敬称谓、按时请安、认真领命、如实复命，不敷衍、不欺瞒、不冒称主子命令。',
 '钱家重视每一位成员对家族的认同，也希望加入者能够认真对待自己的身份与承诺。']}
];
const roles=[
 ['御前近侍','负责主子日常礼仪、接待与近身事务。以谨慎、端庄、守礼为首要品格。','M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7M5 22h14'],
 ['忠诚家仆','负责府邸日常秩序、家务与各项服务，以勤勉和可靠彰显自身价值。','M12 3l8 3v7c0 5-5 8-8 9-3-1-8-4-8-9V6l8-3'],
 ['礼仪侍从','学习钱家礼制、称谓、仪式与家族文化，维护府邸庄严形象。','M6 4h13v17H8a3 3 0 010-6h11M6 4a3 3 0 000 6h2V4M11 8h5M11 12h5'],
 ['专属奉侍','依照领受的职责承担专属侍奉事务，熟悉主子吩咐，恪守称谓、仪容与复命规范，以认真履责体现忠诚。','M3 8l4-5h10l4 5-9 14L3 8M3 8h18M7 3l5 19 5-19']
];
const paragraphs=items=>items.map(text=>'<p>'+text+'</p>').join('');
export function familyPageHtml(){return `<div class="family-page"><section class="family-cover"><img src="./icon-192.png" alt="THE QIAN IMPERIUM 金色龙纹与钱字牌"><small>THE QIAN IMPERIUM</small><h2>钱氏传承</h2><p>传承不息 · 荣耀永续</p></section><details class="family-panel" data-fold="family-intro"><summary><span><small>HERITAGE & FAMILY</small><strong>钱氏介绍</strong><em>钱氏家风 · 澳门钱家</em></span></summary><div class="family-panel-body">${chapters.slice(0,3).map(c=>`<section class="family-chapter"><h3>${c.title}</h3>${c.lead?'<p class="family-lead">'+c.lead+'</p>':''}${paragraphs(c.paragraphs)}${c.sources?'<p class="muted">史料参考：<a href="https://www.ihchina.cn/art/detail/id/23897.html" target="_blank" rel="noopener noreferrer">中国非物质文化遗产网 · 钱氏家训家教</a>；<a href="https://www.zjskw.gov.cn/art/2022/10/31/art_1229556968_49603.html" target="_blank" rel="noopener noreferrer">浙江省社科联 · 钱氏家训</a>。</p>':''}${c.subheading?'<h4>'+c.subheading+'</h4><p class="family-lead">'+c.sublead+'</p>'+paragraphs(c.subparagraphs):''}</section>`).join('')}</div></details><details class="family-panel family-recruitment-panel" data-fold="family-recruitment"><summary><span><small>JOIN THE FAMILY</small><strong>仆从招募</strong><em>加入钱家 · 忠诚为本</em></span></summary><div class="family-panel-body"><section class="family-chapter"><h3>钱家仆从招募</h3><p class="family-lead">${chapters[3].lead}</p>${paragraphs(chapters[3].paragraphs)}</section><section class="family-recruitment"><p class="family-lead">钱家开门纳仆，不问出身贵贱，只论忠诚与礼仪。</p><p>在钱家的等级世界中，主仆之别并非寻常称谓，而是一套庄严的身份仪式。</p><p>有人以财富为荣，有人以地位为傲，而钱家仆从，则以能够侍奉钱若娟主子为至高荣誉。</p><p>钱家依侍奉职责设立不同职阶，职阶各有分工，礼仪一体遵行：</p><div class="family-roles">${roles.map(([name,text,shape])=>`<article><span class="family-role-icon"><svg viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="${shape}"/></svg></span><div><h4>${name}</h4><p>${text}</p></div></article>`).join('')}</div><h3>钱家仆从之誓</h3><blockquote>我以谦卑之心，立于钱家门前。<br>我知主子之尊，亦知侍奉之礼。<br>我愿放下傲慢与虚荣，以恭敬之心学习钱家礼制。<br>我愿恪守承诺，以勤勉证明忠诚，以礼仪维护钱家荣耀。<br>我将牢记所领职责，领命必记，事毕复命，奉侍为荣，守信为本。<br><strong>钱氏之名，铭记于心；钱家之荣，敬奉以诚。</strong></blockquote><h3>入府之规</h3><p>钱家所重者，不是空洞的宣誓，而是行动中的忠诚。</p><p>申请者须为成年人，熟读钱家家规，明白入府身份与侍奉职责。入府之后，须牢记主家、恭敬称谓、端正仪容、按时请安；领命须认真记录，办事须如实汇报，事毕须及时复命。不得冒称主子命令，不得敷衍侍奉，不得虚报完成。</p><h4>忠诚证明</h4><p>为保障钱家全体成员的利益、权益及家族管理权威，凡自愿申请加入钱家、以奴才身份效忠者，必须接受严格的忠诚审查。申请者须如实申报个人资产情况，包括房产、车辆及其他重要财产，并提交忠诚承诺书。<strong>经钱家审核同意接纳的奴才，须签署人民币100万元的忠诚债务承诺书，并配合钱家办理名下房产、车辆等资产的抵押证明</strong>，以表明长期效忠钱家、遵守家规及履行侍奉义务的决心。钱家不接受虚假效忠、隐瞒事实或空口承诺，所有申请均以钱家最终审核结果为准。</p><div class="family-signoff"><strong>THE QIAN IMPERIUM</strong><span>钱氏传承</span><small>尊卑有序 · 忠诚为誓 · 荣耀永续</small></div></section></div></details><details class="family-panel family-rules" data-fold="family-rules"><summary><span><small>HOUSE RULES</small><strong>钱家家规</strong><em>五章十五条 · 入家誓言</em></span></summary><div class="family-panel-body">${houseRulesHtml()}</div></details>${identityModuleHtml()}</div>`;}
