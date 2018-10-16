let arr = [{
    "tags": [
      "node",
      "js"
    ],
    "viewCount": 65,
    "reviewArea": [],
    "_id": "5bbc58b8f94777d5b05fc4d1",
    "title": "状态码",
    "content": "ss",
    "coverImg": "http://localhost:3000/uploads/33a8b0cb6a55dffe15da255232e77eda.png",
    "author": "admin",
    "status": 0,
    "createTime": "Tue Oct 09 2017 15:28:56 GMT+0800 (GMT+08:00)",
    "__v": 0,
    "updateTime": "Mon Oct 15 2018 16:12:02 GMT+0800 (GMT+08:00)",
    "fabulous": 12,
    "description": "查询失败(详情、列表等)或者操作失败查询失败(详情、列表等)或者操作失败查询失败(详情、列表等)或者操作失败查询失败(详情、列表等)或者操作失败查询失败(详情、列表等)或者操作失败"
  },
  {
    "tags": [
      "node"
    ],
    "viewCount": 8,
    "reviewArea": [],
    "_id": "5bbc5940f94777d5b05fc4d2",
    "title": "文件上传",
    "content": "ss",
    "coverImg": "http://localhost:3000/uploads/微信图片_20180607111146.png",
    "author": "admin",
    "status": 0,
    "createTime": "Tue Oct 09 2018 15:31:12 GMT+0800 (GMT+08:00)",
    "__v": 0,
    "updateTime": "Mon Oct 15 2018 14:53:26 GMT+0800 (GMT+08:00)"
  },
  {
    "tags": [
      "node"
    ],
    "viewCount": 8,
    "reviewArea": [],
    "_id": "5bbc5940f94777d5b05fc4d2",
    "title": "文件上传",
    "content": "ss",
    "coverImg": "http://localhost:3000/uploads/微信图片_20180607111146.png",
    "author": "admin",
    "status": 0,
    "createTime": "Tue Aug 09 2018 15:31:12 GMT+0800 (GMT+08:00)",
    "__v": 0,
    "updateTime": "Mon Oct 15 2018 14:53:26 GMT+0800 (GMT+08:00)"
  }
]


function getMonthList (list) {
  let monthList = []
  list.map(item => {
    let itemYear = new Date(item.createTime).getFullYear()
    let itemMonth = new Date(item.createTime).getMonth()
    // console.log(monthList.find((value) => {
    //   return value.year == itemYear
    // }))
    if (!monthList.find((value) => {
      return value.year == itemYear
    })) {
      monthList.push({
        year: itemYear,
        months: [{
          month: itemMonth,
          data: item
        }]
      })
    } else {
      monthList.map(month => {
        if (month.year === itemYear) {
          month.months.push({
            month: itemMonth,
            data: item
          })
        }
      })
    }
  })
  return monthList;
}
console.log(getMonthList(arr))

