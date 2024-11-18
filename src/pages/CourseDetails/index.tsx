import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const course = mockCourses.find((c) => c.id === id);
  const courseAssignments = mockAssignments.filter((a) => a.courseId === id);

  if (!course) {
    return <Typography>Course not found</Typography>;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate("/courses")} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs>
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/courses");
              }}
            >
              Courses
            </Link>
            <Typography color="text.primary">{course.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Typography variant="h4" gutterBottom>
          {course.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Chip label={course.code} color="primary" />
          <Typography variant="subtitle1" color="text.secondary">
            Instructor: {course.instructor}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<AnnouncementIcon />} label="Announcements" />
          <Tab icon={<AssignmentIcon />} label="Assignments" />
          <Tab icon={<DescriptionIcon />} label="Content" />
        </Tabs>

        {/* Announcements Tab */}
        <TabPanel value={tabValue} index={0}>
          <List>
            {course.announcements.map((announcement) => (
              <ListItem key={announcement.id} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AnnouncementIcon color="primary" />
                      <Typography variant="h6">{announcement.title}</Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Posted on {announcement.date}
                      </Typography>
                      <Typography variant="body1">
                        {announcement.content}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Assignments Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {courseAssignments.map((assignment) => (
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
                    <Typography variant="body1" paragraph>
                      {assignment.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
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
                            : "success"
                        }
                      />
                    </Box>
                    <Button variant="contained" startIcon={<AttachFileIcon />}>
                      Submit Assignment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Content Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" color="text.secondary">
            Course materials and resources will be displayed here.
          </Typography>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default CourseDetails;
