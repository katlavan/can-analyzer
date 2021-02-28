import React, {useMemo} from "react";

import TableRow from "./TableRow";
import withCanData from "../../utils/HOC";

/*
* {
*   [id]: {
*     id: string,
*     originalId: string
*     msg: string,
*     uniqMsgs: string[],
*   }
* }
*
* */

const Table = ({ msgObject }) => {
  return useMemo(() => (
    <table className="can-message-table">
      <thead>
      <tr>
        <th>Id {Object.keys(msgObject).length}</th>
        <th>Original id</th>
        <th>Message</th>
        <th>Messages Array</th>
      </tr>
      </thead>
      <tbody>
      {Object.keys(msgObject).map(row => <TableRow key={row} rowData={msgObject[row]} />)}
      </tbody>
    </table>
  ), [msgObject])
};

export default withCanData(Table);