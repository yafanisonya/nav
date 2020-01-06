const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')  //获取localStorage缓存x
const xObject = JSON.parse(x)        //字符串转数组
const hashMap = xObject || [        // 若初次则hashMap等于后一项
  { logo: 'R', url: 'https://reactjs.org' },
  { logo: 'V', url: 'https://vuejs.org' }
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://')
    .replace('www.')
    .replace(/\/.*/, '') //删除/开头
}
const render = () => {
  $siteList.find('li:not(.last)').remove()  //除最后一个li其他li都清空
  hashMap.forEach((node, index) => {
    const $li = $(`
    <li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </div>
      </div>
    </li>    
  `).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()  //阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', () => {
  let url = window.prompt('请输入要添加的网址:')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  //console.log(url)
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  })
  render()
  // const $li = $(`
  //     <li>
  //       <a href="${url}">
  //         <div class="site">
  //           <div class="logo">${url[8]}</div>
  //           <div class="link">${url}</div>
  //         </div>
  //       </a>
  //     </li>
  //   `).insertBefore($lastLi)
})

window.onbeforeunload = () => {             //关闭页面前将hashMap存到缓存中
  const string = JSON.stringify(hashMap)    //hashMap数组转成字符串
  localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
  const key = e.key
  // const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})