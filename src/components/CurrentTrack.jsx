import axios from 'axios';
import React, {useEffect} from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';


const CurrentTrack = () => {
  const [{ token, currentPlaying}, dispatch] = useStateProvider();
  useEffect(()=>{
    const getCurrentTrack = async ()=>{
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
            headers:
            {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
            
        }
        );
        console.log(response);
        if(response.data !== ""){
            const currentPlaying = {
                id: response.data.item.id,
                name: response.data.item.name,
                artists: response.data.item.artists.map((artist) => artist.name),
                image: response.data.item.album.images[2].url,
            }
            dispatch({type:reducerCases.SET_PLAYING, currentPlaying})
        }else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
    }
    getCurrentTrack();
  },[token,dispatch])

  return (
    <Container>
        {
            currentPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentPlaying.image} alt="currentPlaying" />
                    </div>
                    <div className="track_info">
                        <h4 className="track_info_track_name">{currentPlaying.name}</h4>
                        <h6 className="track_info_track_artist">{currentPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </Container>
  )
}


const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_image {
    }
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &_track_name {
        color: white;
      }
      &_track_artist {
        color: #b3b3b3;
      }
    }
  }
`;

export default CurrentTrack