import React, { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';

export default function CenteredPopup() {
  const [open, setOpen] = useState(false); // State to manage the popup visibility

  // Function to handle the opening and closing of the popup
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to trigger the popup */}
      <Button variant="contained" onClick={handleOpen} style={{ marginTop: '50px' }}>
        Show Popup
      </Button>

      {/* Popup (Modal) */}
      <Modal
        open={open} // Controls the visibility
        onClose={handleClose} // Close the modal when clicked outside
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            width: '300px', // You can adjust the width
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: 24, // Gives it a shadow for a modal look
          }}
        >
          <h2>Centered Popup</h2>
          <p>This is a centered popup. You can close it by clicking outside or pressing the button again.</p>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
