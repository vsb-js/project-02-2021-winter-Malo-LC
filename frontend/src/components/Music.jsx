import { useEffect, useState } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

import { apiUrl } from "../config";

export function Music() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // we don't have any error handling here, what if it goes wrong?
    axios.get(`${apiUrl}/ArtistAndMusics/1`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  // The loading is extremely important even though it can be extremely fast!
  // Because we don't have any interaction on this view ( the data doesn't change)
  // we don't need additional state for loading. But in other cases we might need state with loading
  if (!data) {
    return <div>Loading...</div>;
  }

  // using simple table https://mui.com/components/tables/
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item>
        <TableContainer component={Paper} style={{ maxWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Artist</TableCell>
                <TableCell>Music</TableCell>
                <TableCell>Runtime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.musics.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.musics.name}
                  </TableCell>
                  <TableCell>{row.artist.name}</TableCell>
                  <TableCell>{row.musics.runTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
