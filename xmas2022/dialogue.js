var scene, renderer, camera;
var role;
var roles = [];
var background = [];

var loader = new THREE.TextureLoader();
var angle = 0;
var swap = false;

var name = prompt('請輸入名字', "小雞患者");

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  //鏡頭
  if (window.matchMedia("(orientation: portrait)").matches) {
    camera = new THREE.OrthographicCamera(-25, 25, 100, -100, -10, 100);
  } 
  else {
    camera = new THREE.OrthographicCamera(-50, 50, 50, -50, -10, 100);
  }
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function buildBackground() {
  var geometry = new THREE.BufferGeometry();
  let vertices = [];
  let uvs = [];
  let indices = [0, 1, 2, 0, 2, 3];
  vertices.push(
    -30, -50, 0,
    30, -50, 0,
    30, 50, 0,
    -30, 50, 0
  );
  uvs.push(
    0, 0,
    1, 0,
    1, 1,
    0, 1
  );
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();
  return geometry;
}

function buildRole() {
  var width = window.innerWidth;
  var geometry = new THREE.BufferGeometry();
  let vertices = [];
  let uvs = [];
  let indices = [0, 1, 2, 0, 2, 3];
  vertices.push(
    -20, -50, 0,
    20, -50, 0,
    20, 50, 0,
    -20, 50, 0
  );
  uvs.push(
    0, 0,
    1, 0,
    1, 1,
    0, 1
  );
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();
  return geometry;
}

function init() {
  renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);

  scene = new THREE.Scene();

  //鏡頭
  if (window.matchMedia("(orientation: portrait)").matches) {
    camera = new THREE.OrthographicCamera(-25, 25, 100, -100, -10, 100);
  } 
  else {
    camera = new THREE.OrthographicCamera(-50, 50, 50, -50, -10, 100);
  }
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  window.addEventListener('resize', onWindowResize, false);
  //////////////////////////////////////////////////////////
  background[0] = new THREE.Mesh(buildBackground(), new THREE.MeshBasicMaterial({
    map: loader.load(
      "imgs/bg1.jpg")
  }));
  background[1] = new THREE.Mesh(buildBackground(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/bg2.jpg')
  }));
  background[0].position.set(0, 0, -20);
  background[1].position.set(0, 0, -20);
  scene.add(background[0]);

  roles[0] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[1] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_angry.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[2] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_sad.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[3] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_angry2.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[4] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_angry3.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[5] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi2.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[6] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_wink.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[7] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_snicker.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  roles[8] = new THREE.Mesh(buildRole(), new THREE.MeshBasicMaterial({
    map: loader.load(
      'imgs/Aoi_shy.png'),
    transparent: true,
    side: THREE.DoubleSide
  }));
  //////////////////////////////////////////////////////////
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

///GAME///

const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

var nowTextIndex = 1;

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  nowTextIndex = textNodeIndex;
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  if (textNode.os == true) {
    $('#container').css({
      "backgroundColor": `hsl(211, 12%, 48%)`,
      "color": 'white'
    });
  } else {
    $('#container').css({
      "backgroundColor": `hsl(240, 3%, 94%)`,
      "color": 'black'
    });
  }
  
  if(textNode.role != -1){
		if(role){
			scene.remove(role);
		}
    role = roles[textNode.role];
    scene.add(role);
  }
  else{
  	scene.remove(role);
  }
  
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('ontouchstart' in window ? 'touchstart' : 'click',
                                 () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
  
  if(textNodeIndex == 18){
	scene.remove(background[0]);
	scene.add(background[1]);
  }
  
  if(textNodeIndex == 41){
	scene.remove(background[1]);
	scene.add(background[0]);
  }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId == 0) {
    $('#container').css("visibility", "hidden");
    return;
  }
  if (nextTextNodeId == 1) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

window.onmousedown = function() {
  const textNode = textNodes.find(textNode => textNode.id === nowTextIndex);
  if (textNode.onlySpeak) {
    nowTextIndex++;
    const nextTextNodeId = nowTextIndex;
    showTextNode(nextTextNodeId);
  }
}

