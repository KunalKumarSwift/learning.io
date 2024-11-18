import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Grade as GradeIcon,
} from "@mui/icons-material";
import { mockGrades, mockCourses } from "../../mockData";

const Grades = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate overall GPA and statistics
  const calculateStats = () => {
    let totalPoints = 0;
    let totalMaxPoints = 0;
    let completedAssignments = 0;

    mockGrades.forEach((course) => {
      course.assignments.forEach((assignment) => {
        totalPoints += assignment.grade;
        totalMaxPoints += assignment.maxPoints;
        completedAssignments++;
      });
    });

    const overallPercentage = (totalPoints / totalMaxPoints) * 100;

    return {
      overallPercentage: overallPercentage.toFixed(1),
      completedAssignments,
      averageScore: (totalPoints / completedAssignments).toFixed(1),
    };
  };

  const stats = calculateStats();

  // Filter grades based on selected course
  const filteredGrades =
    selectedCourse === "all"
      ? mockGrades
      : mockGrades.filter((grade) => grade.courseId === selectedCourse);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "success";
    if (percentage >= 80) return "primary";
    if (percentage >= 70) return "warning";
    return "error";
  };

  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "2.125rem" },
          mb: { xs: 2, sm: 3 },
        }}
      >
        Grades
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <GradeIcon color="primary" />
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Overall Grade
                </Typography>
              </Box>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
              >
                {stats.overallPercentage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={parseFloat(stats.overallPercentage)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <TrendingUpIcon color="primary" />
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Average Score
                </Typography>
              </Box>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
              >
                {stats.averageScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across {stats.completedAssignments} assignments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course Filter */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <FormControl sx={{ width: { xs: "100%", sm: 200 } }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            label="Course"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="all">All Courses</MenuItem>
            {mockCourses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Grades Table */}
      {filteredGrades.map((courseGrade) => (
        <Paper
          key={courseGrade.courseId}
          sx={{
            mb: { xs: 2, sm: 3 },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: { xs: 1, sm: 2 },
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {courseGrade.courseName}
            </Typography>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell align="right">Out of</TableCell>
                  <TableCell align="right">%</TableCell>
                  <TableCell align="right" sx={{ px: { xs: 1, sm: 2 } }}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseGrade.assignments.map((assignment) => {
                  const percentage =
                    (assignment.grade / assignment.maxPoints) * 100;
                  return (
                    <TableRow key={assignment.id}>
                      <TableCell
                        sx={{
                          maxWidth: { xs: 120, sm: 200 },
                          whiteSpace: "normal",
                        }}
                      >
                        {assignment.title}
                      </TableCell>
                      <TableCell align="right">{assignment.grade}</TableCell>
                      <TableCell align="right">
                        {assignment.maxPoints}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${percentage.toFixed(0)}%`}
                          color={getGradeColor(percentage)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ px: { xs: 1, sm: 2 } }}>
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow sx={{ backgroundColor: "action.hover" }}>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <strong>Course Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {courseGrade.assignments.reduce(
                        (sum, a) => sum + a.grade,
                        0
                      )}
                    </strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {courseGrade.assignments.reduce(
                        (sum, a) => sum + a.maxPoints,
                        0
                      )}
                    </strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {(
                        (courseGrade.assignments.reduce(
                          (sum, a) => sum + a.grade,
                          0
                        ) /
                          courseGrade.assignments.reduce(
                            (sum, a) => sum + a.maxPoints,
                            0
                          )) *
                        100
                      ).toFixed(0)}
                      %
                    </strong>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Grades;
