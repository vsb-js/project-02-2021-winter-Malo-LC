
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Music } from "./components/Music";
import './App.css';
import AlbumIcon from '@mui/icons-material/Album';
import { AddMusic } from "./components/AddMusic";
import { Artist } from "./components/Artist";
import MusicNoteIcon from '@mui/icons-material/BarChart';



function NavigationBar() {
  return (
    <Box sx={{bgcolor:'common.black' , borderBottom:1, borderColor:'common.white', marginBottom: 1,  flexGrow: 1 }}>
      <AppBar sx={{ bgcolor:'common.black'}} position="static" >
        <Toolbar sx={{justifyContent:'center'}}>
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
          <Link to={"/artist"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4 , color:'common.white'}}
            >
              <MusicNoteIcon />
            </IconButton>
          </Link>
          

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
          <Route path="/artist" element={<Artist />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
