const playlist=[
    {titulo:"Song 1", artista:"Artist 1", duracion:210},
    {titulo:"Song 2", artista:"Artist 2", duracion:180},
    {titulo:"Song 3", artista:"Artist 3", duracion:240},
    {titulo:"Song 4", artista:"Artist 4", duracion:200},
    {titulo:"Song 5", artista:"Artist 5", duracion:300},
    {titulo:"Song 6", artista:"Artist 6", duracion:150},
    {titulo:"Song 7", artista:"Artist 7", duracion:220},
    {titulo:"Song 8", artista:"Artist 8", duracion:260},
    {titulo:"Song 9", artista:"Artist 9", duracion:230},
    {titulo:"Song 10", artista:"Artist 10", duracion:190}
]
playlist.forEach((cancion) => {
    console.log("Canción",cancion.titulo,
        "Artista:",cancion.artista,)
});
