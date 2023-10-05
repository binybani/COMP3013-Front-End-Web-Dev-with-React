import Songs from "./Songs";

export default function Album({id, name, coverImg, tracks, handleAlbumClick}) {
  // const clickAlbumNameHandler = () => {
  //   console.log("AAAAAAA");
 
  // }
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
          <a href="#" onClick={() => handleAlbumClick({ id, name, coverImg, tracks })}>
  {name}
</a>

            {/* <a href="" onClick={updateAlbumNameHandler}>{name}</a> */}
          </li>
        </ul> 
      </div>
    </section>
    </>
  )
}
