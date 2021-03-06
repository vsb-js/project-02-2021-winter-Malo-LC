import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { apiUrl } from "../config";
import AddIcon from '@mui/icons-material/Add';


export function Music() {
  const [data, setData] = useState(null);
  const [AlbumName, setName] = useState(null);
  const [CurrId, setId] = useState(1);
  const [ArtistNames, setArtist] = useState(null);

  let j = 1;
  let i = 1;

  useEffect(() => {

    //Get all musics + album name
    let temp = [];
    try {
      axios.get(`${apiUrl}/ArtistAndMusics/` + CurrId).then((response) => {
        console.log(response.data);
        setData(response.data);
        response = response.data;
        response = response.musics;
        for (let k = 0; k < response.length; k++) {
          temp[k] = response[k].album;              //get all albums
        }
        let uniqueAlbums = [];
        temp.forEach((c) => {
          if (!uniqueAlbums.includes(c)) { // and delete duplicates
            uniqueAlbums.push(c);
          }
        });
        setName(uniqueAlbums);

      });
    } catch (error) {
      console.log(error)
    }

  }, [CurrId]);

  useEffect(() => {

    //Get all artists names

    try {
      axios.get(`${apiUrl}/all`).then(async (response) => {
        response = response.data;
        response = response.artists;
        console.log(response);
        setArtist(response)


      });
    } catch (error) {
      console.log(error)
    }
  }, [data]);
  function secondsToMinutes(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value - minutes * 60;
    if (seconds < 10) {
      return minutes + " : 0" + seconds;

    }
    return minutes + " : " + seconds;

  }
  if (!data || !ArtistNames) {
    return <div>Loading...</div>;
  }
  console.log(AlbumName)

  return (
    <div>
      <div id="flex">
        <p id="pChoose">
          Choose an Artist :
          <select id="selectSyle" value={CurrId} onChange={(e) => {
            setId(e.target.value)
            console.log(CurrId)
          }}>
            {
              ArtistNames.map((names) => {
                return <option key={names.id} value={j++}>{names.name}</option>
              })
            }
          </select>
        </p>
        <Link to={"/AddMusic"}>
          <IconButton
            size="large"
            edge="start"
            aria-label="add"
            sx={{ mr: 4, color: 'common.white' }}
          >
            <AddIcon />
          </IconButton>
        </Link>
      </div>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }} >
        <Grid item sx={{ width: 900 }}>
          {data.artist.map((row) => (
            <h1 key={row.id}>{row.name}</h1>
          ))}
          <TableContainer style={{ maxWidth: 800 }}>
            <Table >
              <TableHead>
                <TableRow sx={{ justifyContent: 'center' }} >
                  <TableCell sx={{ color: 'common.white' }}>#</TableCell>
                  <TableCell sx={{ color: 'common.white' }}></TableCell>
                  <TableCell sx={{ color: 'common.white' }}>Title</TableCell>
                  <TableCell sx={{ color: 'common.white' }}>Length</TableCell>
                  <TableCell sx={{ textAlign: "center", color: 'common.white' }}>Album</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.musics.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ color: 'common.white' }}>{i++}</TableCell>
                    <TableCell>
                      <IconButton sx={{ color: 'common.white' }}><FavoriteBorderIcon /></IconButton>

                    </TableCell>
                    <TableCell sx={{ color: 'common.white' }}>{row.name}</TableCell>
                    <TableCell sx={{ color: 'common.white' }}>{secondsToMinutes(row.runTime)}</TableCell>
                    <TableCell sx={{ textAlign: "center", color: 'common.white' }}>{row.album}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
