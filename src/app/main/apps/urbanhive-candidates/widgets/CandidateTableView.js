import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Button,
  styled,
  IconButton
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { saveCandidateInFocus } from 'redux/reducers/user.slice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '12px 16px',
}));

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        size="small"
        sx={{
          backgroundColor: page === 0 ? '#f5f5f5' : '#20dbe4',
          color: page === 0 ? '#ccc' : 'white',
          '&:hover': {
            backgroundColor: page === 0 ? '#f5f5f5' : '#18c8d0',
          },
          '&:disabled': {
            backgroundColor: '#f5f5f5',
            color: '#ccc',
          }
        }}
      >
        <SkipPreviousIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        size="small"
        sx={{
          backgroundColor: page === 0 ? '#f5f5f5' : '#20dbe4',
          color: page === 0 ? '#ccc' : 'white',
          '&:hover': {
            backgroundColor: page === 0 ? '#f5f5f5' : '#18c8d0',
          },
          '&:disabled': {
            backgroundColor: '#f5f5f5',
            color: '#ccc',
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        size="small"
        sx={{
          backgroundColor: page >= Math.ceil(count / rowsPerPage) - 1 ? '#f5f5f5' : '#20dbe4',
          color: page >= Math.ceil(count / rowsPerPage) - 1 ? '#ccc' : 'white',
          '&:hover': {
            backgroundColor: page >= Math.ceil(count / rowsPerPage) - 1 ? '#f5f5f5' : '#18c8d0',
          },
          '&:disabled': {
            backgroundColor: '#f5f5f5',
            color: '#ccc',
          }
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        size="small"
        sx={{
          backgroundColor: page >= Math.ceil(count / rowsPerPage) - 1 ? '#f5f5f5' : '#20dbe4',
          color: page >= Math.ceil(count / rowsPerPage) - 1 ? '#ccc' : 'white',
          '&:hover': {
            backgroundColor: page >= Math.ceil(count / rowsPerPage) - 1 ? '#f5f5f5' : '#18c8d0',
          },
          '&:disabled': {
            backgroundColor: '#f5f5f5',
            color: '#ccc',
          }
        }}
      >
        <SkipNextIcon />
      </IconButton>
    </div>
  );
}

function CandidateTableView() {
  const { allContacts, filteredContacts } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const dispatch = useDispatch();

  const contactsData = filteredContacts || allContacts || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const viewContactFxn = (contact) => {
    const contactIndex = contactsData.findIndex(c => 
      (c.id && c.id === contact.id) || 
      (c.uid && c.uid === contact.uid) || 
      (c.email && c.email === contact.email)
    );
    
    dispatch(saveCandidateInFocus(contactsData));
    
    localStorage.setItem('selectedContactIndex', contactIndex.toString());
    localStorage.setItem('selectedContact', JSON.stringify(contact));
    
    window.dispatchEvent(new CustomEvent('switchToCardView', { 
      detail: { 
        contact, 
        contactIndex,
        contactsData 
      } 
    }));
  };

  const getFrequency = (contact) => {
    const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
    return frequencies[Math.floor(Math.random() * frequencies.length)];
  };

  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Contacts Directory
        </h2>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
          Total Contacts: {contactsData.length}
        </p>
      </div>
      <TableContainer component={Paper} sx={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}>
        <Table sx={{ minWidth: 1000 }} stickyHeader aria-label="candidates table">
          <TableHead sx={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 100,
            '& th': {
              backgroundColor: '#20dbe4 !important',
              color: 'white !important',
              fontWeight: 'bold !important',
              fontSize: '16px !important',
              padding: '16px !important'
            }
          }}>
            <TableRow sx={{ 
              backgroundColor: "#20dbe4 !important",
              '& th': {
                backgroundColor: '#20dbe4 !important',
                color: 'white !important'
              }
            }}>
              <StyledTableCell sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                Name
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                Email
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                Company
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                Role
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                Frequency
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ 
                color: 'white !important', 
                backgroundColor: '#20dbe4 !important',
                fontWeight: 'bold !important',
                fontSize: '16px !important'
              }}>
                View
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? contactsData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : contactsData
            ).map((contact, index) => (
              <TableRow key={contact.id || index}>
                <StyledTableCell component="th" scope="row">
                  {contact.name 
                    || (contact.firstName && contact.lastName && `${contact.firstName} ${contact.lastName}`)
                    || contact.fullName
                    || contact.displayName
                    || contact.email
                    || "-"}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {contact.email || contact.contactEmail || "-"}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {contact.company || contact.companyName || contact.organization || "-"}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {contact.role || contact.position || contact.title || contact.jobTitle || "-"}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {contact.frequency || getFrequency(contact)}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      background: "#20dbe4",
                      color: "white",
                      fontSize: "12px",
                    }}
                    onClick={() => viewContactFxn(contact)}
                  >
                    VIEW
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={contactsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CandidateTableView;