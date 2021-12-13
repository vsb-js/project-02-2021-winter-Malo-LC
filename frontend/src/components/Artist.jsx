import { useEffect, useState } from "react";
import axios from "axios";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { apiUrl } from "../config";


export function Artist() {
  const [TotalRuntime, setTotalRuntime] = useState(null);

  const [ArtistNames, setArtist] = useState(null);
  const [SongNames, setSong] = useState(null);
  const [AlbumNames, setAlbumNames] = useState([]);
  let j =0;
  useEffect(() => {

    //Get all album name + ArtistId

    try {
      axios.get(`${apiUrl}/all/`).then((response) => {
        console.log(response.data);
        response = response.data;
        response = response.musics;
        setSong(response);
        let sum = 0;
        for (let i = 0; i < response.length; i++) {
          sum += response[i].runTime;
          
        }

        setTotalRuntime(sum);
        let temp = [];
        for (let k = 0; k < response.length; k++) {
          temp[k] = response[k].album  //get albums
        }
        let uniqueAlbums = [];
        temp.forEach((c) => {
          if (!uniqueAlbums.includes(c)) { //delete duplicates
            uniqueAlbums.push(c);
          }
          setAlbumNames(uniqueAlbums)
        });


      });
    } catch (error) {
      console.log(error)
    }

  }, []);

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
  }, []);

  // The loading is extremely important even though it can be extremely fast!
  // Because we don't have any interaction on this view ( the data doesn't change)
  // we don't need additional state for loading. But in other cases we might need state with loading
  if (!AlbumNames || !ArtistNames || !SongNames) {
    return <div>Loading...</div>;
  }
  function secondsToMinutes(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value - minutes * 60;
    if (seconds < 10) {
      return minutes + " : 0" + seconds;

    }
    return minutes + " : " + seconds;

  }

  console.log(AlbumNames)
  console.log(ArtistNames)
  console.log(SongNames)
  console.log(TotalRuntime)


  // using simple table https://mui.com/components/tables/
  return (
    <div className="cards">
      <div className="card">
        <h3>Number of artists : {ArtistNames.length}</h3>
        <div className="content">{ArtistNames.map((Arnames) => {
          return <p key={Arnames.id}>{Arnames.name}</p>
        })}</div>
      </div>
      <div className="card">
        <h3>Number of Albums : {AlbumNames.length}</h3>
        <div className="content">{AlbumNames.map((Abnames) => {
          return <p key={j++}>{Abnames}</p>

        })}</div>
      </div>
      <div className="card">
        <h3>Number of Songs : {SongNames.length}</h3>
        <div className="content" >{SongNames.map((Sonames) => {
          return <p key={Sonames.id}>{Sonames.name}</p>

        })}</div>
      </div>
      <div className="card">
        <h3>Total run Time : {secondsToMinutes(TotalRuntime)} minutes</h3>
        <AccessTimeFilledIcon
        sx={{marginLeft:'40%'}}
            fontSize="large"
            color="black"
        />
      </div>
    </div>
  );
}
