import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Music } from "./components/Music";
import './App.css';
import AlbumIcon from '@mui/icons-material/Album';
import { AddMusic } from "./components/AddMusic";
import { Artist } from "./components/Artist";
import { AddArtist } from "./components/addArtist";
import MusicNoteIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import { UpdateMusic } from "./components/UpdateMusic";
import { DeleteMusic } from "./components/DeleteMusic";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function NavigationBar() {
  return (
    <Box sx={{ bgcolor: 'common.black', borderBottom: 1, borderColor: 'common.white', marginBottom: 1, flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: 'common.black' }} position="static" >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Link to={"/"}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 4, color: 'common.white' }}
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
              sx={{ mr: 4, color: 'common.white' }}
            >
              <AlbumIcon />
            </IconButton>
          </Link>
          <Link to={"/addArtist"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4, color: 'common.white' }}
            >
              <AddIcon />
            </IconButton>
          </Link>
          <Link to={"/artist"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4, color: 'common.white' }}
            >
              <MusicNoteIcon />
            </IconButton>
          </Link>
          <Link to={"/UpdateMusic"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4, color: 'common.white' }}
            >
              <UpgradeIcon />
            </IconButton>
          </Link>
          <Link to={"/DeleteMusic"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4, color: 'common.white' }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Home() {
  return (<div>
    <h1 className='centered'>Welcome to my site!</h1>
    <div className="DivHome">
      <p className="pHomepage">On this site, you will be able to manage your favorites artits and songs</p>
      <p className="pHomepage">For example, you can create new ones, delete, add songs...</p>
      <p className="pHomepage">More information on the README</p></div>
  </div>)
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
          <Route path="/addArtist" element={<AddArtist />} />
          <Route path="/UpdateMusic" element={<UpdateMusic />} />
          <Route path="/DeleteMusic" element={<DeleteMusic />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
