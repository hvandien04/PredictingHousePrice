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
  TablePagination,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import MDBox from "../../components/MDBox";
import { adminService } from "../../utils/adminAPI";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);


  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await adminService.getAllFeedbacks();
      setFeedbacks(response);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phản hồi:', error);
    }
  };

  const handleViewFeedback = async (feedback) => {
    try {
      if (feedback.status === 'pending') {
        await adminService.updateFeedbackStatus(feedback.feedbackID);
        await fetchFeedbacks();
      }

      setSelectedFeedback(feedback);
      setEditedFeedback(feedback);
      setOpenDialog(true);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái feedback:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    return status === 'Chưa xem' ? 'warning' : 'success';
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            {feedbacks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((feedback) => (
                <TableRow key={feedback.feedbackID}>
                  <TableCell>{feedback.feedbackID}</TableCell>
                  <TableCell>{feedback.title}</TableCell>
                  <TableCell>{feedback.userID.userID}</TableCell>
                  <TableCell>
                    {new Date(feedback.date[0], feedback.date[1] - 1, feedback.date[2]).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={feedback.status === 'pending' ? 'Chưa xem' : 'Đã xem'}
                      color={getStatusColor(feedback.status === 'pending' ? 'Chưa xem' : 'Đã xem')}
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
        <TablePagination
            rowsPerPageOptions={[10, 15, 25, 50]}
            component="div"
            count={feedbacks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
            }
          />
      </TableContainer>

      {/* Dialog Chi tiết Feedback */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Chi tiết phản hồi</DialogTitle>
        <DialogContent dividers>
          {editedFeedback && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedFeedback.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID Người gửi: {selectedFeedback.userID.userID || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ngày gửi: {new Date(
                  selectedFeedback.date[0],
                  selectedFeedback.date[1] - 1,
                  selectedFeedback.date[2]
                ).toLocaleDateString()}
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
