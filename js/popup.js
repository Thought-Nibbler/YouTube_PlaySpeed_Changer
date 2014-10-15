// background.js �̃f�[�^���Q��
var BG = chrome.extension.getBackgroundPage();

var VideoTitle = BG.VideoTitle;

$(function () {
    // ����^�C�g����\��
    $('#VideoTitle').html(VideoTitle);

    // �Đ����x�̃X���C�h�o�[�̃X���C�h�C�x���g
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

