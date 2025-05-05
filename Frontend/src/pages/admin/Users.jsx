import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography, Box, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, TablePagination, InputAdornment,MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import MDBox from "../../components/MDBox";
import { adminService } from "../../utils/adminAPI";

function Users() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search email
    if (searchEmail.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchEmail, users]);

  const loadUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpenAddUser = () => {
    setCurrentUser({ name: '', email: '', role: '0', state: 'Active', password: '', phone: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };
  
  const handleOpenEditUser = (user) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };
  
  const handleSaveUser = async () => {
    try {
      if (isEditMode) {
        // Sử dụng PUT để cập nhật người dùng
        console.log('Updating user:', currentUser);
        await adminService.updateUser(currentUser.userID, currentUser);
      } else {
        // Sử dụng POST để thêm người dùng mới
        await adminService.createUser(currentUser);
      }
  
      handleCloseDialog();
      loadUsers(); // Tải lại danh sách người dùng
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MDBox>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Quản lý người dùng</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddUser}
        >
          Thêm người dùng
        </Button>
      </Box>

      <TextField
        label="Tìm kiếm theo email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user.id||index}>
                  <TableCell>{user.userID}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role === '1' ? 'Admin' : 'User'}</TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[15, 20, 25,50]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count}`}
        />
      </TableContainer>

      {/* Dialog Thêm/Sửa User */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={currentUser?.name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={currentUser?.role || '0'}
              label="Vai trò"
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            >
              <MenuItem value="0">User</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Số điện thoại"
            value={currentUser?.phone || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            value={currentUser?.password || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Trạng thái"
            value={currentUser?.state || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, state: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default Users;