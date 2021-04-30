function sendUrl(message) {
  var postUrl = 'https://hooks.slack.com/services/hogehoge'; //SlackチャンネルのWebHookURL
  var username = 'アンケート申請通知bot';  // 通知時に表示されるユーザー名
  var icon = ':hatching_chick:';  // 通知時に表示されるアイコン

  var jsonData =
  {
     "channel": "#general_cpo",
     "username" : username,
     "icon_emoji": icon,
     "text" : message
  };
  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);
}
