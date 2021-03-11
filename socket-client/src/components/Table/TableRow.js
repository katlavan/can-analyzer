import React, { useMemo } from "react";
import ChangeHighlight from "react-change-highlight";

const hexToDecimal = (msg) => msg?.split(" ").map(word => parseInt(`${word}`, 16)).join(" ");

const TableRow = ({rowData}) => {
  const {id, originalId, msg, uniqMsgs = []} = rowData;
  const renderUniqMsg = useMemo(() => uniqMsgs.map( uMsg => <div key={`${id}-${uMsg}`}>{uMsg}</div>), [uniqMsgs]);
  return useMemo(() => (
    <tr>
      <td>{id}</td>
      <td>{originalId || parseInt(`${id}`, 16)}</td>
      <td><ChangeHighlight>
        <div ref={React.createRef()}>{msg}</div>
      </ChangeHighlight></td>
      <td>{hexToDecimal(msg)}</td>
      <td>
        <div className="uniqMsgs">
        <div className="tooltip">
          Options: {uniqMsgs.length}
          <span className="tooltiptext">{renderUniqMsg}</span>
        </div>
          {renderUniqMsg}</div></td>
    </tr>
    // eslint-disable-next-line
  ), [id, originalId, msg, uniqMsgs]);
}

export default TableRow;