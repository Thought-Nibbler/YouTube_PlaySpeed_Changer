// background.js のデータを参照
var BG = chrome.extension.getBackgroundPage();

var VideoTitle = BG.VideoTitle;

$(function () {
    // 動画タイトルを表示
    $('#VideoTitle').html(VideoTitle);

    // 再生速度のスライドバーのスライドイベント
    $('#speed').on('input', function () {
        var v = parseFloat($(this).val());

        $('#currentSpeed').html(v.toString());

        BG.SetPlaybackRate(v);

        //BG.CurrentPlaybackRate = v;
    });

    $('#speed').val(BG.PlaybackRate);
    $('#currentSpeed').html(BG.PlaybackRate.toString());

    BG.InitPlayer();
});

