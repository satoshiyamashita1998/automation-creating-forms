function setURLtoAdministrationSheet(value) {
  var AdministrationSheet = SpreadsheetApp.openById("hogehoge").getSheetByName("hogehoge") //ワークブックとワークシートを指定

    // 更新したいシートの現在の行数を調べる
  var lastRow = AdministrationSheet.getRange(60,12,1,2000).getLastRow();

  Logger.log(lastRow);

  //値を入れたい番地を取得
  var nextRow = lastRow + 1;

  //  (nextRow, 1)の番地にvalueを挿入
  AdministrationSheet.getRange(nextRow, 12).setValue(value);
}
