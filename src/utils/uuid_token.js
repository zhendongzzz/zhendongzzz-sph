import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  if (!uuidToken) {
    // 生成游客身份
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
