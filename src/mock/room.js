// 模拟客房管理的请求接口
import Mock from 'mockjs'

Mock.mock(
  'http://mockjs.com:83/Room/List?roomTypeId=0&roomStateId=0&pageIndex=1',
  function() {
    return Mock.mock({
      'data|5-10': [
        {
          'roomId|+1': 1000,
          roomType: {
            roomTypeName: '@ctitle(2,6)',
            'roomTypePrice|100-200': 200
          },
          roomState: {
            roomStateName: '@ctitle(2,6)'
          }
        }
      ]
    })
  }
)
