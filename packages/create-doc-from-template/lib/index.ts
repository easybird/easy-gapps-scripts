export default function createDocFromTemplate(templateId: string, destinationFolderId: string, documentName: string) {
    const template = DriveApp.getFileById(templateId);
    const destinationFolder = DriveApp.getFolderById(destinationFolderId);

    const newFile = template.makeCopy(documentName, destinationFolder);

    return { id: newFile.getId(), url: newFile.getUrl()};
  }