import albums from "./data";
import Album from "./Album";
import Songs from "./Songs";
import { useState } from "react";

export default function Player() {
  const defaluAlbum = albums.find(album => album.id === 0);
  const [selectedAlbum, setSelectedAlbum] = useState(defaluAlbum);
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    console.log('Album clicked:', album);
  };
  return (
    <>
    <div>
      <div>
          {selectedAlbum && (
          <Songs
          id={selectedAlbum.id}
          name={selectedAlbum.name}
          coverImg={selectedAlbum.coverImg}
          tracks={selectedAlbum.tracks}
          />
        )}
 
      </div>
      <div style={{maxWidth: '900px'}}>
        <h3 style={{textAlign: 'right'}}>Select an Album</h3>
      </div>
      <div>
      {      
        albums.map((album) => (
          <Album
          key={album.id}
          name={album.name}
          coverImg={album.coverImg}
          tracks={album.tracks}
          handleAlbumClick={handleAlbumClick}
          />
        ))
      }
      </div>
    </div>
    </>
  );
}
