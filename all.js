const txt = document.querySelector('.txt');
const save = document.querySelector('.save');
const list = document.querySelector('.list');


const _url = "http://localhost:3000"; // 設定伺服器網址的變數


let data = []; //宣告一個資料陣列

//初始化的函式
//copen範例是把物件obj寫進陣列data的資料裡面 （但資料會消失）
//因為我們要利用api伺服器，所以是要從路由的位址將資料寫到陣列data裡面
function init(){
    axios.get(`${_url}/todos`) //get資源（路由）的位址  ！從伺服器抓資料的意思
    .then(function(response){
        data=response.data; //此路由位址的data（json格式的資訊）賦予給data資料陣列
        renderData(); //呈現資料畫面
    })
}

// 預設載入初始化環境
init();


//呈現資料畫面的函式
function renderData(){
  let str = ''; //空字串，後面會寫入html程式碼

  //遍歷陣列
  //（陣列data內的資料形式為物件，在送出按鈕綁監聽事件，新增資料為物件obj）
  //（每按一次送出按鈕，data陣列內就會多一筆物件）
  //（物件為obj，obj的內容為文字輸入框的資料）
  data.forEach(function (item,index) {  //參數如 {content:"今天要健身",id=5},2  //這邊並沒有用到index

    //參數item為data陣列內的(逐一筆)物件
    //content是自己寫的obj屬性(item.content)此行程式碼會去找參數item物件內content這個屬性
    //-> data=[ {content:"今天要按摩",id:3} , {content:"今天要喝飲料",id:4} , {content:"今天要健身",id:5} ]
    //所以item.content是用"."來選取屬性內容

    //同時在item.content外面包一層<a>連結，連結為跳至與index.html同層的
 
    //同時新增一個屬於他的刪除代辦按鈕
    //而這邊有個自創的html屬性 data-num，屬性值為對應的item id
    //這邊是有做page.html?id的篩選
    //問？ 如何產生出http://localhost:8080/page.html?id=1
    //             http://localhost:8080/page.html?id=2
    //             http://localhost:8080/page.html?id=3
    //答：上述的頁面不是產生出來的，是原本就有。page.html?... 後面可以接任何字母都不影響，都還會是page.html原本的樣子
    //?id= 是把這樣的網址抓出來利用
    //如果沒有經過page.js的渲染的話，會是原本page.html的風貌
    str+=`<li><a href="page.html?id=${item.id}"> ${item.content} </a> 
    <input class="delete" type="button" data-num="${item.id}" value="刪除待辦"></li>`
    //             這邊data-num對應的是item.id，不再是陣列data的序號(index參數)，因為我們現在要用伺服器存取的方式
    
  })
  list.innerHTML = str; //清空ul的內容，寫上新的data資料
}



//新增資料的按鈕監聽click事件
save.addEventListener('click',function(e){
  if (txt.value=="") {
    alert("請輸入內容");
    return; //return的用意為提早退出函式 （當輸入框為空值時）
  }

  let obj = {};
  //宣告空物件，並直接寫入一個屬性為content，此屬性賦予值為表單txt.value的內容
  //表單元素取屬性值可直接用“.“ (txt.value)
  obj.content = txt.value

  // data.push(obj); //在資料陣列data的尾巴，寫入物件obj資料

  //axios.post 寫入
  axios.post(`${_url}/todos`,obj)  //第一個參數為位址：路由todos的位址，第二個參數為寫入的物件資訊（物件格式）
  .then(function(res){ //res此參數並沒有作用到
    init(); //執行初始化函式  (重新get路由todos的data給data陣列，並顯示最新畫面)
  })

})


//後續新增的內容（刪除代辦按鈕）是沒有辦法綁監聽事件的，因此要先寫在ul上
list.addEventListener("click",function(e){
  //目前dom為<ul>
  //e.target為 點到的部分為按鈕
  //e.target.getAttribute為 屬性為class的值，而不等於delete的話
  //即點到的部分如果class 不是delete的話立即中斷函式
  if(e.target.getAttribute("class")!=="delete"){
    return;
  }
  let num = e.target.getAttribute("data-num"); //取得要刪除的物件的id
  

  axios.delete(`${_url}/todos/${num}`)  //刪除路由指定id的物件
  .then(function(res){ //res此參數並沒有作用到
    alert("刪除成功！");
    init(); //執行初始化函式  (重新get路由todos的data給data陣列，並顯示最新畫面)
  })
})
