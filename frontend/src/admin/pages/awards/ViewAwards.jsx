import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFetchData } from "../../../hooks/useFetchData";

export const ViewAwards = () => {
  document.title = "View Awards";
  const apiUrl = `${process.env.BASE_URL}/api/v1/awards`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const awards = data?.awards || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle Delete Award
  const handleDelete = async (awardsId) => {
    try {
      const deleteUrl = `${apiUrl}/${awardsId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete awards");
      }
    } catch (err) {
      // Handle errors properly
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Show server error message
      } else {
        toast.error("Something went wrong. Please try again."); // Fallback for unexpected errors
      }
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600  text-center sm:text-left">
              View Awards
            </h2>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={refetch}
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>
            </div>
          </div>

          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {awards && (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-blue-100">
                        <TableCell
                          sx={{ width: "14%" }}
                          className="font-semibold"
                        >
                          S No.
                        </TableCell>
                        <TableCell
                          sx={{ width: "14%" }}
                          className="font-semibold"
                        >
                          Image
                        </TableCell>
                        <TableCell
                          sx={{ width: "14%" }}
                          className="font-semibold"
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {awards
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((award, i) => (
                          <TableRow
                            key={award._id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100`}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                              <Box className="flex gap-2">
                                <img
                                  src={`${process.env.BASE_URL}/${award.image}`} // Assuming it's an array with only one image.
                                  alt={`Award Image`}
                                  style={{
                                    height: "70px",
                                    width: "120px",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDelete(award._id)}
                                startIcon={<DeleteIcon />}
                                variant="contained"
                                size="small"
                                color="error"
                                style={{ textTransform: "none" }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={awards.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      justifyContent: "center",
                    },
                  }}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
