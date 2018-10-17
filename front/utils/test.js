let arr = [{
    "author": "1",
    "status": 0,
    "createTime": "Tue Oct 09 2018 15:28:56 GMT+0800 (GMT+08:00)"
  },
  {
    "author": "2",
    "status": 0,
    "createTime": "Tue Oct 09 2018 15:31:12 GMT+0800 (GMT+08:00)"
  },
  {
    "author": "3",
    "status": 0,
    "createTime": "Tue Aug 09 2017 15:31:12 GMT+0800 (GMT+08:00)"
  },
  {
    "author": "4",
    "createTime": "Tue Aug 09 2018 15:31:12 GMT+0800 (GMT+08:00)"
  }
]


function getMonthList (list) {
  let monthList = []
  list.map(item => {
    let itemYear = new Date(item.createTime).getFullYear()
    let itemMonth = new Date(item.createTime).getMonth()
    if (!monthList.find((value) => {
      return value.year == itemYear
    })) {
      monthList.push({
        year: itemYear,
        months: [{
          month: itemMonth,
          data: [item]
        }]
      })
    } else {
      monthList.map(month => {
        if (month.year === itemYear) {
          if(!month.months.find((val => {
            return val.month == itemMonth
          }))) {
            month.months.push({
              month: itemMonth,
              data: [item]
            })
          } else {
            month.months.map(cli => {
              cli.data.push(item)
            })
          }
        }
      })
    }
  })
  return monthList;
}
console.log(getMonthList(arr))

