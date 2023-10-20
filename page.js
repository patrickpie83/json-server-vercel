// http://localhost:8080/page.html?id=3
//[0]=http://localhost:8080/page.html
//[1]=3
//用來將已設定的網址，添加各自的風貌
//已設定的網址，由all.js renderData()產生
//
const id = location.href.split("=")[1]; //把當前網址切割，取[1]的值
// const id = 0; //把當前網址切割，取[1]的值

const _url = "http://localhost:3000"; // 伺服器位址的變數
//(js不是scss 沒有import檔案 所以程式碼沒有共用，此page.js檔仍然要再宣告一次)


//取得路由的內容
//http://localhost:3000/todos/3
axios.get(`${_url}/todos/${id}`)
.then(function(response){
     //將<h1>內文字修改為 路由位址的data（json格式的資訊）的id
     document.querySelector("h1").textContent = response.data.id
     //將<div class="content">內文字修改為 路由位址的data（json格式的資訊）的content
     document.querySelector(".content").textContent = response.data.content
})