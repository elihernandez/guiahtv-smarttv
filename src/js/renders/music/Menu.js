function MusicMenu({ active }) {
    const [linkActive, setLinkActive] = React.useState(active)

    const handleClick = (e, section) => {
        if(nativeEventValid(e) && linkActive !== section){
            switch(section){
                case 'home':
                    fadeInElement('loader-music', "0", "1", "0.2s")
                    getMusicHome()
                    .then(response => {
                        setLinkActive('home')
                        ReactDOM.render("", document.getElementById('content-section-music'))
                        ReactDOM.render(<MusicHome data={response} />, document.getElementById('content-section-music'))
                        fadeOutElementDelay('loader-music', "1", "0", "0.2s", "0.5s")
                    })
                    .catch(() => {
                        musicError()
                    })
                    break
                case 'playlists':
                    fadeInElement('loader-music', "0", "1", "0.2s")
                    getMyPlaylists()
                    .then(response => {
                        setLinkActive('playlists')
                        const element = {
                            contentType: 'add-playlist' ,
                            title: 'Nueva playlist',
                            description: 'Cree una nueva playlist en su perfil'

                        }

                        response.playLists = [element].concat(response.playLists)
                        
                        const data = {
                            musicSections: [response]
                        }
                        
                        ReactDOM.render("", document.getElementById('content-section-music'))
                        ReactDOM.render(<MusicHome data={data} />, document.getElementById('content-section-music'))
                        fadeOutElementDelay('loader-music', "1", "0", "0.2s", "0.5s")
                    })
                    .catch(() => {
                        console.log('Error')
                        musicError()
                    })
                break
            }
        }
    }

    return (
      <div className="music-menu" id="music-menu">
        <ul>
            <li className={`link-music-menu ${linkActive === 'home' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'home')} onKeyDown={(e) => handleClick(e, 'home')}>
                <a href="#"><div className="icon fas fa-home" />Inicio</a>
            </li>
            <li className={`link-music-menu ${linkActive === 'playlists' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'playlists')} onKeyDown={(e) => handleClick(e, 'playlists')}>
                <a href="#"><div className="icon fas fa-list-ul" />Playlists</a>
            </li>
        </ul>
      </div>
    )
}