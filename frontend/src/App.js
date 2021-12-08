
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Music } from "./components/Music";
import './App.css';
import AlbumIcon from '@mui/icons-material/Album';
import { AddMusic } from "./components/AddMusic";



function NavigationBar() {

  

  return (
    <Box sx={{bgcolor:'common.black' , borderBottom:1, borderColor:'common.white', marginBottom: 1,  flexGrow: 1 }}>
      <AppBar sx={{bgcolor:'common.black'}} position="static" >
        <Toolbar>
          <Link to={"/"}>
            <IconButton
              size="large"
              edge="start"
              
              aria-label="menu"
              sx={{ mr: 4 , color:'common.white'}}
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
              sx={{ mr: 4 , color:'common.white'}}
            >
              <AlbumIcon />
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
  return <h1 id='h1Home'>Welcome to my site!</h1>

}


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/AddMusic" element={<AddMusic />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
