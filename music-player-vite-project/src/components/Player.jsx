import albums from "./data";

export function Songs({id, name, coverImg, tracks}) {
  return (
    <>
    <section className="albums" style={{display: 'flex'}}>
      <div>
        <img
          className="coverImg"
          src={coverImg}
          alt={name}
          width={300}
          height={300}
        />
      </div>
      <div>  
        <ul style={{listStyle: 'none'}}>
          {tracks.map((track, index) => (
            <li key={index}>
              {index+1}. {track} <button>play</button>
            </li>
          ))}
        </ul> 
      </div>
    </section>
    </>
  )
}
export function Album({id, name, coverImg, tracks}) {
  return (
    <>
    <section className="albums" style={{display: 'flex'}}>
      <div>
        <img
          className="coverImg"
          src={coverImg}
          alt={name}
          width={50}
          height={50}
          style={{borderRadius: '50%'}}
        />
      </div>
      <div>  
        <ul style={{listStyle: 'none', textDecoration:'none'}}>
          <li>
            <a href="">{name}</a>
          </li>
        </ul> 
      </div>
    </section>
    </>
  )
}

export default function Player() {
  return (
    <>
    <div>
      <div>
        {
          albums.map((album) => (
            <Songs
            key={album.id}
            name={album.name}
            coverImg={album.coverImg}
            tracks={album.tracks}
            />
          ))
        }
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
          />
        ))
      }
      </div>
    </div>
    </>
  );
}
