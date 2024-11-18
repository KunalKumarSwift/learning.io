import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { mockCourses } from "../../mockData";

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    courseId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(courseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourseId(null);
  };

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500, mb: 3 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <BookIcon color="primary" />
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, course.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Chip
                  label={course.code}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {course.instructor}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AssignmentIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {course.assignments.length} Assignments
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View Course
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            if (selectedCourseId) navigate(`/courses/${selectedCourseId}`);
            handleMenuClose();
          }}
        >
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>View Syllabus</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Grades</MenuItem>
      </Menu>
    </div>
  );
};

export default Courses;
