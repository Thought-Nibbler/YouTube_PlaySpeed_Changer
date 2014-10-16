// background.js のデータを参照
var BG = chrome.extension.getBackgroundPage();

$(function () {
    // 再生速度のスライドバーのスライドイベント
    $('#speed').on('input', function () {
        var v = parseFloat($(this).val());

        $('#currentSpeed').html(v.toString());

        BG.SetPlaybackRate(v);
    });

    $('#speed').val(BG.PlaybackRate);
    $('#currentSpeed').html(BG.PlaybackRate.toString());

    BG.InitPlayer();
});

