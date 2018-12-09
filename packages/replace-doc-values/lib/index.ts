function getObjectEntries(obj: object) {
  var ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i); // preallocate the Array
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
}

interface ValueIdentifiers {
  valuePrefix?: string;
  valueSuffix?: string;
}
export default function replaceDocValues(
  documentId: string,
  documentData: object,
  valueIdentifier?: ValueIdentifiers
) {
  const doc = DocumentApp.openById(documentId);
  const documentBody = doc.getBody();

  function addValueIdentifiersToKey(key) {
    if (!valueIdentifier) {
      return key;
    }
    return `${valueIdentifier.valuePrefix ||
      ''}${key}${valueIdentifier.valueSuffix || ''}`;
  }

  getObjectEntries(documentData).forEach(([key, value]) => {
    documentBody.replaceText(addValueIdentifiersToKey(key), value);
  });

  doc.saveAndClose();
}
