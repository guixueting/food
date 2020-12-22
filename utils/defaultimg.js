/* 图片加载失败处理 
	that 图片绑定字段所属对象
	dat 图片绑定字段
*/
import avatar from '../static/tabs/默认头像.jpg'
export const imgErr=(dataArray, index)=>{
	console.log("图片加载失败,载入本地默认图片");
	console.log(dataArray[index].avatar);
	dataArray[index].avatar =avatar;
	console.log(dataArray[index].avatar);
	
}
