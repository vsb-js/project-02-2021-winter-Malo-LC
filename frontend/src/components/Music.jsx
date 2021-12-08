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

    try {
      axios.get(`${apiUrl}/ArtistAndMusics/` + CurrId).then((response) => {
        console.log(response.data);
        setData(response.data);
        response = response.data;
        response = response.musics[0];
        response = response.album
        setName(response);

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


  console.log(ArtistNames)
  function secondsToMinutes(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value - minutes * 60;
    if (seconds < 10) {
      return minutes + " : 0" + seconds;

    }
    return minutes + " : " + seconds;

  }
  // The loading is extremely important even though it can be extremely fast!
  // Because we don't have any interaction on this view ( the data doesn't change)
  // we don't need additional state for loading. But in other cases we might need state with loading
  if (!data || !ArtistNames) {
    return <div>Loading...</div>;
  }

  // using simple table https://mui.com/components/tables/
  return (
    <div>
      <div id="flex">
        <p id="pChoose">
          Choose an Artist :
          <select value={CurrId} onChange={(e) => {
            setId(e.target.value)
            console.log(CurrId)
          }}>
            {
              ArtistNames.map((names) => {
                return <option value={j++}>{names.name}</option>
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
          <h1>{AlbumName}</h1>
          {data.artist.map((row) => (
            <h2>{row.name}</h2>
          ))}
          <TableContainer style={{ maxWidth: 800 }}>
            <Table >
              <TableHead>
                <TableRow sx={{ justifyContent: 'center' }} >
                  <TableCell sx={{ color: 'common.white' }}>#</TableCell>
                  <TableCell sx={{ color: 'common.white' }}></TableCell>
                  <TableCell sx={{ color: 'common.white' }}>Title</TableCell>
                  <TableCell sx={{ color: 'common.white' }}>Length</TableCell>
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
