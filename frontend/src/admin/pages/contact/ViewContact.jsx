import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { useFetchData } from "../../../hooks/useFetchData";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";

export const ViewContact = () => {
  document.title = "View Contact";

  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const contacts = data?.contact || [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (contactId) => {
    try {
      const deleteUrl = `${apiUrl}/${contactId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600">
              Contact Enquiries
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
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-center text-red-500 py-4">
                <p>{error}</p>
              </div>
            )}

            {/* Table Content */}
            {contacts.length > 0 && (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-blue-100">
                        <TableCell className="font-semibold text-gray-700">
                          S No.
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Name
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Email
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Phone
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Message
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Date
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((contact, i) => (
                          <TableRow
                            key={contact._id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.message}</TableCell>
                            <TableCell>
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleDelete(contact._id)}
                                endIcon={<DeleteIcon />}
                                variant="contained"
                                size="small"
                                color="error"
                                sx={{
                                  textTransform: "none",
                                  backgroundColor: "#ff4d4f",
                                  "&:hover": {
                                    backgroundColor: "#ff7875",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={contacts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      justifyContent: "center",
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      {
                        fontSize: "0.9rem",
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
