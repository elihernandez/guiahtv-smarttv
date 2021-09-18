function ArtistsList({ data, handleMove, listIndex }){
    const { title, artists } = data

    React.useEffect(() => {
        setTimeout(() => {
            SpatialNavigation.add(`list-music-${listIndex}`, {
				selector: `.cover-slide-${listIndex}`,
				rememberSource: true,
				enterTo: 'last-focused',
				disabled: false
			})

            $('.carousel').slick({
                dots: false,
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                swipeToSlide: false,
                focusOnSelect: false,
                speed: 0,
                autoplay: false,
                arrows: true,
                variableWidth: false,
                adaptiveHeight: false,
                prevArrow: '<div class="slick-prev"><div class="icon fas fa-chevron-left"></div></div>',
                nextArrow: '<div class="slick-next"><div class="icon fas fa-chevron-right"></div></div>'
            })
        }, 50)
    }, [])

    return (
        <div className="list tracks-list" id={`list-music-${listIndex}`}>
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    artists.map((artist, index) => {
                        const { title, portadaURL } = artist

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                ReactDOM.render(
                                    <MusicArtist data={artist} />,
                                    document.getElementById('music-artist')
                                )
                                fadeElementMusic('music-artist')
                            }else{
                                handleMove(e)
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = limitString(title, 40)
                            document.querySelector('.content-subtitle').innerHTML = ' '
                        }

                        if(index === 0){
                            return (
                                <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-left="#" data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )
                        }

                        if(index === artists.length - 1){
                            return (
                                <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-right="#" data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
                                    <img src={portadaURL} alt={`Cover de ${title}`} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
