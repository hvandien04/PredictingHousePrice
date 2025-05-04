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
  TextField,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import MDBox from "../../components/MDBox";
import { adminService } from "../../utils/adminAPI";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(null);

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
    setEditedFeedback(feedback); // Cập nhật để chỉnh sửa
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/update-feedback/${editedFeedback.feedbackID}`, editedFeedback);
      if (response.status === 200) {
        // Cập nhật lại danh sách phản hồi
        fetchFeedbacks();
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Lỗi khi lưu thay đổi:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'pending' ? 'warning' : 'success';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          {editedFeedback && (
            <Box>
              <TextField
                label="Tiêu đề"
                name="title"
                value={editedFeedback.title || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Trạng thái"
                name="status"
                value={editedFeedback.status || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nội dung"
                name="message"
                value={editedFeedback.message || ''}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
          <Button onClick={handleSaveChanges} color="primary">Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
};

export default Feedback;
