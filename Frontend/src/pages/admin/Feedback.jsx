import React, { useState } from 'react';
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

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      title: 'Góp ý về giao diện',
      content: 'Giao diện rất đẹp và dễ sử dụng, tuy nhiên phần responsive trên điện thoại cần cải thiện thêm.',
      sender: 'Nguyễn Văn A',
      date: '2024-03-15',
      status: 'Chưa đọc',
    },
    {
      id: 2,
      title: 'Báo lỗi dự đoán',
      content: 'Khi nhập diện tích quá lớn, hệ thống bị lỗi không dự đoán được.',
      sender: 'Trần Thị B',
      date: '2024-03-14',
      status: 'Đã đọc',
    },
  ]);

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const handleDeleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
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
                <TableCell>{feedback.date}</TableCell>
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Chi tiết phản hồi
        </DialogTitle>
        <DialogContent dividers>
          {selectedFeedback && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedFeedback.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Gửi bởi: {selectedFeedback.sender}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ngày gửi: {selectedFeedback.date}
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