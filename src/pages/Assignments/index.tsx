import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { mockAssignments, mockCourses } from "../../mockData";

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

  // Filter assignments based on search term and filters
  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || assignment.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleSubmitOpen = (assignment: any) => {
    setSelectedAssignment(assignment);
    setSubmitDialogOpen(true);
  };

  const handleSubmitClose = () => {
    setSubmitDialogOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="submitted">Submitted</MenuItem>
              <MenuItem value="graded">Graded</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Course</InputLabel>
            <Select
              value={courseFilter}
              label="Course"
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <MenuItem value="all">All Courses</MenuItem>
              {mockCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Assignments Grid */}
      <Grid container spacing={3}>
        {filteredAssignments.map((assignment) => {
          const course = mockCourses.find((c) => c.id === assignment.courseId);
          return (
            <Grid item xs={12} md={6} key={assignment.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <AssignmentIcon color="primary" />
                    <Typography variant="h6">{assignment.title}</Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {course?.title}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    {assignment.description}
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    <Chip
                      label={`Due: ${assignment.dueDate}`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Points: ${assignment.points}`}
                      variant="outlined"
                    />
                    <Chip
                      label={assignment.status}
                      color={
                        assignment.status === "pending"
                          ? "warning"
                          : assignment.status === "submitted"
                          ? "info"
                          : "success"
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<AttachFileIcon />}
                    onClick={() => handleSubmitOpen(assignment)}
                    disabled={assignment.status === "graded"}
                  >
                    {assignment.status === "pending"
                      ? "Submit Assignment"
                      : "View Submission"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Submit Assignment Dialog */}
      <Dialog
        open={submitDialogOpen}
        onClose={handleSubmitClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Submit Assignment
            <IconButton onClick={handleSubmitClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAssignment && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedAssignment.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Due: {selectedAssignment.dueDate}
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                sx={{ mb: 2 }}
              >
                Upload File
                <input type="file" hidden />
              </Button>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Comments (Optional)"
                variant="outlined"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Assignments;
