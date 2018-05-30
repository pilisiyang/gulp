$.cos_ajax = $.ajax;
$.ajax = function(url, options) {
	// If url is an object, simulate pre-1.5 signature
	if (typeof url === "object") {
		options = url;
		url = undefined;
	}

	// Force options to be an object
	options = options || {};

	var success = options.success || function(data) {
	};

	options.success = function(data) {
		if (data && data.success == false) {// 后台范围异常
			$.messager.progress('close');
			$.messager.alert('错误', data.title, 'error');
			return;
		}
		if (data && typeof data == 'string'
				&& data.indexOf('login_portlet_') != -1) {
			location.href = $("BASE").attr("href") + 'userSessionLoss.do';
			return;
		}
		success(data);
	};

	options.error = function(jqXHR, textStatus, errorThrown) {
		if (jqXHR && jqXHR.responseText
				&& typeof jqXHR.responseText == 'string'
				&& jqXHR.responseText.indexOf('login_portlet_') != -1) {
			location.href = $("BASE").attr("href") + 'userSessionLoss.do';
		} else {
			$.messager.progress('close');
			$.messager.alert('错误', '服务器返回的数据无法解析！', 'error');
		}
	};

	return $.cos_ajax(url, options);
};

(function($) {
	$.fn.window1 = $.fn.window;
	$.fn.window = function(options, param) {
		var dlg = this.window1(options, param);
		if (typeof options == 'string' && options == 'open') {
			var thelist = $(this).find(".uploader-list");
			thelist.each(function(index, element) {
				var id = $(element).attr("id");
				var uploader = window.uploaders['webuploader_'
						+ id.replace("thelist_", "")];
				if (!uploader.inited) {
					try {
						uploader.uploader = uploader.createWebUploader();
					} catch (e) {
						alert('初始化文件上传对象出错，可能是浏览器未安装flash插件');
					}
				}
			});
		}
		if (typeof options == 'string' && options == 'close') {
			var thelist = $(this).find(".uploader-list");
			thelist.each(function(index, element) {
				var id = $(element).attr("id");
				var uploader = window.uploaders['webuploader_'
						+ id.replace("thelist_", "")];
				if (uploader.inited) {
					uploader.clearAllFiles();
				}
			});
		}
		return dlg;
	};
	$.fn.window = $.extend($.fn.window, $.fn.window1);
})(jQuery);

/**
 * 格式化毫秒时间
 */
var cosDateFormat = function(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i;
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
		case 'yyyy':
			return tf(t.getFullYear());
			break;
		case 'MM':
			return tf(t.getMonth() + 1);
			break;
		case 'mm':
			return tf(t.getMinutes());
			break;
		case 'dd':
			return tf(t.getDate());
			break;
		case 'HH':
			return tf(t.getHours());
			break;
		case 'ss':
			return tf(t.getSeconds());
			break;
		}
	});
};

var formatFilesize = function(size) {
	var showsize = "";
	var d = 0.0;
	if (size < 1024) {
		showsize = size + "B";
	} else if (size < 1024 * 1024) {
		d = parseFloat(size / 1024.0).toFixed(2);
		showsize = d + "KB";
	} else if (size < 1024 * 1024 * 1024) {
		d = parseFloat(size / (1024.0 * 1024.0)).toFixed(2);
		showsize = d + "MB";
	} else if (size < 1024 * 1024 * 1024 * 1024 * 10) {
		d = parseFloat(size / (1024.0 * 1024 * 1024)).toFixed(2);
		showsize = d + "GB";
	} else {
		showsize = "文件太大";
	}
	return showsize;
};

/**
 * 删除数组指定下标或指定对象
 */
Array.prototype.remove = function(obj) {
	for ( var i = 0; i < this.length; i++) {
		var temp = this[i];
		if (!isNaN(obj)) {
			temp = i;
		}
		if (temp == obj) {
			for ( var j = i; j < this.length; j++) {
				this[j] = this[j + 1];
			}
			this.length = this.length - 1;
		}
	}
};

/**
 * 判断字符串是否以指定字符串开头
 * @param str
 * @returns
 */
String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};

/**
 * 判断字符串是否以指定字符串结尾
 * @param str
 * @returns
 */
String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};

/**
 * 函数：格式化日期  
 * 参数：formatStr-格式化字符串  
 * d：将日显示为不带前导零的数字，如1  
 * dd：将日显示为带前导零的数字，如01  
 * ddd：将日显示为缩写形式，如Sun  
 * dddd：将日显示为全名，如Sunday  
 * M：将月份显示为不带前导零的数字，如一月显示为1  
 * MM：将月份显示为带前导零的数字，如01 
 * MMM：将月份显示为缩写形式，如Jan 
 * MMMM：将月份显示为完整月份名，如January 
 * yy：以两位数字格式显示年份 
 * yyyy：以四位数字格式显示年份 
 * h：使用12小时制将小时显示为不带前导零的数字，注意||的用法 
 * hh：使用12小时制将小时显示为带前导零的数字 
 * H：使用24小时制将小时显示为不带前导零的数字 
 * HH：使用24小时制将小时显示为带前导零的数字 
 * m：将分钟显示为不带前导零的数字 
 * mm：将分钟显示为带前导零的数字 
 * s：将秒显示为不带前导零的数字 
 * ss：将秒显示为带前导零的数字 
 * l：将毫秒显示为不带前导零的数字 
 * ll：将毫秒显示为带前导零的数字 
 * tt：显示am/pm 
 * TT：显示AM/PM 
 * 返回：格式化后的日期 
 */
Date.prototype.format = function (mask) { 
    var d = this;
    var zeroize = function (value, length) {
            if (!length) length = 2;
            value = String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                zeros += '0';
            }
            return zeros + value;
        };
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
        case 'd':
            return d.getDate();
        case 'dd':
            return zeroize(d.getDate());
        case 'ddd':
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
        case 'dddd':
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
        case 'M':
            return d.getMonth() + 1;
        case 'MM':
            return zeroize(d.getMonth() + 1);
        case 'MMM':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
        case 'MMMM':
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
        case 'yy':
            return String(d.getFullYear()).substr(2);
        case 'yyyy':
            return d.getFullYear();
        case 'h':
            return d.getHours() % 12 || 12;
        case 'hh':
            return zeroize(d.getHours() % 12 || 12);
        case 'H':
            return d.getHours();
        case 'HH':
            return zeroize(d.getHours());
        case 'm':
            return d.getMinutes();
        case 'mm':
            return zeroize(d.getMinutes());
        case 's':
            return d.getSeconds();
        case 'ss':
            return zeroize(d.getSeconds());
        case 'l':
            return zeroize(d.getMilliseconds(), 3);
        case 'L':
            var m = d.getMilliseconds();
            if (m > 99) m = Math.round(m / 10);
            return zeroize(m);
        case 'tt':
            return d.getHours() < 12 ? 'am' : 'pm';
        case 'TT':
            return d.getHours() < 12 ? 'AM' : 'PM';
        case 'Z':
            return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed      
        default:
            return $0.substr(1, $0.length - 2);
        }
    });
};
