import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";
import { Assignment, Announcement } from "@mui/icons-material";
import { mockCourses, mockAssignments } from "../../mockData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const upcomingAssignments = mockAssignments.slice(0, 3);
  const recentAnnouncements = mockCourses
    .flatMap((course) =>
      course.announcements.map((announcement) => ({
        ...announcement,
        courseName: course.title,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Student!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here's what's happening in your courses
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Course Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Current Courses" />
              <Tab label="Announcements" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                {mockCourses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {course.code}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {course.instructor}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          View Course
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {recentAnnouncements.map((announcement) => (
                  <ListItem key={announcement.id} divider>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Announcement color="primary" />
                          <Typography variant="subtitle1">
                            {announcement.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            {announcement.courseName} - {announcement.date}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {announcement.content}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Upcoming Assignments */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Assignment color="primary" />
              Upcoming Assignments
            </Typography>
            <List>
              {upcomingAssignments.map((assignment) => (
                <ListItem key={assignment.id}>
                  <ListItemText
                    primary={assignment.title}
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Chip
                          label={`Due: ${assignment.dueDate}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={assignment.status}
                          size="small"
                          color={
                            assignment.status === "pending"
                              ? "warning"
                              : "success"
                          }
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/assignments")}
              sx={{ mt: 2 }}
            >
              View All Assignments
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
