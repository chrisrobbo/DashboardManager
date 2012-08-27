SUGAR.util.doWhen("document.getElementById('add_page') != null && document.getElementById('change_layout') != null && typeof jQuery != 'undefined'", function(){

    jQuery.noConflict();
    var tabcount = jQuery('#tabList').children().length;

    //modify delete tab images on form
    for (i=0; i<tabcount; i++)
    {
        modifyDeleteTabButton(i);
    }

    //get add page onclick event
    var AddPageOnclick = jQuery('#add_page').attr("onclick");

    //append new check
    jQuery('#add_page').attr("onclick", "newTabAppend();" + AddPageOnclick);

});

function modifyDeleteTabButton(tab_id)
{
    var control_id = "#pageNum_"+tab_id+"_delete_page_img";
    var OldOnclick = jQuery(control_id).attr("onclick");

    jQuery(control_id).attr("onclick", "removeTab("+tab_id+")");
}

function removeTab(tab_id)
{
    document.EditView.action.value = 'RemoveTabSave';
    jQuery('#EditView').append('<input type="hidden" id="TabToRemover" name="TabToRemove" value="'+ tab_id +'" />');

    //hack to prevent sugar confirm submission
    editViewSnapshots = new Object();

    SUGAR.ajaxUI.submitForm(document.EditView);
}

function newTabAppend()
{
    var tabcount = jQuery('#tabList').children().length;
    SUGAR.util.doWhen("document.getElementById('pageNum_"+tabcount+"_delete_page_img') != null", function(){
        modifyDeleteTabButton(tabcount);
    });
}

