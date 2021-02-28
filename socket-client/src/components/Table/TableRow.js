import React, { useMemo } from "react";

const TableRow = ({rowData}) => {
  const {id, originalId, msg, uniqMsgs = []} = rowData;
  const renderUniqMsg = (uniqMsgs) => uniqMsgs.map( uMsg => <div key={`${id}-${uMsg}`}>{uMsg}</div>);
  return useMemo(() => (
    <tr>
      <td>{id}</td>
      <td>{originalId}</td>
      <td>{msg}</td>
      <td>
        <div className="uniqMsgs">
        <div className="tooltip">
          Options: {uniqMsgs.length}
          <span className="tooltiptext">{renderUniqMsg(uniqMsgs)}</span>
        </div>
          {renderUniqMsg(uniqMsgs)}</div></td>
    </tr>
    // eslint-disable-next-line
  ), [id, originalId, msg, uniqMsgs]);
}

export default TableRow;