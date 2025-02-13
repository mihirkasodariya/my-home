import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
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
  Typography,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchData } from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
export const ViewProperty = () => {
  document.title = "View Property";

  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data?.properties || [];

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle pagination change (page number)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (propertyId) => {
    try {
      const deleteUrl = apiUrl + `/${propertyId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600">
              View Property
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
            {error && (
              <div className="text-center text-red-500 py-4">
                <Typography variant="h6">Error: {error}</Typography>
              </div>
            )}
            {!loading && properties.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                <Typography variant="h6">No properties found</Typography>
              </div>
            )}
           {!loading && properties.length > 0 && (
              <>
                <TableContainer sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-gray-100">
                        <TableCell>#</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Price (₹)</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {properties
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((property, i) => (
                          <TableRow key={property._id}>
                            <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                            <TableCell>{property.category?.name || "N/A"}</TableCell>
                            <TableCell>{property.name || "N/A"}</TableCell>
                            <TableCell>{property.location || "N/A"}</TableCell>
                            <TableCell>{property.price || "N/A"}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Link to={`/admin/update-property/${property._id}`}>
                                  <Button startIcon={<EditIcon />} variant="outlined" size="small" color="success">
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => handleDelete(property._id)}
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={properties.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
