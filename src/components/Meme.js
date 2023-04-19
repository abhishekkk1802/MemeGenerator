import React from "react";
// import memesData from "../memesdata";
export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMemeImages, setAllMemeImages] = React.useState([])
    // OR*************************************************************
    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemeImages(data.data.memes))
    // }, [])

    // React.useEffect(async() => {
    //     const res = await fetch("https://api.imgflip.com/get_memes")
    //     const data = await res.json()
    //     setAllMemeImages(data.data.memes)
    // }, [])
    React.useEffect(() => {
        async function fetchMemes() {
            try {
                const res = await fetch("https://api.imgflip.com/get_memes");
                const data = await res.json();
                setAllMemeImages(data.data.memes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMemes();
    }, []);

    // ******************************************************************
    function GetMemeImage(event) {
        const randomnumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomnumber].url
        setMeme(prevdata => ({
            ...prevdata,
            randomImage: url

        }));

    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevdata => ({
            ...prevdata,
            [name]: value,
        }))
    }

    return (
        <main>
        <div className="set">
            <div className="form">
                <input
                    // id="top"
                    type="text"
                    className="form--input"
                    placeholder="Top text"
                    value={meme.topText}
                    onChange={handleChange}
                    name="topText"
                >

                </input>
                <input
                    id="bottom"
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                    value={meme.bottomText}
                    onChange={handleChange}
                    name="bottomText"
                >

                </input>
                <button onClick={GetMemeImage} className="form--button">Get a new meme image 🖼 </button>
            </div>
            <div>
                <img src={meme.randomImage} alt="meme" className="meme--image"></img>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>   
        </div>
        </main>

    )
}