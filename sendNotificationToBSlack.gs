function sendToSlack(fallback, fields, channel) {
  const url = "https://hooks.slack.com/services/hogehoge" //SlackチャンネルのWebhook URL
  const data = {
    "channel" : channel,
    "username" : "アンケートチェック Bot",  // 1: bot 名
    "attachments" : [{
      "fallback" : fallback,
      "text" : "アンケートチェック",
      "fields": fields,
      "color": "#037ef3",  // 3: 左線の色
    }],
    // "icon_emoji" : ":メモ::鉛筆1:" // 2: アイコン画像
  };
  const payload = JSON.stringify(data);
  const options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload,
    "muteHttpExceptions": true,
  };
  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response)
}

function test() {
  sendToSlack("テスト通知確認です", [], "#all_formcheck");
}

function responseToText(itemResponse) {
  switch (itemResponse.getItem().getType()) {
    case FormApp.ItemType.CHECKBOX:
      return itemResponse.getResponse().join("\n");
      break;
    case FormApp.ItemType.GRID:
      const gridResponses = itemResponse.getResponse();
      return itemResponse.getItem().asGridItem().getRows().map(function(rowName, index) {
        Logger.log(rowName);
        return rowName + ": " + gridResponses[index];
      }).join("\n");
      break;
    case FormApp.ItemType.CHECKBOX_GRID:
      const checkboxGridResponses = itemResponse.getResponse()
      return itemResponse.getItem().asCheckboxGridItem().getRows().map(function(rowName, index) {
        Logger.log(rowName);
        return rowName + ": " + checkboxGridResponses[index];
      }).join("\n");
      break;
    default:
      return itemResponse.getResponse();
  }
}

function onFormSubmit(e){
  const itemResponses = e.response.getItemResponses();

  const fallback = itemResponses.map(function(itemResponse) {
    return itemResponse.getItem().getTitle() + ": " + itemResponse.getResponse();
  }).join("\n");

  const fields = itemResponses.map(function(itemResponse) {
    const value = responseToText(itemResponse);
    return {
      "title": itemResponse.getItem().getTitle(),
      "value": value,
      "short": true,  // 4: 左右２列で表示
    }
  });

  sendToSlack(fallback, fields, "#all_formcheck");
}
