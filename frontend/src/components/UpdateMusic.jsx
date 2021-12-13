import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function UpdateMusic() {
    const [songNames, setSongs] = useState(null);
    const [CurrId, setCurrid] = useState(null);
    
    const [formState, setFormState] = useState({
        name: "",
        album: "",
        runTime: 0
    });



    useEffect(() => {

        //Get all songs names

        try {
            axios.get(`${apiUrl}/all`).then(async (response) => {
                response = response.data;
                response = response.musics;
                console.log(response);
                setSongs(response)


            });
        } catch (error) {
            console.log(error)
        }
    }, []);



    // we want to have some kind of action result when we hit the API
    const [actionResult, setActionResult] = useState(null);

    function onNameChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ name: e.target.value } };
        });
    }

    function onAlbumChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ album: e.target.value } };
        });
    }
    function onRunTimeChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ runTime: e.target.value * 1 } };
        });
    }

    function onDropDownChange(e) {
        let TheIndex = 0;

        for(let i =0;i<songNames.length;i++){
            if(e.target.value*1===songNames[i].id){
                TheIndex = i;
                break;
            }

        }




        setFormState({
            name: songNames[TheIndex].name,
            album: songNames[TheIndex].album,
            runTime: songNames[TheIndex].runTime *1
        })
        setCurrid(e.target.value*1)

    }


    function handleFormSubmit() {
        console.log(formState);
       




        // We could include some form validation
        if (formState.name !== "" && formState.album !== "" && Number.isInteger(formState.runTime)) {
            axios
                .put(`${apiUrl}/update/music/` + CurrId, {
                    name: formState.name,
                    album: formState.album,
                    runTime: formState.runTime,
                    
                })
                .then((response) => {
                    console.log(response.data);

                    const dataFromServer = response.data;
                    if (dataFromServer.success === "OK") {
                        setActionResult("Music successfully updated, refresh the page to see it");
                    }
                })
                .catch((reason) => {
                    console.error(reason);
                    setActionResult("There was an error updating the Music");
                })
                .finally(
                    setFormState({
                        name: "",
                        album: "",
                        runTime: "",
                    }),
                );
        }
        else {
            setActionResult("There was an error updating the Music");
        }

    }

    if (!songNames) {
        return <div>Loading...</div>;
    }

    // Btw we should definitely better design our form with CSS, add margins and other things
    return (
        <div >
            <p id="pChoose">
                Choose an already existing Song :
                <select id="selectSyle" onChange={(e) => {
                    onDropDownChange(e)
                    
                    console.log(formState)
                    console.log(CurrId)
                }}>
                    {
                        songNames.map((names) => {
                            return <option key={names.id} value={names.id}>{names.name}</option>
                        })
                    }


                </select>
            </p>
            <Box className="center" component="form" noValidate>
                <div className="field">
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="Title"
                        label="Title"

                        value={formState.name}
                        onChange={onNameChange}
                    />
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="Album"
                        label="Album"

                        value={formState.album}
                        onChange={onAlbumChange}
                    />
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="RunTime"
                        label="RunTime"
                        type="number"
                        value={formState.runTime}
                        onChange={onRunTimeChange}
                    />
                </div>
                <Button variant="outlined" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </Box>
            <p className="Confirmation">{actionResult}</p>
        </div>
    );
}
