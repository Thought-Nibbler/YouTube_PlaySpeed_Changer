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

    // データの読み込み開始のタイミングで source ノードを生成
    //$(this.video).on('loadeddata', initPlayer);
    // データの読み込み開始のタイミングで source ノードを生成
    //this.video.addEventListener('loadstart', function () {
    //    initPlayer();
    //}, false);

    // イベントが取れないのでタイマ処理
    setTimeout(initPlayer, 500);
};

// ページ起動時処理の
window.onload = function () {
    // Popup で表示するために background.js へ転送
    chrome.runtime.sendMessage(
        { "VideoTitle": $('#eow-title').html() },
        function (response) { }
    );
};

// background からのメッセージ受信処理               
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.cmd === "init" && (typeof videoPlayer) === 'undefined') {
            videoPlayer = new VideoPlayer();
        }
        else if (request.cmd === "setSpeed") {
            videoPlayer.changPlaybackRate(request.playbackRate);
        }
        sendResponse({});
    }
);