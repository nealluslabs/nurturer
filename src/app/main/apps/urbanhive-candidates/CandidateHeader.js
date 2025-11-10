import React from 'react';
import { Box, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

function CandidateHeader({ handleSearchResults, history, viewMode, setViewMode }) {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "20px 24px",
      backgroundColor: "white",
      borderBottom: "1px solid #e0e0e0",
      position: "relative",
      zIndex: 1000
    }}>
      <Box sx={{ flex: 1, maxWidth: "60%", marginRight: "16px" }}>
        <TextField
          placeholder="Search contacts..."
          onChange={(e) => { handleSearchResults(e.target.value) }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  style={{ cursor:"pointer" }}
                  onClick={(e)=>{handleSearchResults(e.target.value)}}
                />
              </InputAdornment>
            ),
            sx: {
              height: "48px",
              "& input": {
                height: "48px",
                padding: "0 14px",
                fontSize: "1rem",
              },
            },
          }}
        />
      </Box>

      <Button
        onClick={() => { history.push('/apps/profile') }}
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#21C9CF",
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: "bold",
          marginRight: "16px",
          whiteSpace: "nowrap",
          "&:hover": { backgroundColor: "#18c8d0" },
        }}
      >
        New Contact
      </Button>

      <Box sx={{
        display: 'flex',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '4px'
      }}>
        <IconButton
          onClick={() => setViewMode('card')}
          sx={{
            backgroundColor: viewMode === 'card' ? '#21C9CF' : 'transparent',
            color: viewMode === 'card' ? 'white' : '#666',
            '&:hover': {
              backgroundColor: viewMode === 'card' ? '#18c8d0' : '#e0e0e0',
            },
            marginRight: '4px'
          }}
        >
          <ViewModuleIcon />
        </IconButton>
        <IconButton
          onClick={() => setViewMode('list')}
          sx={{
            backgroundColor: viewMode === 'list' ? '#21C9CF' : 'transparent',
            color: viewMode === 'list' ? 'white' : '#666',
            '&:hover': {
              backgroundColor: viewMode === 'list' ? '#18c8d0' : '#e0e0e0',
            }
          }}
        >
          <ViewListIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CandidateHeader;