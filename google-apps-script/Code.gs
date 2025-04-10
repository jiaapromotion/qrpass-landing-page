function doPost(e) {
  Logger.log("POST RECEIVED:");
  Logger.log(JSON.stringify(e)); // This will print the full object for debugging

  const sheet = SpreadsheetApp.openById("1d6wcUksao5JzWSvblCeqjCEwXQdep3AEKtbLFTNWbuQ");
  const tab = sheet.getSheets()[0];

  try {
    const data = JSON.parse(e.postData.contents);
    tab.appendRow([new Date(), data.name, data.email, data.phone, data.message]);
    return ContentService.createTextOutput("OK");
  } catch (error) {
    Logger.log("Error: " + error);
    return ContentService.createTextOutput("Error: " + error);
  }
}

function testSubmit() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Kailash Sharma",
        email: "dadhich2006@gmail.com",
        phone: "09158058999",
        message: "Testing CRM Submission"
      })
    }
  };

  doPost(mockEvent);
}