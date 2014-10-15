﻿// 動画タイトル（転送用）
var VideoTitle = "";

// 現在の再生速度（転送用）
var PlaybackRate = 100;

var Url = "";

// タブが更新された段階で、 URL をチェック
chrome.tabs.onUpdated.addListener(function (tabID, info, tab) {
    if (tab.url.match(/https?:\/\/www\.youtube\.com\/watch.*/)) {
        PlaybackRate = 100;
        // youtube の動画閲覧ページのみアイコンを表示
        chrome.pageAction.show(tabID);
    }

    Url = tab.url;
});

setInterval(function () {
    chrome.tabs.getSelected(null, function (tab) {
        if (tab.url === Url) {
            return;
        }

        if (tab.url.match(/https?:\/\/www\.youtube\.com\/watch.*/)) {
            // youtube の動画閲覧ページのみアイコンを表示
            PlaybackRate = 100;
            chrome.pageAction.show(tabID);
        }

        Url = tab.url;
    });
}, 500);

// ContentScript から動画タイトルを受け取った時に、 background.js スコープ内変数に保存する
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        VideoTitle = request.VideoTitle;
        sendResponse({});
    }
);


// 再生速度変更コマンドを ContentScript に送信
var SetPlaybackRate = function (v) {
    console.log(v);
    chrome.tabs.getSelected(null, function (tab) {
        PlaybackRate = v;
        chrome.tabs.sendRequest(tab.id, { cmd: "setSpeed", playbackRate: v }, function (response) {
            console.log("Send to ContentScript.");
        });
    });
};

// 再生管理オブジェクトの初期化コマンドを ContentScript に送信
var InitPlayer = function () {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { cmd: "init" }, function (response) {
            console.log("Send to ContentScript.");
        });
    });
};
