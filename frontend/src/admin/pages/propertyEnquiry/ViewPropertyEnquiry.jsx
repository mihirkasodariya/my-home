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
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import CircularProgress from "@mui/material/CircularProgress";
import { AdminLayout } from "../../components/AdminLayout";

export const ViewPropertyEnquiry = () => {
  document.title = "View Property Enquiry";
  const apiUrl = `${process.env.BASE_URL}/api/v1/property-enquiry`;
  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const propertyEnquiries = data.propertyEnquiries;

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

  return (
    <>
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-20">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600">
              View Property Enquiries
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

          {/* Paper Container */}
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
            {propertyEnquiries && (
              <>
                <TableContainer>
                  <Table>
                    {/* Table Header */}
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
                          Mobile
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Property Name
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Reason
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Dealer
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Date
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                      {propertyEnquiries
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((propertyEnquiry, i) => (
                          <TableRow
                            key={propertyEnquiry._id}
                            className={`${
                              i % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                          >
                            <TableCell className="text-gray-600">
                              {i + 1}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.name}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.email}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.mobile}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.property.name}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.reason}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {propertyEnquiry.dealer}
                            </TableCell>
                            <TableCell>
                              {new Date(propertyEnquiry.createdAt).toLocaleDateString()}
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
                  count={propertyEnquiries.length} // Total number of contacts
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
