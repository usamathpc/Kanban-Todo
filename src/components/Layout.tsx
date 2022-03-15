import { Avatar, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import React from "react";
import { SiTodoist } from "react-icons/si";

type Props = {
  children?: any;
};

export const Layout = (props: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", bgcolor: "#F0F0F0" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: theme.palette.background.default,
          boxShadow: `rgba(100, 100, 111, 0.2) 0px 0px 29px 0px`,
          height: "70px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 3,
          pr: 3,
        }}
      >
        <Box sx={{ maxWidth: "1280px" }} display={"flex"} alignItems="center">
          <SiTodoist fontSize={32} style={{ color: "#64130e" }} />
          <Typography
            sx={{
              color: "#64130e",
            }}
            ml={1}
            color="black"
            variant="h6"
            noWrap
            component="div"
          >
            KANBAN TODOLIST
          </Typography>
        </Box>
        <Box display="flex" alignItems={"center"}>
          <Avatar src="https://robohash.org/b9faeb1635b244687618d4f3acbb4803?set=set4&bgset=&size=400x400" />
        </Box>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 9,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
