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
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { adminService } from "../../utils/adminAPI";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('/api/admin/get-all-feedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phản hồi:', error);
    }
  };

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này không?')) {
      try {
        await axios.delete(`/api/admin/delete-feedback/${id}`);
        fetchFeedbacks();
      } catch (error) {
        console.error('Lỗi khi xóa phản hồi:', error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    return status === 'Chưa đọc' ? 'error' : 'success';
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Quản lý phản hồi
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Người gửi</TableCell>
              <TableCell>Ngày gửi</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.id}</TableCell>
                <TableCell>{feedback.title}</TableCell>
                <TableCell>{feedback.sender}</TableCell>
                <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={feedback.status}
                    color={getStatusColor(feedback.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleViewFeedback(feedback)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteFeedback(feedback.id)}
                  >
                    <DeleteIcon />
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
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Người gửi: {selectedFeedback.sender}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ngày gửi: {new Date(selectedFeedback.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedFeedback.content}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Feedback;
