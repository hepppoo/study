$(function() {
    //検索ボタンクリックで検索を開始
    $("#search").click(function() {
        $.getJSON('http://b.hatena.ne.jp/entry/jsonlite/?callback=?',{ url: $('#url').val() })
    //成功時の処理
    .done(function(data){
        //取得したデータをページに反映
        $('#count').text(data.count + '件');
        $.each(data.bookmarks, function(index, value){
            var c = value.comment;
            if(c !== ''){
                $('<li>' + c + '</li>').appendTo('#comment');
            }
        });
    })
    //失敗時の処理
    .fail(function(data) {
        window.alert('通信中にエラーが発生しました');
    });
    });
});
