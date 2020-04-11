import request from '@/utils/request'
/**
 * 获取用户信息
 */
export function getUserInfo(params) {
  return request({
    url: 'info_detail.php',
    method: 'get',
    params
  })
}
/**
 * 编辑用户信息
 */
export function changeUserInfo(data){
	return request({
	  url: 'info_handle.php',
	  method: 'post',
	  data
	})
}
/**
 * 获取一级标签
 */
export function getTagA(params) {
	return request({
	  url: 'get_taga.php',
	  method: 'get',
	  params
	})
}
/**
 * 获取二级标签
 */
export function getTagB(params) {
	return request({
	  url: 'get_tagb.php',
	  method: 'get',
	  params
	})
}
/**
 * 提交标签选择结果
 */
export function checkHandle(data){
	return request({
	  url: 'check_handle.php',
	  method: 'post',
	  data
	})
}
/**
 * 获取轮播图列表
 */
export function getSliderList(params){
	return request({
	  url: 'slider_list.php',
	  method: 'get',
	  params
	})
}
/**
 * 获取热门标签列表
 */
export function getHotTagList(){
	return request({
	  url: 'hottag_list.php',
	  method: 'get'
	})
}
/**
 * 获取推送文章
 */
export function getArticleRecommend(){
	return request({
	  url: 'article_recommend.php',
	  method: 'get'
	})
}
/**
 * 收藏文章
 */
export function storeArticle(params){
	return request({
	  url: 'store_handle.php',
	  method: 'get',
		params
	})
}
/**
 * 获取收藏文章列表
 */
export function getStoreArticleList(params){
	return request({
	  url: 'store_list.php',
	  method: 'get',
		params
	})
}
/**
 * 获取文章浏览记录
 */
export function getReadList(params){
	return request({
	  url: 'read_list.php',
	  method: 'get',
		params
	})
}
/**
 * 浏览记录
 */
export function readHandle(params){
	return request({
	  url: 'read_handle.php',
	  method: 'get',
		params
	})
}
/**
 * 获取二级标签详情
 */
export function getTagbDetail(params){
	return request({
	  url: 'tagb_detail.php',
	  method: 'get',
		params
	})
}
/**
 * 获取指定标签文章列表
 */
export function getTagArticleList(params){
	return request({
	  url: 'article_list_tag.php',
	  method: 'get',
		params
	})
}