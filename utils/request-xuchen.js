const baseUrl = "https://api5.meishichina.com"

export function myRequestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url: url,
			//#endif
			
			//#ifdef MP-WEIXIN | MP-ALIPAY
			url: baseUrl + url,
			//#endif
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}



