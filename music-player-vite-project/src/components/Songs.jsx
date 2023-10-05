export default function Songs({id, name, coverImg, tracks}) {
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
