function getFormAndCreateForm(e) {
  result = getFormResponses(e);

  var term = result[1][1]
  var area = result[2][1]
  var formname = result[3][1]
  var filename = formname
  var newForm = FormApp.create(filename)

  Logger.log(result)

  var description = result[9][1]
  newForm.setDescription(description)

  newForm.addMultipleChoiceItem().setTitle("同意項目").setChoiceValues(["はい"]).setRequired(true) //同意項目
  newForm.addTextItem().setTitle(result[11][1]).setHelpText(result[12][1])
  newForm.addTextItem().setTitle(result[13][1]).setHelpText(result[14][1])
  newForm.addTextItem().setTitle(result[15][1]).setHelpText(result[16][1])
  newForm.addTextItem().setTitle(result[17][1]).setHelpText(result[18][1])
  newForm.addTextItem().setTitle(result[19][1]).setHelpText(result[20][1])

  var id = "hogehoge"; //アンケート管理のフォルダID
  var name = area + "_アンケート";
  var target = DriveApp.getFolderById(id);
  var folders = target.getFoldersByName(name);

  //データを格納する配列の宣言
  const foldersArray = [];

  //2次元配列として追加
  //フォルダ内のすべてのファイルについて実行
  while (folders.hasNext()) {
    //すべてのファイルから１つ取り出し
    const folder = folders.next();

    //配列にファイルのデータを追加
    foldersArray.push(folder.getId());
  }

  folderID = foldersArray

  Logger.log(folderID)

  var formFile = DriveApp.getFileById(newForm.getId());
  newFile = DriveApp.getFolderById(folderID).addFile(formFile);
  newFilename = DriveApp.getFileById(newFile.getId()).getName()
  newFileURL = DriveApp.getFileById(newFile.getId()).getUrl()
  DriveApp.getRootFolder().removeFile(formFile);

  onFormSubmit(e);

  newMessage = filename + " <" + newFileURL + "|" + newFileURL + ">";
  sendUrl(newMessage);

  setURLtoAdministrationSheet(newFileURL);

}

function getFormResponses(e) {
　　FormApp.getActiveForm();
  var itemResponses = e.response.getItemResponses();
  var result = [];
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    result.push([question, answer]);
  }
  Logger.log(result);
  return result;
}
