import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import MDBox from "../../components/MDBox";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/get-all-feedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phản hồi:', error);
    }
  };

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    return status === 'pending' ? 'warning' : 'success';
  };

  return (
    <MDBox>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản lý phản hồi</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>ID Người gửi</TableCell>
              <TableCell>Ngày gửi</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.feedbackID}>
                <TableCell>{feedback.feedbackID}</TableCell>
                <TableCell>{feedback.title}</TableCell>
                {/* Hiển thị chỉ userID */}
                <TableCell>{feedback.userID.userID}</TableCell>
                <TableCell>{new Date(feedback.date[0], feedback.date[1] - 1, feedback.date[2]).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={feedback.status}
                    color={getStatusColor(feedback.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleViewFeedback(feedback)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Chi tiết Feedback */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Chi tiết phản hồi</DialogTitle>
        <DialogContent dividers>
          {selectedFeedback && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedFeedback.title}
              </Typography>
              {/* Hiển thị chỉ userID trong Dialog */}
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID Người gửi: {selectedFeedback.userID.userID || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ngày gửi: {new Date(selectedFeedback.date[0], selectedFeedback.date[1] - 1, selectedFeedback.date[2]).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedFeedback.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
};

export default Feedback;
