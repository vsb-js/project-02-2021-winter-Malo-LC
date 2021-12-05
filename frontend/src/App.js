
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Music } from "./components/Music";



// We could use for example the app bar for main menu https://mui.com/components/app-bar/#main-content
function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginBottom: 10 }}>
        <Toolbar>
        <Link to={"/"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Link to={"/music"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          {/*It's possible to use the classic react router link but it will have ugly colors*/}
          {/*<Button color="inherit">*/}
          {/*  <Link to={"/users"}>*/}
          {/*    Users*/}
          {/*  </Link>*/}
          {/*</Button>*/}
          {/*We can pass a component into a button so it behaves as link but doesn't color it*/}
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Home() {
  return <div>Welcome to our site!</div>;
}


function App() {
  return (
    <div className="App">
      <Router>
      <NavigationBar />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            
          </Routes>
        </Router>
    </div>
  );
}

export default App;
