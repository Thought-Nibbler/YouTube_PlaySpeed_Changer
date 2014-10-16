// Video の再生管理オブジェクト
var VideoPlayer = function () {
    var me = this;

    // AudioContext のラッパー
    var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

    // AudioContext のインスタンス
    this.context = new AudioContext();

    // Video 要素
    this.video = document.getElementsByTagName("video")[0];

    // 音源ノード
    this.source = null;

    // 再生速度の変更
    this.changPlaybackRate = function (v) {
        this.video.playbackRate = v / 100;
    };

    // プレイヤの初期化
    var initPlayer = function () {
        console.log("プレイヤーの初期化を開始します。");

        me.source = me.context.createMediaElementSource(me.video);

        me.source.connect(me.context.destination);

        console.log("プレイヤーの初期化が完了しました。");
    };

    // イベントが取れないのでタイマ処理
    setTimeout(initPlayer, 500);
};

// background からのメッセージ受信処理               
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.cmd === "init" && (typeof videoPlayer) === 'undefined') {
            videoPlayer = new VideoPlayer();
        }
        else if (request.cmd === "setSpeed") {
            videoPlayer.changPlaybackRate(request.playbackRate);
        }
        sendResponse({});
    }
);