const textNodes = [{
    id: 1,
    text: '銀白色的月光灑在絳色的石磚上，襯著街邊五彩繽紛的燈飾和診所特意設置的人造泡泡雪，十分有聖誕節的氛圍。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 2,
    text: '今年Aoi開放了聖誕特別門診，這一個禮拜以來，陸續有患者在Twitter上分享自己「光顧」後的心得，而我也有幸報名到了今天的場次。\n話雖如此，包括門診開放前的準備期間，有點工作狂性質的她已經有將近三個禮拜沒好好休息了。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 3,
    text: '想了想，雖然只是很簡便的禮物... ...',
    options: [{
        text: '帶個哈啾貓限定布丁給她',
        setState: {
          hachumao: true
        },
        nextText: 4
      },
      {
        text: '帶個精力百倍紅蘿蔔汁給她',
        setState: {
          carrot: true
        },
        nextText: 4
      }
    ],
    onlySpeak: false,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 4,
    text: '希望Aoi收到後能減少一些疲勞！我開心的抱著剛買的禮物往診所邁進。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 5,
    text: '一路上雖然人潮壅擠，但總算是走到了診所旁的路口，從不遠處還能瞅見Aoi略帶困擾的在維持著秩序。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 6,
    text: '請大家乖乖排隊唷！要購買聖誕周邊的請往這邊，有預約特別門診的患者請帶著QR Code來這邊掃描報到！',
    options: [{
        text: '走向聖誕周邊的隊伍',
        nextText: -1
      },
      {
        text: '走向特別門診的隊伍',
        nextText: 7
      }
    ],
    onlySpeak: false,
    os: false,
	role: 0
  },
  ///////////////////////
  {
    id: 7,
    text: '特別門診開放的名額並不多，即便我是排在今天最後一個入場的也並沒有等太久。\nAoi很快就從診間走了出來。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  ///////////////////////
  {
    id: 8,
    text: `是${name}對吧？感謝你今天的預約！\n啊，手邊的物品可以放在置物櫃沒關係唷。`,
    options: [],
    onlySpeak: true,
    os: false,
	role: 0
  },
  ///////////////////////
  {
    id: 9,
    text: '',
    options: [{
        text: '這是要送給你的。',
        requiredState: (currentState) => currentState.carrot,
        nextText: 10
      },
      {
        text: '這是要送給你的。',
        requiredState: (currentState) => currentState.hachumao,
        nextText: 12
      }
    ],
    onlySpeak: false,
    os: false,
	role: 0
  },
  ///////////////////////
  {
    id: 10,
    text: '... ...',
    options: [],
    onlySpeak: true,
    os: false,
	role: 4
  },
  ///////////////////////
  {
    id: 11,
    text: 'Aoi露出了十分嫌棄的表情。\n... ...身為患者居然犯了這種錯誤，忘記Aoi討厭吃紅蘿蔔了。',
    options: [{
      text: '對不起。但嫌棄的樣子真的太棒了。',
      nextText: 15
    }],
    onlySpeak: false,
    os: true,
	role: 4
  },
  {
    id: 12,
    text: '哇！是布丁！謝謝你！',
    options: [],
    onlySpeak: true,
    os: false,
	role: 8
  },
  {
    id: 13,
    text: 'Aoi開心的接下了，但吃沒幾口突然表情怪異。',
    options: [],
    onlySpeak: true,
    os: true,
	role: 8
  },
  {
    id: 14,
    text: '哈...哈啾貓！！！\n奇怪，怎麼吃了之後一直想打噴嚏... ...',
    options: [{
      text: '啊... ...對不起，這是哈啾貓口味的',
      nextText: 15
    }],
    onlySpeak: false,
    os: false,
	role: 2
  },
  {
    id: 15,
    text: '^__^... ...',
    options: [{
      text: '... ...',
      nextText: 16
    }],
    onlySpeak: false,
    os: false,
	role: 3
  },
  {
    id: 16,
    text: '... ...不管怎樣還是謝謝你。',
    options: [{
      text: '不客氣',
      nextText: 17
    }],
    onlySpeak: false,
    os: false,
	role: 3
  },
  {
    id: 17,
    text: '... ...那我們趕快開始聖誕特別門診吧(?⊿?)',
    options: [{
      text: '好的',
      nextText: 18
    }],
    onlySpeak: false,
    os: false,
	role: 4
  },
  {
    id: 18,
    text: '特殊門診進行到一半時，Aoi的精神越發渙散，甚至會重複說過的話。',
    options: [{
      text: 'Aoi，還好嗎？',
      nextText: 19
    }],
    onlySpeak: false,
    os: true,
	role: 1
  },
  {
    id: 19,
    text: '啊... ...沒事，對不起。\n應該是太累了，有點無法集中精神。',
    options: [{
      text: '還是到這邊就好？能見到Aoi已經很開心了',
      nextText: 20
    }],
    onlySpeak: false,
    os: false,
	role: 1
  },
  {
    id: 20,
    text: '不行！你可是專程過來的，必須讓你好好享受才行。',
    options: [{
      text: '對不起，沒辦法幫上忙',
      nextText: 21
    }],
    onlySpeak: false,
    os: false,
	role: 5
  },
  {
    id: 21,
    text: '... ...也不是不可以。',
    options: [],
    onlySpeak: true,
    os: false,
	role: 8
  },
  {
    id: 22,
    text: 'Aoi講的很小聲，若不是診間只有我們兩個，隔音還極佳，幾乎聽不見她說了甚麼。',
    options: [{
      text: '我能怎麼幫妳',
      nextText: 23
    }],
    onlySpeak: false,
    os: true,
	role: 8
  },
  {
    id: 23,
    text: '... ...不管是甚麼，都願意嗎？',
    options: [{
      text: '當然了，只要在我能力所及',
      nextText: 24
    }],
    onlySpeak: false,
    os: false,
	role: 8
  },
  {
    id: 24,
    text: 'Aoi聽到我的承諾後突然沒了剛才虛弱的模樣，反而雙眼發光，一臉十分期待的樣子。',
    options: [{
      text: '... ...有種不祥的預感',
      nextText: 25
    }],
    onlySpeak: false,
    os: true,
	role: 7
  },
  {
    id: 25,
    text: '現在反悔來不及了唷?',
    options: [{
      text: '... ...我該做些甚麼',
      nextText: 26
    }],
    onlySpeak: false,
    os: false,
	role: 7
  },
  {
    id: 26,
    text: '非常簡單！獻出你的血．液．吧?',
    options: [],
    onlySpeak: true,
    os: false,
	role: 6
  },
  {
    id: 27,
    text: 'Aoi的笑容十分狡猾。霎時間我有種自己誤入賊船的感覺。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  {
    id: 28,
    text: '不，我確實就是入了賊船。\n... ...可即便如此，還是好香啊。我不爭氣的妥協了。',
    options: [{
      text: '我該怎麼給妳呢',
      nextText: 29
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 29,
    text: '關於這點不用擔心！我早就準備好了！\n這些針筒是從山莊帶來的，經過特殊處理，完全不會痛唷！',
    options: [{
      text: '... ...原來是預謀犯案嗎？',
      nextText: 30
    }],
    onlySpeak: false,
    os: false,
	role: 7
  },
  {
    id: 30,
    text: '啊哈哈，怎麼會呢？我是那種吸血鬼嗎？',
    options: [],
    onlySpeak: true,
    os: false,
	role: 3
  },
  {
    id: 31,
    text: '... ...Aoi笑的更開心了，但我還是乖乖伸出了手臂。',
    options: [{
      text: '來吧',
      nextText: 32
    }],
    onlySpeak: false,
    os: true,
	role: 7
  },
  {
    id: 32,
    text: '那麼，要上囉... ...?',
    options: [],
    onlySpeak: true,
    os: false,
	role: 8
  },
  {
    id: 33,
    text: 'Aoi將針緩緩的推入我的手臂，動作十分輕柔。\n且真如Aoi所說，完全沒有任何不適感，不如說還有種異樣酥麻的快感。',
    options: [{
      text: '好神奇',
      nextText: 34
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 34,
    text: '是吧？這是山莊特別的技術，甚至還有不少人對此上癮了呢。',
    options: [{
      text: '萬一我也上癮了怎麼辦',
      nextText: 35
    }],
    onlySpeak: false,
    os: false,
	role: 6
  },
  {
    id: 35,
    text: 'Aoi聽到我的疑問後溫柔的笑了笑。\n雖然表情是很溫柔，但總讓我感覺到一股莫名的寒意。',
    options: [{
      text: '... ...現在回頭來得及嗎？',
      nextText: 36
    }],
    onlySpeak: false,
    os: true,
	role: 3
  },
  {
    id: 36,
    text: '別擔心，上癮的話症狀不會經常發作！\n大約是一年後才會開始覺得心癢難耐。',
    options: [],
    onlySpeak: true,
    os: false,
	role: 7
  },
  {
    id: 37,
    text: 'Aoi語音剛落，針也一併抽了出來。非常神奇的從頭到尾都沒有感覺到痛。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  {
    id: 38,
    text: '不知道是聽了Aoi的話之後心理作祟，還是我真的對此有點上癮，總覺得莫名在意剛才被針扎過的地方。\n此時，Aoi突然朝我的額頭輕輕落下一吻。',
    options: [{
      text: '... ...！',
      nextText: 39
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 39,
    text: `嘿嘿，要給乖孩子一些獎勵?\n謝謝你，${name}。`,
    options: [{
      text: '... ...！！',
      nextText: 40
    }],
    onlySpeak: false,
    os: false,
	role: 8
  },
  {
    id: 40,
    text: `好了，今天的特別門診結束啦?\n${name}，如果明年發作了，隨時都可以過來唷！`,
    options: [],
    onlySpeak: true,
    os: false,
	role: 6
  },
  {
    id: 41,
    text: '回過神來，我已經站在診所門外。時間差不多到了打烊的時候，所以人潮相比稍早前少了很多。',
    options: [],
    onlySpeak: true,
    os: true,
	role: -1
  },
  {
    id: 42,
    text: '我站在略微空曠的街上，摸了摸額頭和剛才被針扎過的手臂。\n儘管是12月冬天的寒風，也無法平息我內心此時此刻的熾熱。',
    options: [{
      text: '剛才的事是真的嗎？',
      nextText: 43
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 43,
    text: '我抬頭望向夜晚的天空，今天天氣不錯，還能看見幾顆繁星閃爍。',
    options: [{
      text: '明年... ...嗎？',
      nextText: 44
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 44,
    text: '我拍了拍臉頰，努力讓自己清醒些。',
    options: [{
      text: '該回家了',
      nextText: 45
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 45,
    text: '我邁開步伐，往家的方向走去，腦中不斷回想剛才發生的事情，嘴角逐漸上揚。',
    options: [{
      text: '明年也約定好了，Aoi',
      nextText: 46
    }],
    onlySpeak: false,
    os: true,
	role: -1
  },
  {
    id: 46,
    text: 'END\n是否重新來過？',
    options: [{
      text: 'Yes',
      nextText: 1
    }],
    onlySpeak: false,
    os: false,
	role: -1
  },
  {
    id: -1,
    text: '排了將近30分鐘，手機忽然震動，收到了預約失效的簡訊通知。我這才突然意識到... ...啊，我排錯隊伍了。',
    options: [{
      text: '重來一次，不會再遜了',
      nextText: 1
    }],
    onlySpeak: false,
    os: true,
	role: -1
  }
]

init();
animate();
startGame();