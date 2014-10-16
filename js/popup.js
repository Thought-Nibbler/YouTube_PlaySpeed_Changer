// background.js �̃f�[�^���Q��
var BG = chrome.extension.getBackgroundPage();

$(function () {
    // �Đ����x�̃X���C�h�o�[�̃X���C�h�C�x���g
    $('#speed').on('input', function () {
        var v = parseFloat($(this).val());

        $('#currentSpeed').html(v.toString());

        BG.SetPlaybackRate(v);
    });

    $('#speed').val(BG.PlaybackRate);
    $('#currentSpeed').html(BG.PlaybackRate.toString());

    BG.InitPlayer();
});

