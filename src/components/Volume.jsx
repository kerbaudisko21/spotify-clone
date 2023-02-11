import axios from 'axios';
import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'

const Volume = () => {
    const [{token}] = useStateProvider();
    const setVolume = async(e) => {
        await axios.put("https://api.spotify.com/v1/me/player/volume",{},{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            params: {
                volume_percent: parseInt(e.target.value)
            }
        })
    }
  return (
    <Container>
         <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`

export default Volume