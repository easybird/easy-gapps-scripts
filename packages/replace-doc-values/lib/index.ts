import getObjectEntries from "./getObjectEntries";

interface ValueIdentifiers {
    valuePrefix?: string;
    valueSuffix?: string;
}
export default function replaceDocValues(documentId:string, documentData: object, valueIdentifier?: ValueIdentifiers) {
    const doc = DocumentApp.openById(documentId)
    const documentBody = doc.getBody();

    function addValueIdentifiersToKey(key) {
        if (!valueIdentifier) {
            return key;
        }
        return `${valueIdentifier.valuePrefix || ''}${key}${valueIdentifier.valueSuffix|| ''}`;
    }

    getObjectEntries(documentData).forEach(([key, value]) => {
        documentBody.replaceText(addValueIdentifiersToKey(key), value);
    })

    doc.saveAndClose()
  }