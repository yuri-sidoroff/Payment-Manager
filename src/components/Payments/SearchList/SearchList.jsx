// import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import 'typeface-roboto';

import {
  TableSearchWrapper,
  Cell,
  TextNoResult,
  Close,
  Row,
} from './common/styles';

export const SearchList = ({
  search,
  paylist,
  
  handleOpenInfo,
  handleCloseSearch,
}) => {
  return (
    <TableSearchWrapper>
      {search.length !== 0 ? (
        <Table size="small">
          <TableBody>
            {search.map((item, key) => (
              <Row
                key={key}
                onClick={() => handleOpenInfo({ id: item.id, paylist })}
              >
                <Cell align="left">{item.name}</Cell>
                <Cell align="center">{item.amount}</Cell>
                <Cell align="center">{item.date}</Cell>
                <Cell align="center">{item.status}</Cell>
                <Cell align="center">{item.details.receiver}</Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      ) : (
        <TextNoResult>Нет результатов</TextNoResult>
      )}
      <Close onClick={handleCloseSearch} />
    </TableSearchWrapper>
  );
};

// SearchList.propTypes = {
//   search: PropTypes.array,
//   filterStatus: PropTypes.string,
//   paylist: PropTypes.array,
//   loadState: PropTypes.func,
//   handleOpenInfo: PropTypes.func,
// };
