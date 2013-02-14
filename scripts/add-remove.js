/*
 JQuery code to add or remove option fields
 */


jQuery(function () { // when document has loaded
//get last feed number, if one exists, else set to 0
	var postContainerSize = jQuery('div.wprss-input').size();
	var feedCount = 0;
	if (postContainerSize != 0) {
		feedCount = (jQuery('div.wprss-input').get(-1).id).substr(5);
	}
	feedCount = parseInt(feedCount) + 1;
	var delstr = add_remove_parms;

	jQuery('a#add').click(function () { // when you click the add link
		var html_part = '';
		html_part += '<div class="wprss-input" id="feed_' + feedCount + '">'+"\r\n";
		html_part += '	<p>'+"\r\n";
		html_part += '		<label class="textinput" for="feed_name_' + feedCount + '">'+"\r\n";
		html_part += '			Feed #' + feedCount + '&nbsp;'+"\r\n";
		html_part += '		</label>'+"\r\n";
		html_part += '		<input class="wprss-input" size="75" name="rss_import_items[feed_name_' + feedCount + ']" id="feed_name_' + feedCount + '" type="text" value="">'+"\r\n";
		html_part += '	</p>'+"\r\n";
		html_part += '	<p>'+"\r\n";
		html_part += '		<label class="textinput" for="feed_url_' + feedCount + '">URL #' + feedCount + '</label>'+"\r\n";
		html_part += '		<input id="feed_url_' + feedCount + '" class="wprss-input" size="75" name="rss_import_items[feed_url_' + feedCount + ']" type="text" value="">'+"\r\n";
		html_part += '	</p>'+"\r\n";
/*		html_part += '	<p>'+"\r\n";
		html_part += '		<a href="javascript:void(0)" class="btnDelete" id="' + feedCount + '">' + delstr.delfeed + '</a>'+"\r\n";
		html_part += '	</p>'+"\r\n";*/
		html_part += '</div>'+"\r\n";

		jQuery(html_part).fadeIn('slow').insertBefore('div#buttons');
		// append (add) a new input to the document.
		feedCount++; //after the click feedCount will increment up

	});

	jQuery('a#addCat').click(function () {
		//	alert('hello');
		var categoryContainerSize = jQuery('div.cat-input').size();
		var catCount = 0;
		if (categoryContainerSize != 0) {
			catCount = (jQuery('div.cat-input').get(-1).id);
		}
		catCount = parseInt(catCount) + 1;

		jQuery("<div class='cat-input'" + catCount + "'  id=" + catCount + "><p><label class='textinput' for='cat_name_" + catCount + "'>Category Name</label>" +
			"<input id='cat_name_" + catCount + "' class='cat-input' size='25' name='rss_import_categories[cat_name_" + catCount + "]' type='text' value='' />" +
			"<input id='cat_name_" + catCount + "' class='cat-input' size='25' name='rss_import_categories[id_" + catCount + "]' type='hidden' value=" + catCount + " />" +
			"<a href='#' class='btnDeleteNew' id='" + catCount + "'>" + delstr.delcat + "</a></p></div>").fadeIn('slow').insertBefore('div#category');
		// append (add) a new input to the document.
		catCount++; //after the click catCount will increment up
	});


	jQuery(".btnDelete").click(function () {
		var $id = this.id;
		jQuery('div').remove('#' + $id);
	});
});

jQuery(document).on('change', '.url-item', function () {
	//alert(isvalidurl(jQuery(this).val()));  //for testing
	var $messageDiv = jQuery('#errormsg');
	var urlprob = add_remove_parms;
	if (isvalidurl(jQuery(this).val())) {
		jQuery(this).removeClass("errorfld");
		$messageDiv.hide().html('');
	}
	else {
		jQuery(this).addClass("errorfld");
		$messageDiv.show().html(urlprob.urlcheck);
	}
	;
});

function isvalidurl(url) {
	var regexp = /(ftp|http|https|Http|Https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(url);
}


jQuery(document).on('change', '.default-cat-image', function () {


	this.value = jQuery.trim(this.value);

//alert(isValidImage(jQuery(this).val()));

});

function isValidImage(url) {
	var regexp = /^(http|https):\/\/(.*)\.(gif|png|jpg|jpeg)?/;
	return regexp.test(url);
}


jQuery(document).on('click', '.btnDeleteNew', function () {  //this removes any new feeds not saved
	var $id = this.id;
	jQuery('div').remove('#' + $id);
});


jQuery(document).on('change', '#showdesc', function () {
	if (jQuery(this).val() == 1) {
		jQuery('span#secret').show();
	} else {
		jQuery('span#secret').hide()
	}
	;
});


jQuery(document).on('change', '#stripAll', function () {
	if (jQuery(this).val() == 1) {
		jQuery('span#stripAllsecret').hide();
	} else {
		jQuery('span#stripAllsecret').show()
	}
	;
});


jQuery(document).on('change', '#pagination', function () {
	if (jQuery('#pagination').val() == 1) {
//alert("hello");
		jQuery('span#pag_options').show();
	} else {
		jQuery('span#pag_options').hide()
	}
	;
});


jQuery(document).on('change', '.cat-input', function () {
	this.value = this.value.toUpperCase();
});


jQuery(document).on('change', '#feedslug', function () {
	this.value = this.value.replace(/ /g, '');

});


jQuery(document).on('change', '#wpcategory', function () {
	var chkstr = add_remove_parms;
	var intRegex = /^\d+$/;
	this.value = this.value.replace(/ /g, '');
	if (!intRegex.test(this.value) && this.value != '') {
		alert(chkstr.intcheck);
		jQuery("#wpcategory").val('');
	}
});


jQuery(document).on('change', '#bloguserid', function () {
	var chkstr = add_remove_parms;
	var intRegex = /^\d+$/;
	this.value = this.value.replace(/ /g, '');
	if (!intRegex.test(this.value) && this.value != '') {
		alert(chkstr.intcheck);
		jQuery("#bloguserid").val('');
	}
});


jQuery(document).ready(function ($) {
	jQuery(".add_cat_id").click(function () {
		var p = $('div.category_id_options:not([style*="display:none"])').length;

		var $id = p + 1;

		jQuery('#' + $id).show("slow");
	});
});


///testing stuff here on


jQuery(function () {

	// Binding a click event
	// From jQuery v.1.7.0 use .on() instead of .bind()
	jQuery('#my-button').on('click', function (e) {

		// Prevents the default action to be triggered.
		e.preventDefault();

		// Triggering bPopup when click event is fired
		jQuery('#element_to_pop_up').bPopup();

	});

});

















