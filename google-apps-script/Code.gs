function doPost(e) {
  Logger.log("POST RECEIVED:");
  Logger.log(JSON.stringify(e));

  const sheet = SpreadsheetApp.openById("1d6wcUksao5JzWSvblCeqjCEwXQdep3AEKtbLFTNWbuQ");
  const tab = sheet.getSheets()[0];

  try {
    const data = JSON.parse(e.postData.contents);
    tab.appendRow([new Date(), data.name, data.email, data.phone, data.message]);
    return ContentService.createTextOutput("OK");
  } catch (error) {
    Logger.log("Error: " + error);
    return ContentService.createTextOutput("ERROR");
  }
}

function doGet() {
  return ContentService.createTextOutput("QRPass CRM Logger is active.");
}
